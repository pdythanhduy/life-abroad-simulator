import type { SaveState } from "../types/game";

const KEY = "las.save.v1";

export function saveGame(state: SaveState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota / privacy mode
  }
}

export function loadGame(): SaveState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SaveState> & { difficulty: SaveState["difficulty"] };
    // migrate older saves that lack `flags`
    return {
      ...(parsed as SaveState),
      flags: parsed.flags ?? {},
    };
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
