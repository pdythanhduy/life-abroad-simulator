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
        <span className="text-xs text-soft">Tokyo · 23:47</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {ITEMS.map((it) => {
          const v = stats[it.key];
          const pct = Math.max(0, Math.min(100, v));
          const danger = it.bad ? v > 70 : v < 25;
          // Cap indicators — when stat is at its "best" or "worst" extreme,
          // additional changes won't register. Surface that to the player.
          const cappedGood = it.bad ? v <= 0 : v >= 100;
          const cappedBad = it.bad ? v >= 100 : v <= 0;
          const valueClass = cappedGood
            ? "text-emerald-300 font-medium"
            : cappedBad
            ? "text-rose-300 font-medium animate-pulse"
            : "text-soft";
          return (
            <div key={it.key} className="flex flex-col items-center min-w-0">
              <div className="text-[10px] text-soft mb-1 whitespace-nowrap leading-none">
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
              <div
                className={`text-[10px] mt-1 tabular-nums leading-none ${valueClass}`}
                title={
                  cappedGood
                    ? "Đang ở đỉnh — thêm cũng không tăng nữa"
                    : cappedBad
                    ? "Đang chạm đáy — không thể giảm nữa"
                    : undefined
                }
              >
                {Math.round(v)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
