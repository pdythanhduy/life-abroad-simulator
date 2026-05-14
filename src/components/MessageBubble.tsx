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

// Sender identity now comes from the BORDER color only. The bubble fill is a
// solid dark scrim so chat reads cleanly over photo backgrounds.
const BORDER: Record<string, string> = {
  mom: "border-rose-400/60",
  manager: "border-amber-400/60",
  friend: "border-emerald-400/60",
  ex: "border-fuchsia-400/60",
  neighbor: "border-yellow-400/60",
  colleague: "border-sky-400/60",
  cityhall: "border-zinc-400/60",
  bank: "border-zinc-400/60",
  system: "border-line",
  self: "border-accent/60",
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
        <div className="w-8 h-8 rounded-full bg-[#0a0d12]/85 backdrop-blur-md border border-line flex items-center justify-center text-base shrink-0 shadow-md shadow-black/40">
          {AVATAR[event.sender] ?? "💬"}
        </div>
      )}
      <div className={`max-w-[78%] ${isSystem ? "text-center" : ""}`}>
        {!isSystem && idx === 0 && (
          <div
            className="text-[11px] text-white/85 mb-0.5 font-medium"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7)" }}
          >
            {event.senderName}
          </div>
        )}
        <div
          className={
            isSystem
              ? "inline-block text-xs text-white/90 italic px-3 py-1.5 break-words [overflow-wrap:anywhere] bg-[#0a0d12]/80 backdrop-blur-md border border-line rounded-full shadow-md shadow-black/40"
              : `border-2 rounded-2xl rounded-tl-sm px-3 py-2 text-[14px] leading-relaxed break-words [overflow-wrap:anywhere] text-white/95 bg-[#0a0d12]/85 backdrop-blur-md shadow-lg shadow-black/50 ${
                  BORDER[event.sender] ?? "border-line"
                }`
          }
        >
          {message}
        </div>
      </div>
    </div>
  );
}
