import type { SaveState } from "../types/game";

export default function HistoryScreen({
  state,
  onBack,
}: {
  state: SaveState;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-3 py-2 border-b border-line bg-panel/70">
        <button onClick={onBack} className="text-soft text-sm" aria-label="Back">
          ←
        </button>
        <div className="ml-3 text-sm">Nhật ký</div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 scrollbar-thin">
        {state.history.length === 0 && (
          <div className="text-soft text-sm">Chưa có gì xảy ra.</div>
        )}
        {state.history.map((h, i) => (
          <div key={i} className="border border-line rounded-xl p-3 bg-panel">
            <div className="text-[11px] text-soft">
              Day {h.day} · {h.senderName}
            </div>
            <div className="text-sm mt-1">{h.message}</div>
            <div className="text-[12px] text-accent mt-1">→ {h.choiceText}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
