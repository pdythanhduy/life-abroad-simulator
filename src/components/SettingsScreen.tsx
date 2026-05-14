import { useEffect, useState } from "react";
import { isSoundEnabled, setSoundEnabled, subscribeSound } from "../engine/audio";

export default function SettingsScreen({
  onBack,
  onReset,
}: {
  onBack: () => void;
  onReset: () => void;
}) {
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled);

  useEffect(() => subscribeSound(setSoundOn), []);

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
        <div className="ml-1 text-sm">Cài đặt</div>
      </div>
      <div className="flex-1 px-4 pt-4 pb-safe space-y-3 overflow-y-auto scrollbar-thin">
        <div className="border border-line rounded-xl p-4 bg-panel">
          <div className="text-sm font-medium">Phiên bản</div>
          <div className="text-xs text-soft mt-1">
            v0.2.1 — Season 1: Year One Abroad (7 ngày)
          </div>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundOn)}
          className="w-full flex items-center justify-between border border-line rounded-xl p-4 bg-panel min-h-[56px]"
          aria-pressed={soundOn}
        >
          <div className="text-left">
            <div className="text-sm font-medium">Âm thanh</div>
            <div className="text-xs text-soft mt-0.5">
              Tiếng tin nhắn + ambient theo cảnh + nhạc ending
            </div>
          </div>
          <span
            className={`shrink-0 ml-3 inline-flex items-center w-12 h-7 rounded-full transition-colors ${
              soundOn ? "bg-accent" : "bg-line"
            }`}
            aria-hidden
          >
            <span
              className={`inline-block w-5 h-5 bg-white rounded-full transform transition-transform ${
                soundOn ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </span>
        </button>

        <button
          onClick={() => {
            if (confirm("Xoá toàn bộ tiến trình?")) onReset();
          }}
          className="w-full py-3 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-200 min-h-[48px]"
        >
          Reset toàn bộ
        </button>
      </div>
    </div>
  );
}
