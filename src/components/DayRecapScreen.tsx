import type { DayRecap, Stats } from "../types/game";

interface Row {
  key: keyof Stats;
  label: string;
  icon: string;
  inverted?: boolean;
}

const ROWS: Row[] = [
  { key: "money",        label: "Money",        icon: "¥" },
  { key: "energy",       label: "Energy",       icon: "⚡" },
  { key: "stress",       label: "Stress",       icon: "🔥", inverted: true },
  { key: "language",     label: "Language",     icon: "あ" },
  { key: "relationship", label: "Bond",         icon: "♡" },
];

function delta(before: Stats, after: Stats, key: keyof Stats): number {
  return Math.round(after[key] - before[key]);
}

export default function DayRecapScreen({
  recap,
  onContinue,
}: {
  recap: DayRecap;
  onContinue: () => void;
}) {
  const isLastDay = recap.day === 7;
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#06080d] to-[#10131c]">
      <div className="flex-1 px-6 pt-14 overflow-y-auto scrollbar-thin animate-fade-up">
        <div className="text-[10px] tracking-[0.3em] text-soft mb-2">
          {isLastDay ? "TUẦN ĐẦU KẾT THÚC" : "DAY KẾT THÚC"}
        </div>
        <h1 className="text-3xl font-semibold leading-tight">
          Day {recap.day} <span className="text-soft text-lg">/ 7</span>
        </h1>
        <div className="text-soft text-sm mt-2">
          {isLastDay
            ? "Bạn vừa khép lại 7 ngày đầu ở Tokyo."
            : "Bạn vừa khép lại một ngày. Mai dậy lại."}
        </div>

        <div className="mt-8 space-y-2">
          {ROWS.map((r) => {
            const d = delta(recap.before, recap.after, r.key);
            const good = r.inverted ? d < 0 : d > 0;
            const bad = r.inverted ? d > 0 : d < 0;
            const color = d === 0 ? "text-soft" : good ? "text-emerald-300" : bad ? "text-rose-300" : "text-soft";
            const sign = d > 0 ? "+" : "";
            return (
              <div
                key={r.key}
                className="flex items-center justify-between border border-line rounded-xl px-4 py-3 bg-panel"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center">{r.icon}</span>
                  <span className="text-sm">{r.label}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-soft">{Math.round(recap.before[r.key])}</span>
                  <span className="text-soft">→</span>
                  <span>{Math.round(recap.after[r.key])}</span>
                  <span className={`tabular-nums w-10 text-right ${color}`}>
                    {d === 0 ? "—" : `${sign}${d}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[11px] text-soft mt-4 leading-relaxed">
          Stress là chỉ số ngược: số đỏ (giảm) là tốt.
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 border-t border-line bg-panel/50">
        <button
          onClick={onContinue}
          className="w-full py-3 rounded-xl bg-accent text-ink font-medium"
        >
          {isLastDay ? "Xem kết thúc →" : `Tiếp tục Day ${recap.day + 1} →`}
        </button>
      </div>
    </div>
  );
}
