# Social Post Drafts — v0.1 Public Playtest

3 góc khác nhau cho 3 audience khác nhau. **Đây là draft, không phải post chính thức.** Sửa giọng văn theo cá nhân trước khi đăng. Không có schedule.

Live: https://life-abroad-simulator.vercel.app

---

## Draft 1 — Devlog (cho cộng đồng dev / friend dev / Twitter dev)

**Audience:** dev khác, người quan tâm process build game indie.
**Tone:** thẳng, có data, có decision rationale.

```
Vừa ship v0.1 public playtest của một game nhỏ tôi build mấy tuần qua.

Life Abroad Simulator — game chat-based về 7 ngày đầu của một người trẻ Việt
mới sang Nhật. Stack tối giản: React + TS + Tailwind + Vite, không backend,
save trong localStorage. Bundle 64 KB gzip.

Engine có flag system + variant resolver — events sau callback events trước
("hôm con khóc qua điện thoại, mẹ biết"). 5 ending. Validator chạy trước
build, không cho push file events.json bị dangling reference.

Đang ở giai đoạn validation. Chưa phải lúc thêm sound, art, hay 30-day arc.
Cần biết: người chơi dừng ở đâu, ending nào hit, dòng nào làm họ im lặng.

Nếu bạn 20 phút rảnh + cảm thấy mood nhẹ-buồn, link dưới. Feedback theo
template ở /docs/tester-feedback-form.md sẽ đắt giá hơn 1000 lần "hay".

🎮 https://life-abroad-simulator.vercel.app
🐙 https://github.com/pdythanhduy/life-abroad-simulator

#indiegame #gamedev #vite #react
```

**Note:** Twitter giới hạn ký tự — có thể cắt gọn. Mastodon / Bluesky thoải mái hơn.

---

## Draft 2 — Du học sinh / người Việt xa quê (cho Facebook / VN diaspora group)

**Audience:** người Việt đang/đã ở nước ngoài, đặc biệt Nhật.
**Tone:** peer-to-peer, không bán game, chia sẻ thật.

```
Tớ vừa làm xong một thứ nhỏ — gọi là game cũng được, gọi là cái nhật ký
tương tác cũng được.

Tên: Life Abroad Simulator. 7 ngày đầu của một người trẻ Việt mới sang
Nhật. Phòng 4 chiếu rưỡi. Tin nhắn của mẹ. Konbini ca tối. Manager hỏi
"日本語、大丈夫？". Bà hàng xóm già đưa cơm nắm.

Không có boss, không có loot. Chỉ có 5 chỉ số (tiền, năng lượng, stress,
tiếng Nhật, quan hệ) và rất nhiều lựa chọn không có đáp án đúng.

Tớ làm cái này vì hồi mới sang, không có ai kể cho tớ nghe rằng tuần đầu
sẽ giống cái gì. Tớ muốn người trẻ sắp đi (hoặc vừa đi) có một thứ để
nhìn vào và nói "ờ, không phải mình tớ thấy vậy".

Chơi trên điện thoại ~25 phút. Free, không quảng cáo, không tracking.

Nếu chơi xong, tớ rất biết ơn nếu bạn dành thêm 3 phút trả lời 5 câu
hỏi ở /docs/tester-feedback-form.md. Đặc biệt: moment nào nghe thật
nhất, ending có hợp lý không.

🎮 https://life-abroad-simulator.vercel.app

(Cảnh báo nhẹ: đề cập burnout, cô đơn, áp lực gia đình. Chơi khi
đủ sức nghe lại chính mình.)
```

**Note:** post này dài hơn — phù hợp Facebook caption / Threads. Có thể tỉa nếu đăng IG.

---

## Draft 3 — Emotional storytelling (cho audience rộng / story-curious)

**Audience:** người không biết game này, không quen người làm, có gu story.
**Tone:** literary, không spoiler, tone của game phản chiếu vào caption.

```
1:42 sáng. Phòng 4 chiếu rưỡi.

Trần nhà thấp hơn bạn nghĩ. Tiếng tàu cuối ngày chạy qua. Lần đầu
trong đời bạn ngủ một mình ở một đất nước không gọi tên bạn đúng.

Mẹ vừa nhắn: "Đến nơi rồi à con?"

Bạn có 3 lựa chọn:
A — Con ổn mà mẹ. Đừng lo.
B — Phòng nhỏ lắm mẹ. Nhưng sạch.
C — Mẹ ngủ sớm đi, con đi ngủ đây.

Không có đáp án đúng. Chỉ có cách bạn chọn sống.

Life Abroad Simulator — 7 ngày đầu, chơi 25 phút trên điện thoại.

🎮 https://life-abroad-simulator.vercel.app
```

**Note:** post ngắn, hook bằng scene mở đầu (không spoil mid/late game).
Hợp Twitter, Threads, Substack note.

---

## Lưu ý chung trước khi đăng

- **Đừng đăng trên scheduler tự động.** Pause-and-watch trong 30 phút đầu để trả lời comment.
- **Không boost / pay reach.** Chưa phải giai đoạn marketing.
- **Số lượng tester cần:** 5–10 người chơi xong + điền form là đủ insight cho V0.2 sprint kế.
- **Nếu post viral bất ngờ** (>1000 impression): tắt registration đếm — game không có backend, không scale issue, nhưng nội dung sensitive nên giới hạn dần.
- **Track việc share thủ công:** ghi xuống ai đã gửi link, để gom feedback có context (tester X tới từ post Y).
