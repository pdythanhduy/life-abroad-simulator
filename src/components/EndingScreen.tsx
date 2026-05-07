import { ENDINGS } from "../engine/endings";
import type { SaveState } from "../types/game";

export default function EndingScreen({
  state,
  onRestart,
}: {
  state: SaveState;
  onRestart: () => void;
}) {
  const info = state.ending ? ENDINGS[state.ending] : null;
  if (!info) return null;
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#05070b] to-[#13161f]">
      <div className="flex-1 px-6 pt-16 animate-fade-up overflow-y-auto scrollbar-thin">
        <div className="text-xs tracking-[0.3em] text-soft mb-2">ENDING</div>
        <h1 className="text-3xl font-semibold">{info.title}</h1>
        <div className="text-soft mt-2 italic">{info.subtitle}</div>
        <div className="mt-6 whitespace-pre-line text-[15px] leading-relaxed">
          {info.body}
        </div>
        <div className="mt-8 text-xs text-soft">
          Day {state.day} · ¥{Math.round(state.stats.money)} · ⚡
          {Math.round(state.stats.energy)} · 🔥{Math.round(state.stats.stress)} ·
          あ{Math.round(state.stats.language)} · ♡
          {Math.round(state.stats.relationship)}
        </div>
      </div>
      <div className="px-6 pb-10">
        <button
          onClick={onRestart}
          className="w-full py-3 rounded-xl bg-accent text-ink font-medium"
        >
          Chơi lại
        </button>
      </div>
    </div>
  );
}
