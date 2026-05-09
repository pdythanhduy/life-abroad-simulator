import { useEffect, useMemo, useState } from "react";
import type { Choice, Difficulty, EndingId, SaveState } from "../types/game";
import { chooseOption, dismissRecap, getEvent, newGame } from "../engine/engine";
import {
  clearGame,
  loadGame,
  loadUnlockedEndings,
  saveGame,
  unlockEnding,
} from "../engine/storage";

export type Screen =
  | "home"
  | "howto"
  | "difficulty"
  | "chat"
  | "stats"
  | "history"
  | "settings"
  | "ending";

const TUT_KEY = "las.tutorial.seen.v1";

function readTutorialSeen(): boolean {
  try {
    return localStorage.getItem(TUT_KEY) === "1";
  } catch {
    return false;
  }
}

export function useGame() {
  const [state, setState] = useState<SaveState | null>(() => loadGame());
  const [screen, setScreen] = useState<Screen>(() => {
    const s = loadGame();
    if (s?.ending && !s.currentEventId) return "ending";
    return "home";
  });
  const [tutorialSeen, setTutorialSeenState] = useState<boolean>(readTutorialSeen);
  const [unlockedEndings, setUnlockedEndings] = useState<EndingId[]>(
    loadUnlockedEndings,
  );

  useEffect(() => {
    if (state) saveGame(state);
  }, [state]);

  // Switch to ending screen only when ending is resolved AND there is no
  // active epilogue event left to play. Also persist the ending into the
  // unlocked-endings collection (idempotent — duplicate calls are no-ops).
  useEffect(() => {
    if (state?.ending && !state.currentEventId) {
      setUnlockedEndings(unlockEnding(state.ending));
      setScreen("ending");
    }
  }, [state?.ending, state?.currentEventId]);

  const currentEvent = useMemo(
    () => (state?.currentEventId ? getEvent(state.currentEventId) ?? null : null),
    [state?.currentEventId],
  );

  function start(difficulty: Difficulty) {
    const s = newGame(difficulty);
    setState(s);
    setScreen("chat");
  }

  function pick(choice: Choice) {
    if (!state) return;
    setState(chooseOption(state, choice));
  }

  function reset() {
    clearGame();
    setState(null);
    setScreen("home");
  }

  function markTutorialSeen() {
    try {
      localStorage.setItem(TUT_KEY, "1");
    } catch {
      // ignore
    }
    setTutorialSeenState(true);
  }

  function continueFromRecap() {
    if (!state) return;
    setState(dismissRecap(state));
  }

  return {
    state,
    screen,
    setScreen,
    currentEvent,
    start,
    pick,
    reset,
    tutorialSeen,
    markTutorialSeen,
    continueFromRecap,
    unlockedEndings,
    hasSave: !!state && !!state.currentEventId,
  };
}
