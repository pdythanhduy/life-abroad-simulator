import { useEffect, useMemo, useRef, useState } from "react";
import type { Choice, GameEvent, SaveState } from "../types/game";
import StatsBar from "./StatsBar";
import MessageBubble from "./MessageBubble";
import ChoiceList from "./ChoiceList";
import { resolveEvent } from "../engine/engine";
import type { Screen } from "../hooks/useGame";

const BG: Record<string, string> = {
  tiny_room:     "from-[#0e1118] to-[#1a1d28]",
  konbini:       "from-[#0e1726] to-[#152033]",
  station_night: "from-[#0a0d16] to-[#181c2c]",
  office:        "from-[#16131a] to-[#1f1c26]",
  rainy_street:  "from-[#0c1014] to-[#161b22]",
  cityhall:      "from-[#11140e] to-[#1c2017]",
};

export default function ChatScreen({
  state,
  event,
  onPick,
  setScreen,
}: {
  state: SaveState;
  event: GameEvent | null;
  onPick: (c: Choice) => void;
  setScreen: (s: Screen) => void;
}) {
  const resolved = useMemo(
    () => (event ? resolveEvent(event, state.flags) : null),
    [event, state.flags],
  );
  const messages = resolved?.messages ?? [];
  const choices = resolved?.choices ?? [];

  const [revealed, setRevealed] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRevealed(0);
    if (!event || messages.length === 0) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= messages.length) clearInterval(id);
    }, 650);
    return () => clearInterval(id);
  }, [event?.id, messages.length]);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [revealed]);

  const bgKey = event?.background ?? "tiny_room";
  const bg = BG[bgKey] ?? BG.tiny_room;
  const showChoices = !!event && revealed >= messages.length;

  return (
    <div className={`flex flex-col h-full bg-gradient-to-b ${bg}`}>
      <div className="flex items-center justify-between px-3 py-2 bg-panel/70 border-b border-line">
        <button
          onClick={() => setScreen("home")}
          className="text-soft text-sm w-8 text-left"
          aria-label="Back"
        >
          ←
        </button>
        <div className="text-sm">{event?.senderName ?? "—"}</div>
        <button
          onClick={() => setScreen("history")}
          className="text-soft text-sm w-8 text-right"
          aria-label="History"
        >
          ≡
        </button>
      </div>

      <StatsBar stats={state.stats} day={state.day} />

      <div ref={scroller} className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin">
        {event &&
          messages.slice(0, revealed).map((m, i) => (
            <MessageBubble key={`${event.id}-${i}`} event={event} message={m} idx={i} />
          ))}
        {event && revealed < messages.length && (
          <div className="text-soft text-xs px-1 mt-1">…đang nhập</div>
        )}
      </div>

      {showChoices && <ChoiceList choices={choices} onPick={onPick} />}
    </div>
  );
}
