import { useEffect } from "react";
import { ENDINGS } from "../engine/endings";
import type { EndingId, SaveState } from "../types/game";
import { playEnding, stopAll } from "../engine/audio";

// Display order — warmest → bleakest. Reads as a small narrative.
const ALL_ENDINGS: EndingId[] = [
  "belonging",
  "growth",
  "survive",
  "burnout",
  "gohome",
];

export default function EndingScreen({
  state,
  unlockedEndings,
  onRestart,
}: {
  state: SaveState;
  unlockedEndings: EndingId[];
  onRestart: () => void;
}) {
  const info = state.ending ? ENDINGS[state.ending] : null;

  useEffect(() => {
    if (state.ending) playEnding(state.ending);
    return () => {
      stopAll();
    };
  }, [state.ending]);

  if (!info) return null;

  const unlocked = new Set(unlockedEndings);
  const completedAll = unlocked.size >= ALL_ENDINGS.length;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#05070b] to-[#13161f]">
      <div className="flex-1 px-6 pt-12 animate-fade-up overflow-y-auto scrollbar-thin">
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

        {/* Endings collection */}
        <div className="mt-10 pt-6 border-t border-line">
          <div className="text-[10px] tracking-[0.3em] text-soft mb-3">
            ENDINGS · {unlocked.size} / {ALL_ENDINGS.length}
          </div>
          <div className="space-y-1.5">
            {ALL_ENDINGS.map((id) => {
              const isUnlocked = unlocked.has(id);
              const isCurrent = state.ending === id;
              const ending = ENDINGS[id];
              return (
                <div
                  key={id}
                  className={`border rounded-xl px-3 py-2 ${
                    isCurrent
                      ? "border-accent/50 bg-accent/10"
                      : isUnlocked
                      ? "border-line bg-panel/60"
                      : "border-line bg-panel/30"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className={isUnlocked ? "" : "text-soft"}>
                      {isUnlocked ? ending.title : "???"}
                    </span>
                    <span className="text-[11px] text-soft">
                      {isCurrent
                        ? "vừa rồi"
                        : isUnlocked
                        ? "đã mở"
                        : "chưa mở"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {completedAll && (
            <div className="mt-3 text-xs text-accent">
              Bạn đã thấy cả 5 cách kết thúc tuần đầu.
            </div>
          )}
        </div>

        {/* Day 8 teaser */}
        <div className="mt-8 pt-6 border-t border-line">
          <div className="text-sm leading-relaxed text-soft italic">
            Tuần thứ hai chưa bắt đầu.
            <br />
            Nhưng điện thoại lại rung.
          </div>
        </div>
      </div>

      <div className="px-6 pb-safe-lg pt-4">
        <button
          onClick={onRestart}
          className="w-full py-3 rounded-xl bg-accent text-ink font-medium min-h-[48px]"
        >
          {completedAll ? "Chơi lại" : "Chơi lại để mở ending khác"}
        </button>
      </div>
    </div>
  );
}
