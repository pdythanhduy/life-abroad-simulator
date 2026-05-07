import type { Choice, StatEffect } from "../types/game";

const ICON_MAP: Record<string, string> = {
  money: "¥",
  energy: "⚡",
  stress: "🔥",
  language: "あ",
  relationship: "♡",
};

function formatEffect(eff: StatEffect): string {
  const out: string[] = [];
  for (const [k, v] of Object.entries(eff)) {
    if (!v) continue;
    out.push(`${ICON_MAP[k] ?? k}${v > 0 ? "+" : ""}${v}`);
  }
  return out.join("  ");
}

export default function ChoiceList({
  choices,
  onPick,
}: {
  choices: Choice[];
  onPick: (c: Choice) => void;
}) {
  return (
    <div className="px-3 pt-2 pb-safe space-y-2 border-t border-line bg-panel/80 backdrop-blur">
      {choices.map((c) => (
        <button
          key={c.id}
          onClick={() => onPick(c)}
          className="w-full text-left rounded-xl border border-line bg-ink/60 hover:bg-line transition px-3 py-3 active:scale-[.99] min-h-[56px]"
        >
          <div className="text-sm break-words [overflow-wrap:anywhere] leading-snug">{c.text}</div>
          <div className="text-[11px] text-soft mt-1 tracking-wide break-words leading-snug">
            {formatEffect(c.statEffects) || "—"}
          </div>
        </button>
      ))}
    </div>
  );
}
