import type { Screen } from "../hooks/useGame";

export default function HomeScreen({
  hasSave,
  tutorialSeen,
  onContinue,
  onNew,
  setScreen,
}: {
  hasSave: boolean;
  tutorialSeen: boolean;
  onContinue: () => void;
  onNew: () => void;
  setScreen: (s: Screen) => void;
}) {
  function handleNew() {
    if (!tutorialSeen) setScreen("howto");
    else onNew();
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#05070b] via-[#0a0d14] to-[#10131c]">
      <div className="flex-1 px-6 pt-16">
        <div className="text-xs tracking-[0.3em] text-soft mb-2">SEASON 1</div>
        <h1 className="text-3xl font-semibold leading-tight">
          Life Abroad
          <br />
          Simulator
        </h1>
        <div className="text-soft mt-3 text-sm leading-relaxed">
          Year One Abroad. Bảy ngày đầu, một căn phòng nhỏ, một thành phố không
          nói tiếng mình. Mỗi tin nhắn là một lựa chọn không có đáp án đúng.
        </div>

        <div className="mt-6 border border-accent/30 bg-accent/10 rounded-2xl p-4">
          <div className="text-[10px] tracking-[0.3em] text-accent mb-1">MISSION</div>
          <div className="text-sm leading-relaxed">
            Sống sót <span className="text-accent">7 ngày</span> ở Tokyo —
            <br />
            và tìm một lý do để tiếp tục tuần thứ 8.
          </div>
        </div>
      </div>

      <div className="px-6 pb-safe-lg space-y-2">
        {hasSave && (
          <button
            onClick={onContinue}
            className="w-full py-3 rounded-xl bg-accent text-ink font-medium min-h-[48px]"
          >
            Tiếp tục
          </button>
        )}
        <button onClick={handleNew} className="w-full py-3 rounded-xl bg-line min-h-[48px]">
          Bắt đầu mới
        </button>
        <button
          onClick={() => setScreen("howto")}
          className="w-full py-3 rounded-xl text-soft border border-line min-h-[48px]"
        >
          Cách chơi
        </button>
        <button
          onClick={() => setScreen("settings")}
          className="w-full py-2 rounded-xl text-soft text-sm min-h-[44px]"
        >
          Cài đặt
        </button>
      </div>
    </div>
  );
}
