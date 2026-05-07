export default function SettingsScreen({
  onBack,
  onReset,
}: {
  onBack: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-3 py-2 border-b border-line bg-panel/70">
        <button onClick={onBack} className="text-soft text-sm" aria-label="Back">
          ←
        </button>
        <div className="ml-3 text-sm">Cài đặt</div>
      </div>
      <div className="flex-1 px-4 py-4 space-y-3">
        <div className="border border-line rounded-xl p-4 bg-panel">
          <div className="text-sm font-medium">Phiên bản</div>
          <div className="text-xs text-soft mt-1">
            MVP 0.1 — Season 1: Year One Abroad (7 ngày)
          </div>
        </div>
        <button
          onClick={() => {
            if (confirm("Xoá toàn bộ tiến trình?")) onReset();
          }}
          className="w-full py-3 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-200"
        >
          Reset toàn bộ
        </button>
      </div>
    </div>
  );
}
