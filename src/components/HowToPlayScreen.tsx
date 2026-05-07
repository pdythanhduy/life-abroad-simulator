type StatRow = { icon: string; name: string; rule: string; danger: string };

const STATS: StatRow[] = [
  { icon: "¥",  name: "Money",        rule: "Tiền sống.", danger: "< 15 → bị ép về nhà." },
  { icon: "⚡", name: "Energy",       rule: "Thể lực.", danger: "< 25 → kiệt sức (burnout)." },
  { icon: "🔥", name: "Stress",       rule: "Cao là xấu.", danger: "> 80 → burnout." },
  { icon: "あ", name: "Language",     rule: "Tiếng Nhật.", danger: "Cao → ít bị thương, mở thêm lựa chọn." },
  { icon: "♡",  name: "Relationship", rule: "Quan hệ với mọi người.", danger: "< 20 → quá cô đơn để ở lại." },
];

export default function HowToPlayScreen({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-2 border-b border-line bg-panel/70">
        <button
          onClick={onBack}
          className="text-soft text-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Back"
        >
          ←
        </button>
        <div className="text-sm">Cách chơi</div>
        <div className="min-w-[44px]" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 scrollbar-thin space-y-6">
        <section>
          <div className="text-[10px] tracking-[0.3em] text-soft mb-2">MỤC TIÊU</div>
          <div className="text-lg leading-snug">
            Sống sót <span className="text-accent">7 ngày</span> ở Tokyo —
            <br />
            và tìm một lý do để tiếp tục tuần thứ 8.
          </div>
          <div className="text-xs text-soft mt-2 leading-relaxed">
            Không có thắng. Không có thua. Chỉ có cách bạn muốn sống.
          </div>
        </section>

        <section>
          <div className="text-[10px] tracking-[0.3em] text-soft mb-2">5 CHỈ SỐ</div>
          <div className="space-y-2">
            {STATS.map((s) => (
              <div key={s.name} className="border border-line rounded-xl p-3 bg-panel">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-6 text-center">{s.icon}</span>
                  <span className="font-medium">{s.name}</span>
                  <span className="text-soft text-xs">— {s.rule}</span>
                </div>
                <div className="text-[11px] text-soft mt-1 ml-8">{s.danger}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-soft mt-2 leading-relaxed">
            Stress là chỉ số <span className="text-rose-300">ngược</span> — càng thấp càng tốt. Bốn chỉ số kia càng cao càng tốt.
          </div>
        </section>

        <section>
          <div className="text-[10px] tracking-[0.3em] text-soft mb-2">CÁCH CHƠI</div>
          <ul className="space-y-2 text-sm leading-relaxed">
            <li className="flex gap-2">
              <span className="text-accent">·</span>
              <span>7 ngày, mỗi ngày 4–5 tin nhắn / mail / sự kiện.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">·</span>
              <span>Mỗi sự kiện có 2–3 lựa chọn — tất cả đều có cái <em>được</em> và cái <em>mất</em>.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">·</span>
              <span>Một số lựa chọn có hậu quả vài ngày sau (bỏ thư city hall → bị phạt sau).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">·</span>
              <span>Không có "lựa chọn đúng". Có cách bạn muốn sống.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">·</span>
              <span>Game <span className="text-accent">tự lưu</span> sau mỗi lựa chọn — đóng app/refresh thoải mái.</span>
            </li>
          </ul>
        </section>

        <section>
          <div className="text-[10px] tracking-[0.3em] text-soft mb-2">KẾT THÚC</div>
          <div className="text-sm leading-relaxed">
            Có <span className="text-accent">5 ending</span> khác nhau, mở dần theo cách bạn sống tuần này.
          </div>
          <div className="text-xs text-soft mt-2 leading-relaxed">
            Đừng cố nhắm 1 ending. Chơi như chính bạn. Khi không biết chọn gì — chọn cái thật nhất.
          </div>
        </section>

        <section className="pt-2">
          <div className="text-[10px] tracking-[0.3em] text-soft mb-2">3 ĐỘ KHÓ</div>
          <div className="text-xs text-soft leading-relaxed">
            <span className="text-emerald-300">Easy</span> — tiền nhiều, ít stress, có sẵn quan hệ. Dành cho lần đầu.
            <br />
            <span className="text-amber-300">Normal</span> — mode chuẩn. Tự xoay sở.
            <br />
            <span className="text-rose-300">Hard</span> — không ai đỡ. Dễ rơi vào bad ending. Chơi khi muốn đau.
          </div>
        </section>
      </div>

      <div className="px-4 pt-3 pb-safe border-t border-line bg-panel/70 flex gap-2">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl border border-line text-soft min-h-[48px]"
        >
          ← Home
        </button>
        <button
          onClick={onContinue}
          className="flex-[2] py-3 rounded-xl bg-accent text-ink font-medium min-h-[48px]"
        >
          Chọn độ khó →
        </button>
      </div>
    </div>
  );
}
