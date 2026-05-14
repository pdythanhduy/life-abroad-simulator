// Procedural audio — kept intentionally minimal after v0.2.0 playtest feedback
// said the drones felt creepy. Only two layers remain:
//   1. Ping  — short soft sine ding when a chat message reveals (iMessage-ish).
//   2. Ending — one gentle warm chord on the ending screen (no loop, no
//      dissonance). The ending id only shifts register + chord quality.
//
// setAmbientScene() is kept as a no-op so callers don't need to change. Future
// sprints can swap real audio files in via the same API.

import type { EndingId } from "../types/game";

const SOUND_KEY = "las.sound.v1";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let lastPingAt = 0;

let enabled = readEnabled();
const listeners = new Set<(on: boolean) => void>();

function readEnabled(): boolean {
  try {
    const v = localStorage.getItem(SOUND_KEY);
    return v === null ? true : v === "1";
  } catch {
    return true;
  }
}

function writeEnabled(on: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, on ? "1" : "0");
  } catch {
    // ignore
  }
}

function ensureCtx(): AudioContext | null {
  if (!enabled) return null;
  if (ctx && ctx.state !== "closed") {
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  }
  try {
    const Ctor =
      (window.AudioContext as typeof AudioContext | undefined) ??
      ((window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext);
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.6;
    master.connect(ctx.destination);
    return ctx;
  } catch {
    return null;
  }
}

export function isSoundEnabled(): boolean {
  return enabled;
}

export function setSoundEnabled(on: boolean): void {
  if (on === enabled) return;
  enabled = on;
  writeEnabled(on);
  if (!on) stopAll();
  listeners.forEach((l) => l(on));
}

export function subscribeSound(fn: (on: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Soft sine ding. Two pure sines a fifth apart so it sounds like a bell hint,
// not a synthetic beep. Caps to one ping per 200ms in case messages stack.
export function playPing(): void {
  const c = ensureCtx();
  if (!c || !master) return;
  const now = c.currentTime;
  if (now - lastPingAt < 0.2) return;
  lastPingAt = now;

  const env = c.createGain();
  env.gain.setValueAtTime(0.0001, now);
  env.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  env.connect(master);

  [880, 1318].forEach((freq) => {
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.value = freq;
    o.connect(env);
    o.start(now);
    o.stop(now + 0.5);
  });
}

// Gentle one-shot chord on the ending screen. ~6 seconds total: slow swell
// in, hold, slow fade out. No loop. Different chord quality per ending but
// all consonant — distinguished by warmth, not dissonance.
const ENDING_CHORDS: Record<EndingId, { base: number; semis: number[] }> = {
  belonging: { base: 220, semis: [0, 4, 7, 11] },  // A maj7 — warm
  growth:    { base: 261, semis: [0, 4, 7, 9] },   // C6 — bright, hopeful
  survive:   { base: 196, semis: [0, 7, 12] },     // G open fifth — neutral
  burnout:   { base: 164, semis: [0, 3, 7] },      // E minor low — heavy but not ugly
  gohome:    { base: 146, semis: [0, 3, 7, 10] },  // D m7 low — wistful
};

let endingNodes: { osc: OscillatorNode; gain: GainNode }[] = [];

export function playEnding(endingId: EndingId): void {
  const c = ensureCtx();
  if (!c || !master) return;
  stopAll(); // cancels any prior ending chord

  const recipe = ENDING_CHORDS[endingId];
  const now = c.currentTime;

  recipe.semis.forEach((s, i) => {
    const osc = c.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = recipe.base * Math.pow(2, s / 12);

    const g = c.createGain();
    // Slight stagger per note (~80ms) so the chord blooms gently.
    const start = now + i * 0.08;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.06, start + 1.8);
    g.gain.setValueAtTime(0.06, start + 4.0);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 6.5);

    osc.connect(g).connect(master!);
    osc.start(start);
    osc.stop(start + 6.8);
    endingNodes.push({ osc, gain: g });
  });
}

// Kept for API compatibility — no-op since v0.2.1.
export function setAmbientScene(_sceneId: string | null): void {
  // Ambient drones removed — were too dissonant. Future sprint may swap in
  // recorded location loops (konbini chime, station announcement, rain).
}

export function stopAll(): void {
  if (!ctx) return;
  const t = ctx.currentTime;
  endingNodes.forEach(({ osc, gain }) => {
    try {
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      osc.stop(t + 0.45);
    } catch {
      // already stopped
    }
  });
  endingNodes = [];
}
