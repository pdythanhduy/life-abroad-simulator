# Playtest Feedback — Life Abroad Simulator v0.1

Chỗ chung để gom feedback từ tester thật + 5 persona tự test khi chưa đủ người chơi.

## Game

| | |
|---|---|
| **Live URL** | https://life-abroad-simulator.vercel.app |
| **Build** | v0.1.0 — Public Playtest |
| **Repo** | https://github.com/pdythanhduy/life-abroad-simulator |
| **Issues** | https://github.com/pdythanhduy/life-abroad-simulator/issues |

Một lượt chơi: 20–30 phút trên điện thoại. Không cần download, đăng ký, không quảng cáo.

## Cho tester

Khi gửi link cho ai đó, dán đoạn này (sửa tên cho phù hợp):

> Tớ đang playtest 1 game ngắn (~20–30 phút trên điện thoại) về 7 ngày đầu sống ở Tokyo. Không có lựa chọn đúng — chỉ có cách bạn chọn sống. Chơi xong giúp tớ trả lời 4 câu nhanh được không?
>
> https://life-abroad-simulator.vercel.app

**Lưu ý gửi kèm**:
- Save game lưu trong browser, không sync giữa thiết bị. Chơi 1 lèo ~20 phút thì xong.
- Có thể bấm **Add to Home Screen** trên iOS để chạy fullscreen, đỡ bị Safari address bar.
- Game có 5 ending — đừng spoil người chơi sau, để họ tự khám phá.

## 4 câu hỏi chính

(Giống README. Giữ 1 nguồn — nếu sửa, sửa cả 2 chỗ.)

1. **Bạn dừng ở đâu?** Hết Day 7 hay bỏ giữa? Nếu bỏ — đoạn nào, vì sao?
2. **Cảnh hoặc nhân vật nào nhớ nhất?** Một câu mẹ nói? Một lần lạc đường? Một event làm bạn ngần ngừ rất lâu mới chọn?
3. **Có muốn chơi lại không?** Vì sao có / vì sao không? (chán / đủ rồi / không đủ khác biệt / muốn thử route khác)
4. **Ending bạn nhận được có hợp lý không?** Khớp với cách bạn chơi tuần đó không? Nếu cảm giác sai — sai chỗ nào?

## Bảng ghi feedback

Mỗi tester 1 dòng. Ghi gọn — không cần văn hoa.

| # | Tester | Device | Reached | Ending | Scene nhớ | Confusing | Replay? | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | _tên/nick_ | _iPhone 14 / Pixel 7 / Chrome desktop_ | _Day 7_ | _Survive_ | _EV18 trà bà Sato_ | — | _Yes, thử Hard_ | — |
| 2 | | | | | | | | |
| 3 | | | | | | | | |
| 4 | | | | | | | | |
| 5 | | | | | | | | |

Cột `Confusing`: chỗ player phải đọc 2–3 lần mới hiểu, hoặc bị stuck không biết bấm gì.

### Heuristic đọc bảng

- **Drop point lặp lại** ở cùng 1 day → vấn đề pacing/vibe ở day đó.
- **Không ai nhớ NPC X** → NPC X cần thêm beat hoặc rewrite.
- **>50% replay vì "thử route khác"** → variant system có effect, tốt.
- **>30% nói ending không hợp lý** → resolver/threshold cần chỉnh (xem `src/engine/endings.ts`).
- **Nhiều người confusing ở cùng 1 event** → text gượng hoặc choice không rõ.

## 5 persona tự test (khi chưa đủ người chơi thật)

Tự chơi 5 lượt, mỗi lượt nhập vai 1 persona dưới đây. Mỗi persona = 1 nhân cách giả định + 1 difficulty + 1 "khẩu vị lựa chọn" rõ. Mục tiêu: xem game có phản chiếu được nhân cách đó qua ending không.

Mỗi lượt mất ~20 phút. Reset save sau mỗi lượt (Settings → Reset toàn bộ).

### Persona 1 — "Người con ngoan"
- **Difficulty:** Easy
- **Khẩu vị:** Luôn ưu tiên mẹ và quan hệ. Mở lòng với mẹ ngay Day 1 (EV02 B "Phòng nhỏ lắm mẹ. Nhưng sạch."). Không ice ai. Khóc với mẹ ở EV12 nếu thấy thật.
- **Dự kiến ending:** Belonging hoặc Growth.
- **Câu hỏi check:** Mom variant ở EV29 có khớp cảm giác không?

### Persona 2 — "Người tự chứng minh"
- **Difficulty:** Normal
- **Khẩu vị:** Từ chối giúp đỡ — tự đi giấy tờ (EV04 C "T tự đi được"). Từ chối Kenta (EV23 B). Cày shift max (EV17 A, EV26 A).
- **Dự kiến ending:** Survive (cứng đầu nhưng chưa burnout) hoặc Burnout (vắt kiệt).
- **Câu hỏi check:** Game có gợi ý nào không cho người không nhận help, hay người chơi cảm thấy bị bỏ rơi đúng nghĩa?

### Persona 3 — "Người dối lòng"
- **Difficulty:** Normal
- **Khẩu vị:** Luôn giấu cảm xúc với mẹ ("Con ổn mà mẹ" ở EV02 A và EV12 A). Polite-distant với Kenta (EV11 C). Không khóc, không kể thật.
- **Dự kiến ending:** Survive với relationship thấp, hoặc Go Home nếu rel < 20.
- **Câu hỏi check:** EV29 variant cuối ("Mẹ không hỏi nữa. Mẹ biết con không trả lời thật bao giờ.") có hit không?

### Persona 4 — "Người sụp đổ"
- **Difficulty:** Hard
- **Khẩu vị:** Nhận mọi ca thêm (EV17 A, EV26 A). Skip trà bà Sato (EV18 C). Lướt mạng đêm (EV05 B, EV16 B). Đoán đại tiếng Nhật (EV10 B).
- **Dự kiến ending:** Burnout (energy < 25 hoặc stress > 80).
- **Câu hỏi check:** Burnout epilogue (báo thức kêu lần 7, gõ cửa không trả lời) có cảm xúc đúng không?

### Persona 5 — "Người nhập gia"
- **Difficulty:** Normal
- **Khẩu vị:** Ưu tiên học tiếng Nhật ở mọi event (EV07 B, EV10 A, EV19 B, EV20 A). Trà bà Sato + viết thư (EV18 B, EV27 A). Đi nhậu Kenta (EV23 A).
- **Dự kiến ending:** Belonging (language ≥ 60 và relationship ≥ 60).
- **Câu hỏi check:** Belonging epilogue (chậu cây mini bà Sato, Kenta + Linh + mẹ) có cảm giác xứng đáng với 7 ngày không?

### Self-test log

Ghi vào bảng feedback ở trên, cột **Tester** đặt là `Self/Persona 1` ... `Self/Persona 5`. Nếu ending thực tế ≠ ending dự kiến → có insight về balance hoặc threshold cần điều chỉnh trong `src/engine/endings.ts` hoặc starting stats trong `src/engine/difficulty.ts`.

Nếu cả 5 persona đều ra Survive → endings không đủ phân hoá, cần spread threshold rộng hơn.
Nếu Persona 4 không tới Burnout dù chơi đúng kịch bản → energy/stress balance trên Hard quá hiền.
