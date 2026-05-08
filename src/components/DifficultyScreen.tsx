import type { Difficulty } from "../types/game";
import {
  DIFFICULTY_DESC,
  DIFFICULTY_LABEL,
  STARTING_STATS,
} from "../engine/difficulty";

export default function DifficultyScreen({
  onPick,
  onBack,
}: {
  onPick: (d: Difficulty) => void;
  onBack: () => void;
}) {
  const items: Difficulty[] = ["easy", "normal", "hard"];
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-2 border-b border-line bg-panel/70">
        <button
          onClick={onBack}
          className="text-soft text-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Back"
        >
          ←
        </button>
        <div className="ml-1 text-sm">Chọn độ khó</div>
      </div>
      <div className="flex-1 px-4 pt-4 pb-safe space-y-3 overflow-y-auto scrollbar-thin">
        <div className="text-[11px] text-soft leading-relaxed mb-1">
          <span className="text-accent">Mục tiêu:</span> sống sót 7 ngày ở Tokyo — và tìm một lý do để tiếp tục.
          <br />
          <span className="opacity-80">Cả 3 độ khó dùng chung sự kiện và ending — chỉ khác chỉ số khởi đầu và mức hồi phục mỗi đêm.</span>
        </div>
        {items.map((d) => {
          const s = STARTING_STATS[d];
          return (
            <button
              key={d}
              onClick={() => onPick(d)}
              className="w-full text-left rounded-2xl border border-line bg-panel p-4 active:scale-[.99] min-h-[80px]"
            >
              <div className="text-base font-medium">{DIFFICULTY_LABEL[d]}</div>
              <div className="text-xs text-soft mt-1 leading-relaxed">{DIFFICULTY_DESC[d]}</div>
              <div className="text-[11px] text-soft mt-2 tracking-wider tabular-nums whitespace-nowrap overflow-x-auto scrollbar-thin">
                ¥{s.money} · ⚡{s.energy} · 🔥{s.stress} · あ{s.language} · ♡{s.relationship}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
