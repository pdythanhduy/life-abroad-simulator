import type { EndingId, SaveState, Stats } from "../types/game";

const KEY = "las.save.v1";
const ENDINGS_KEY = "las.endings.unlocked.v1";

const VALID_ENDING_IDS: readonly EndingId[] = [
  "survive",
  "burnout",
  "gohome",
  "growth",
  "belonging",
];

const DEFAULT_STATS: Stats = {
  money: 50,
  energy: 60,
  stress: 35,
  language: 25,
  relationship: 45,
};

export function saveGame(state: SaveState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota / privacy mode
  }
}

// Defensive migration. We never throw on a partial / older save — the player
// keeps their progress even if a future version adds new SaveState fields.
// If the save is so broken that the essentials are missing, we return null
// and the user falls back to the home screen with no resume option.
function migrate(raw: unknown): SaveState | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<SaveState> & { stats?: Partial<Stats> };

  if (r.difficulty !== "easy" && r.difficulty !== "normal" && r.difficulty !== "hard") {
    return null;
  }

  const stats: Stats = { ...DEFAULT_STATS, ...(r.stats ?? {}) };
  const dayStartStats: Stats = r.dayStartStats
    ? { ...DEFAULT_STATS, ...r.dayStartStats }
    : { ...stats };

  return {
    difficulty: r.difficulty,
    day: typeof r.day === "number" ? r.day : 1,
    stats,
    flags: r.flags && typeof r.flags === "object" ? r.flags : {},
    history: Array.isArray(r.history) ? r.history : [],
    pending: Array.isArray(r.pending) ? r.pending : [],
    completedEventIds: Array.isArray(r.completedEventIds) ? r.completedEventIds : [],
    queue: Array.isArray(r.queue) ? r.queue : [],
    currentEventId: typeof r.currentEventId === "string" ? r.currentEventId : null,
    ending: r.ending ?? null,
    startedAt: typeof r.startedAt === "number" ? r.startedAt : Date.now(),
    dayStartStats,
    pendingRecap: r.pendingRecap ?? null,
  };
}

export function loadGame(): SaveState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return migrate(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function clearGame(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

// Endings collection — separate key from save state on purpose. Player keeps
// their meta-progression even when they reset the active save. Old saves
// pre-Sprint 14 simply load as an empty list (no migration needed).
export function loadUnlockedEndings(): EndingId[] {
  try {
    const raw = localStorage.getItem(ENDINGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is EndingId =>
        typeof e === "string" &&
        (VALID_ENDING_IDS as readonly string[]).includes(e),
    );
  } catch {
    return [];
  }
}

export function unlockEnding(id: EndingId): EndingId[] {
  const current = loadUnlockedEndings();
  if (current.includes(id)) return current;
  const updated = [...current, id];
  try {
    localStorage.setItem(ENDINGS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}
