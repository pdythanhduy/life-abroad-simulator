import type { GameEvent } from "../types/game";

const AVATAR: Record<string, string> = {
  mom: "👩",
  manager: "🧑‍💼",
  friend: "🧑",
  ex: "🧑‍🦰",
  neighbor: "👵",
  colleague: "🧑‍💻",
  cityhall: "🏛️",
  bank: "🏦",
  system: "📱",
  self: "🫥",
};

const COLOR: Record<string, string> = {
  mom: "bg-rose-500/15 border-rose-400/30",
  manager: "bg-amber-500/15 border-amber-400/30",
  friend: "bg-emerald-500/15 border-emerald-400/30",
  ex: "bg-fuchsia-500/15 border-fuchsia-400/30",
  neighbor: "bg-yellow-500/15 border-yellow-400/30",
  colleague: "bg-sky-500/15 border-sky-400/30",
  cityhall: "bg-zinc-500/15 border-zinc-400/30",
  bank: "bg-zinc-500/15 border-zinc-400/30",
  system: "bg-line border-line",
  self: "bg-accent/15 border-accent/30",
};

export default function MessageBubble({
  event,
  message,
  idx,
}: {
  event: GameEvent;
  message: string;
  idx: number;
}) {
  const isSystem = event.type === "system" || event.sender === "system";
  return (
    <div
      className={`flex gap-2 mb-2 animate-fade-up ${
        isSystem ? "justify-center" : "justify-start"
      }`}
      style={{ animationDelay: `${idx * 90}ms` }}
    >
      {!isSystem && (
        <div className="w-8 h-8 rounded-full bg-line flex items-center justify-center text-base shrink-0">
          {AVATAR[event.sender] ?? "💬"}
        </div>
      )}
      <div className={`max-w-[78%] ${isSystem ? "text-center" : ""}`}>
        {!isSystem && idx === 0 && (
          <div className="text-[11px] text-soft mb-0.5">{event.senderName}</div>
        )}
        <div
          className={
            isSystem
              ? "text-xs text-soft italic px-3 py-2 break-words [overflow-wrap:anywhere]"
              : `border rounded-2xl rounded-tl-sm px-3 py-2 text-[14px] leading-relaxed break-words [overflow-wrap:anywhere] ${
                  COLOR[event.sender] ?? "bg-line border-line"
                }`
          }
        >
          {message}
        </div>
      </div>
    </div>
  );
}
