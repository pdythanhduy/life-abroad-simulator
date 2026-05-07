import type { Stats } from "../types/game";

const ITEMS: { key: keyof Stats; label: string; icon: string; bad?: boolean }[] = [
  { key: "money",        label: "Money",  icon: "¥" },
  { key: "energy",       label: "Energy", icon: "⚡" },
  { key: "stress",       label: "Stress", icon: "🔥", bad: true },
  { key: "language",     label: "JP",     icon: "あ" },
  { key: "relationship", label: "Bond",   icon: "♡" },
];

export default function StatsBar({ stats, day }: { stats: Stats; day: number }) {
  return (
    <div className="px-3 pt-3 pb-2 bg-panel/80 backdrop-blur border-b border-line">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-widest text-soft">
          Day {day} / 7
        </span>
        <span className="text-xs text-soft">Tokyo · 23°C</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {ITEMS.map((it) => {
          const v = stats[it.key];
          const pct = Math.max(0, Math.min(100, v));
          const danger = it.bad ? v > 70 : v < 25;
          return (
            <div key={it.key} className="flex flex-col items-center">
              <div className="text-[10px] text-soft mb-1">
                {it.icon} {it.label}
              </div>
              <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    danger ? "bg-rose-400" : it.bad ? "bg-amber-400" : "bg-accent"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-[10px] mt-0.5 text-soft">{Math.round(v)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
