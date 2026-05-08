# Analytics v0 — Planning Doc

**Status:** planning only. Không implement trong sprint này, không có code.

Mục đích file: nếu V0.2 quyết định bật analytics, đã có sẵn câu trả lời cho "track cái gì, tránh cái gì, chọn vendor nào".

---

## Vì sao chưa implement

- Game đang ở v0.1 Public Playtest. 5–10 tester thật trả lời form đã đủ insight cho V0.2.
- Analytics tăng surface bug + tăng privacy concern. Chỉ bật khi có lý do rõ.
- Self-test 6 persona (Sprint 11–12) đã verify 5/5 endings reachable. Không phải đoán balance bằng data tổng hợp.

## Cần track gì khi bật (V0.2 trở đi)

Mỗi metric đều phải:
- **Aggregate-only**, không gắn user identifier.
- **No PII**, không cookie, không fingerprint.
- **Opt-out** dễ thấy trong Settings.

### 1. Ending distribution

- Event: `ending_reached`
- Properties: `ending_id` (1 trong 5), `difficulty`, `final_day` (luôn 7 với v0.1)
- Câu hỏi trả lời: ending nào hay hit? Có lệch khỏi expected distribution của design (Survive ~40%, Belonging/Growth ~25%, Burnout/Go Home ~10% mỗi cái) không?

### 2. Quit point

- Event: `session_end` (fire khi tab close hoặc inactive >5 phút)
- Properties: `last_day`, `last_event_id`, `completed_events_count`
- Câu hỏi trả lời: người chơi rớt ở day nào? Event nào là drop point lặp lại?

### 3. Top choice per event

- Event: `choice_made`
- Properties: `event_id`, `choice_id`, `difficulty`
- Câu hỏi trả lời: với mỗi event, choice nào được chọn nhiều nhất? Có event nào 95% người chọn cùng 1 choice (signal: 2 choice còn lại không hấp dẫn)?

### 4. Final stress + 5 stats average

- Đã có trong `ending_reached` payload (mở rộng):
  - `final_money`, `final_energy`, `final_stress`, `final_language`, `final_relationship`
- Câu hỏi trả lời: stress cuối game trung bình bao nhiêu? Có cụm rõ ở 60–80 (Growth biên giới) không?

### 5. Difficulty selection

- Event: `difficulty_selected`
- Properties: `difficulty`
- Câu hỏi trả lời: tỷ lệ chọn Easy / Normal / Hard. Lần đầu chơi đa số chọn gì?

### 6. Tutorial completion

- Event: `tutorial_completed`
- Properties: `path` ("auto-shown" / "via cách chơi button" / "skipped via back")
- Câu hỏi trả lời: bao nhiêu % first-timer thật sự đọc tutorial trước khi chơi?

## Không track gì

- ❌ Pageview, session length tổng — không cần biết user spend bao lâu trên các screen riêng lẻ.
- ❌ Heatmap / scroll depth — game là chat-based, không có thông tin gì từ heatmap.
- ❌ User-agent / device fingerprint chi tiết. Chỉ cần `device_class` ("mobile" / "desktop") nếu thật sự cần.
- ❌ IP / geo — không cần biết tester ở đâu.
- ❌ Choice text / message content — privacy + bundle bloat (events.json đã ở client).

## Vendor candidates

Sắp xếp theo độ ưu tiên:

| Vendor | Pros | Cons | Cost |
|---|---|---|---|
| **Plausible** | EU-based, GDPR-friendly, no cookie, dashboard sạch | $9/tháng cho 10K events | $$ |
| **Fathom** | Privacy-first, simple API | $14/tháng | $$ |
| **Umami** (self-hosted) | Free, full control, open source | Cần host (Vercel + Postgres), thêm work | $0 + infra |
| **Simple Analytics** | Privacy-first | $9/tháng | $$ |
| **Custom + Vercel KV** | Full control, gắn vào Vercel sẵn | Phải code + maintain dashboard riêng | gần $0 |

**Đề xuất khi bật:** Plausible. Privacy clean, dashboard tốt, integrate dễ với React (1 script tag).

## Implementation sketch (chưa làm)

```ts
// src/engine/analytics.ts (hypothetical)
export function track(event: string, props: Record<string, string | number>) {
  if (!analyticsOptIn()) return;
  if (!window.plausible) return;
  window.plausible(event, { props });
}

// src/engine/engine.ts — call track() ở các điểm:
// - newGame() → track("difficulty_selected", { difficulty })
// - chooseOption() → track("choice_made", { event_id, choice_id, difficulty })
// - khi ending resolve → track("ending_reached", { ending_id, difficulty, ...stats })
```

Settings screen thêm 1 toggle "Send anonymous usage data" — default OFF (opt-in, không opt-out). Tôn trọng người chơi trước.

## Khi nào trigger implementation

Bật khi 2/3 điều kiện đúng:

1. Có >50 tester thật / tuần → data tổng hợp mới có ý nghĩa thống kê.
2. Có balance question không trả lời được bằng self-test (vd "Burnout có quá dễ trên Normal không?").
3. Quyết tâm tới V0.2 / public launch.

Trước đó: form thủ công + GitHub issue là đủ.
