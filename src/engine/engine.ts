import type {
  Choice,
  Difficulty,
  EndingId,
  GameEvent,
  SaveState,
  StatEffect,
  Stats,
} from "../types/game";
import eventsData from "../data/events.json";
import { SLEEP_TICK, STARTING_STATS } from "./difficulty";
import { resolveEnding } from "./endings";

const ALL_EVENTS = eventsData as GameEvent[];

const EVENT_MAP: Record<string, GameEvent> = Object.fromEntries(
  ALL_EVENTS.map((e) => [e.id, e]),
);

// Precompute the per-day event list so day-advance is O(events_in_day)
// rather than O(all_events). Branch and epilogue events are excluded;
// they enter the queue only via delayed consequences or ending resolution.
const EVENTS_BY_DAY: Record<number, string[]> = (() => {
  const map: Record<number, string[]> = {};
  for (const e of ALL_EVENTS) {
    const tags = e.tags ?? [];
    if (tags.includes("branch") || tags.includes("epilogue")) continue;
    (map[e.day] ||= []).push(e.id);
  }
  return map;
})();

export const FINAL_DAY = 7;

const EPILOGUE: Record<EndingId, string[]> = {
  burnout: ["EP_BURNOUT_1", "EP_BURNOUT_2"],
  gohome: ["EP_GOHOME_1", "EP_GOHOME_2"],
  survive: ["EP_SURVIVE_1"],
  growth: ["EP_GROWTH_1", "EP_GROWTH_2"],
  belonging: ["EP_BELONGING_1", "EP_BELONGING_2"],
};

export function getEvent(id: string): GameEvent | undefined {
  return EVENT_MAP[id];
}

export function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

export function applyEffect(stats: Stats, eff: StatEffect): Stats {
  return {
    money:        clamp(stats.money + (eff.money ?? 0)),
    energy:       clamp(stats.energy + (eff.energy ?? 0)),
    stress:       clamp(stats.stress + (eff.stress ?? 0)),
    language:     clamp(stats.language + (eff.language ?? 0)),
    relationship: clamp(stats.relationship + (eff.relationship ?? 0)),
  };
}

export function resolveEvent(
  event: GameEvent,
  flags: Record<string, boolean>,
): { messages: string[]; choices: Choice[] } {
  if (event.variants) {
    for (const v of event.variants) {
      const reqOk = (v.requireFlags ?? []).every((f) => !!flags[f]);
      const forbOk = (v.forbidFlags ?? []).every((f) => !flags[f]);
      if (reqOk && forbOk) {
        return {
          messages: v.messages,
          choices: v.choices ?? event.choices,
        };
      }
    }
  }
  return { messages: event.messages, choices: event.choices };
}

function eventsForDay(day: number): string[] {
  return EVENTS_BY_DAY[day] ?? [];
}

export function newGame(difficulty: Difficulty): SaveState {
  const day = 1;
  const queue = eventsForDay(day);
  return {
    difficulty,
    day,
    stats: { ...STARTING_STATS[difficulty] },
    flags: {},
    history: [],
    pending: [],
    completedEventIds: [],
    queue,
    currentEventId: queue[0] ?? null,
    ending: null,
    startedAt: Date.now(),
  };
}

function mergeEffects(a: StatEffect, b: StatEffect): StatEffect {
  const keys: (keyof StatEffect)[] = [
    "money",
    "energy",
    "stress",
    "language",
    "relationship",
  ];
  const out: StatEffect = {};
  for (const k of keys) {
    const v = (a[k] ?? 0) + (b[k] ?? 0);
    if (v !== 0) out[k] = v;
  }
  return out;
}

export function chooseOption(state: SaveState, choice: Choice): SaveState {
  const current = state.currentEventId ? getEvent(state.currentEventId) : null;
  if (!current) return state;

  // Resolve what the player actually saw (using OLD flags) for accurate history
  const seen = resolveEvent(current, state.flags);
  const lastMessage =
    seen.messages.length > 0 ? seen.messages[seen.messages.length - 1]! : "";

  // 1. Apply stat effects (with per-event difficulty modifier)
  const modEff = current.difficultyModifier?.[state.difficulty] ?? {};
  const totalEff: StatEffect = mergeEffects(choice.statEffects, modEff);
  let stats = applyEffect(state.stats, totalEff);

  // 2. Apply flag updates
  const flags = { ...state.flags };
  for (const f of choice.setFlags ?? []) flags[f] = true;

  // 3. History
  const history = [
    ...state.history,
    {
      eventId: current.id,
      day: state.day,
      senderName: current.senderName,
      message: lastMessage,
      choiceText: choice.text,
      statEffects: totalEff,
      timestamp: Date.now(),
    },
  ];

  // 4. Schedule delayed consequences
  let pending = [...state.pending];
  for (const dc of choice.delayedConsequences ?? []) {
    pending.push({
      eventId: dc.eventId,
      triggerDay: state.day + dc.delayDays,
    });
  }

  // 5. Mark complete (track in a Set so we can dedup queue inserts)
  const completedEventIds = [...state.completedEventIds, current.id];
  const completedSet = new Set(completedEventIds);

  let queue = state.queue.filter((id) => id !== current.id);
  if (
    choice.nextEventId &&
    EVENT_MAP[choice.nextEventId] &&
    !completedSet.has(choice.nextEventId) &&
    !queue.includes(choice.nextEventId)
  ) {
    queue = [choice.nextEventId, ...queue];
  }

  let day = state.day;
  let ending = state.ending;

  // 6. Day end / ending resolution
  if (queue.length === 0) {
    if (ending) {
      // We're inside the epilogue queue and just finished it.
      // Leave queue empty + ending set; UI will switch to EndingScreen.
    } else if (day >= FINAL_DAY) {
      const resolved = resolveEnding(stats);
      ending = resolved;
      const epilogueIds = (EPILOGUE[resolved] ?? []).filter(
        (id) => EVENT_MAP[id] && !completedSet.has(id),
      );
      queue = epilogueIds;
    } else {
      day += 1;
      const sleep = SLEEP_TICK[state.difficulty];
      stats = applyEffect(stats, sleep);

      const triggered = pending
        .filter((p) => p.triggerDay <= day)
        .map((p) => p.eventId)
        .filter((id) => EVENT_MAP[id] && !completedSet.has(id));
      pending = pending.filter((p) => p.triggerDay > day);

      const dayEvents = eventsForDay(day).filter((id) => !completedSet.has(id));
      const next = [...triggered, ...dayEvents];
      queue = next.filter((id, i) => next.indexOf(id) === i);
    }
  }

  return {
    ...state,
    stats,
    flags,
    history,
    pending,
    completedEventIds,
    queue,
    currentEventId: queue[0] ?? null,
    day,
    ending,
  };
}
