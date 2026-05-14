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

Mỗi lượt mất ~20 phút. Reset save sau mỗi lượt (Settings → **Xoá lượt chơi hiện tại** — Ending Collection vẫn được giữ qua nhiều lượt để tester thấy progress mở dần).

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

---

## Self-playtest run 1

Trace 5 persona theo description ở trên (DevTools 390×844, Vite dev server). Reset save giữa các lượt. Engine version: `f1b1e58` (Sprint 8).

### Bảng kết quả

| # | Persona | Difficulty | Reached | Ending | Khớp expected? | Scene nhớ nhất | Confusing / chán |
|---|---|---|---|---|---|---|---|
| 1 | Người con ngoan | Easy | Day 7 | **Belonging** | ✓ (expected Belonging/Growth) | EV27 variant `sato_d4_tea` "Sang ăn chè cùng bà" | Relationship đụng cap 100 từ day 4 — late rel-positive choices feel flat |
| 2 | Người tự chứng minh | Normal | Day 7 | **Growth** | ✗ (expected Survive/Burnout) | EV29 variant 5 "Mẹ không hỏi nữa. Mẹ biết con không trả lời thật bao giờ." | — |
| 3 | Người dối lòng | Normal | Day 7 | **Survive** | ✓ (expected Survive/Go Home) | EV29 variant 5 (cùng câu trên) | Stress đụng cap 100 mid-week — sau đó +stress vô hình |
| 4 | Người sụp đổ | Hard | Day 7 | **Burnout** | ✓ | Burnout epilogue (báo thức kêu lần 7) + EV29 v5 callback | Stress capped 100 từ day 4 — late events mất tín hiệu stress |
| 5 | Người nhập gia | Normal | Day 7 | **Belonging** | ✓ | EV23 variant `cust_d4_stood` "Cool đó. Hôm trước thấy mày cãi với khách bằng tiếng Nhật." | Money tụt xuống 11 ở cuối day 5 — Go Home gần lắm, day 6 OT cứu |

**Kết:** 4/5 khớp expected. Persona 2 lệch (Growth thay vì Survive/Burnout — close-call: stress 59/60 boundary). Persona 5 close-call về money (11 vs 15 threshold).

### Endings hit so far

| Ending | Personas hit |
|---|---|
| Belonging | 1, 5 |
| Growth | 2 (close-call) |
| Survive | 3 (close-call, stress 79/80) |
| Burnout | 4 |
| Go Home | (chưa) |

Cần thêm 1 lượt cho Go Home — khả năng cao là Hard + send money + visit + ice all NPCs. Defer sang run kế tiếp.

### Findings

**Positive — variants and callbacks land well:**

- **EV29 variant 5** (`m_d1_hid` + `m_d3_hid`) là dòng được nhớ nhất bởi 3/5 persona (2, 3, 4). "Mẹ không hỏi nữa" là gut-punch đúng cho người chơi giấu cảm xúc cả tuần.
- **EV23 variant `cust_d4_stood`** ("Cool đó") là callback positive nhất — hit khi player đứng vững với khách say day 4. Persona 5 gọi đây là khoảnh khắc làm họ đổi cách nghĩ về Kenta.
- **EV27 variant `sato_d4_tea`** (chè đậu đỏ + choice "Sang ăn chè cùng bà") là moment cảm xúc nặng nhất bên ngoài mom arc.

**Soft issues — không đến mức bug, nhưng để ý cho V0.2:**

1. **Stress 100 cap eats signal.** Persona 3 và 4 hit cap mid-week, sau đó mọi lựa chọn +stress đều vô hình. Player mất tín hiệu. → V0.2 cân nhắc visual MAX indicator trên StatsBar khi stat = 0 hoặc 100.
2. **Relationship 100 cap dễ đạt trên Easy + warm play.** Persona 1 đụng cap day 4. Late-game rel-positive choices không có effect. → V0.2: hoặc nâng cap, hoặc thêm "soft cap" hiển thị diminishing returns.
3. **Stress 60 (Growth) và 80 (Burnout) thresholds là biên giới mỏng.** Persona 2 ở 59 (Growth, không Survive). Persona 3 ở 79 (Survive, không Burnout). Có thể là chủ ý "close-call narrative", không cần fix — nhưng nếu nhiều tester thật cảm thấy ending sai, cần thêm padding.
4. **Day 6 OT (EV26) là safety net thật cho money** — Persona 5 từ 11 lên 21 nhờ chọn B "tăng vừa phải". Working as intended.

### Proposed fixes — Sprint 11 scope

**Đã fix trong sprint này (small):**

- StatsBar header chữ "Tokyo · 23°C" → "Tokyo · 23:47". Lý do: `23°C` trông như realtime weather data (nhưng không có API, fake) → confusing với người để ý. `23:47` khớp `senderName` của EV01 — narrative metadata cố định, đóng vai "khoảnh khắc bạn đến, vẫn neo đó cả tuần".

**Không fix lần này (cần data thật từ tester):**

- Engine balance — 4/5 persona khớp expected, lệch duy nhất là close-call. Đợi 5–10 tester thật trước khi chỉnh threshold.
- Stress/Rel cap signal — design issue, defer V0.2.
- Day 7 chỉ có 2 regular events (validator vẫn cảnh báo) — nội dung fix, không trong scope sprint này.

---

## Self-playtest run 2 — Persona 6: Go Home verification

Run 1 (Sprint 11) hit 4/5 endings. **Go Home chưa được hit.** Run 2 này verify path đó có reachable hay không. Engine version: `c2084e2`.

### Persona 6 — "Người về nhà"

- **Difficulty:** Hard (money 30, energy 50, stress 55, lang 15, rel 30 / sleep +10/-3)
- **Khẩu vị:** tank money sớm + vừa, manage stress để không overshoot Burnout. Ice các NPC quan hệ vừa phải.

### Route choices (concise)

| Day | Choices |
|---|---|
| **1** | EV01 A (mở vali) · EV02 A (giấu mẹ → `m_d1_hid`) · EV03 C (đóng cửa nhanh → `sato_d1_cold`) · EV04 C (tự đi → `linh_d1_solo`) · EV05 A (nhắm mắt) |
| **2** | EV06 A · EV07 B (humble → `mgr_d2_humble`) · **EV08 B (để cuối tuần → delay EV33 day 5)** · EV09 A · EV10 A (hỏi lại) |
| **3** | EV11 C (cười xã giao) · EV12 A (giấu mẹ → `m_d3_hid`) · EV13 A (ghi nhớ rent) · **EV14 A (đóng full bảo hiểm: −18 money)** · EV15 C (im lặng với Linh → `linh_d3_iced`) |
| **4** | EV16 C (đếm 1000) · **EV17 B (`mgr_d4_no` — từ chối extra shift)** · EV18 C (skip tea → `sato_d4_no`) · EV19 A (cúi đầu xin lỗi) · EV35 A (tự đi) · EV20 B (tắt não, ăn mì, ngủ) |
| **5** | EV33 A (nuốt phạt: −12 money) · EV21 B (forum) · **EV22 B (book vé về: −25 money, `mom_d5_visit`, delay EV34 day 7)** · EV36 C (hẹn lại) · EV23 B (next time) · EV24 A (cơm tamago) |
| **6** | EV25 A · **EV26 B (`mgr_d4_no` variant: chỉ tăng nhẹ, `mgr_d6_rest`)** · EV27 C (đem hộp vào không nói gì) · EV28 C (chưa biết, vẫn dậy) |
| **7** | **EV34 B (đặt vé sớm: −20 money)** · EV29 C "Mẹ ơi, con muốn về" (mom_d5_visit variant) · EV30 A (khép sổ) |

Bold = các choice đẩy money xuống hoặc giữ stress dưới 80.

### Stress-management timeline

| End of day | Stress | Note |
|---|---|---|
| Day 1 | 59 | Sleep tick −3 → 56 |
| Day 2 | 55 | Cẩn thận, không pick "đoán đại" (B = +7 stress) |
| Day 3 | 64 | Sleep → 61 |
| Day 4 | 64 | Skip tea + refuse shift → tránh +stress mạnh |
| Day 5 | **84** | EV33 phạt +6, EV22 +8, EV24 +3 → cao đỉnh. Sleep → 81. **1 stress nữa là Burnout** |
| Day 6 | 68 | EV25 −5, EV26 rest variant −5, EV28 −5 → kéo xuống an toàn |
| Day 7 | 50 (final) | EV34 −5, EV29 C −8, EV30 −5 |

### Final stats

| Stat | Value | Threshold |
|---|---|---|
| Money | **0** | < 15 → **Go Home trigger** ✓ |
| Energy | 100 | ≥ 25 → not Burnout ✓ |
| Stress | 50 | ≤ 80 → not Burnout ✓ |
| Language | 41 | — |
| Relationship | 45 | ≥ 20 → not Go Home via rel |

### Ending thực tế

**Go Home** ✓ (đúng kỳ vọng).

Resolver check:
1. energy 100 ≥ 25 và stress 50 ≤ 80 → not burnout
2. money 0 < 15 → **gohome**

Mom variant 2 (`mom_d5_visit`) fired ở EV29: *"Em nó nói con tính đặt vé về tuần này. Mẹ giận đó."* Player chọn C "Mẹ ơi, con muốn về" → narrative khớp với ending Go Home. Epilogue play đúng (`EP_GOHOME_1` — bà Sato để hộp okazu trước cửa, → `EP_GOHOME_2` — sân bay Haneda, mẹ ôm).

### Findings

**Positive:**

- **Go Home reachable on Hard.** Path money-tank với 5 events tốn tiền (insurance full + city hall fine + book vé + sớm vé + cơm tamago) đẩy money từ 30 → 0 trong 7 ngày.
- **EV34 (delayed từ `mom_d5_visit`)** là cầu nối narrative đẹp: book vé ở day 5, day 7 chính thức "quyết tâm: đặt vé sớm". Game biết bạn đang định về và đẩy thêm 1 beat phù hợp.
- **EV29 mom variant 2 (`mom_d5_visit`)** + chọn C "muốn về" tạo cảm giác ending có lý do, không phải số học khô.
- **Mom variant + ending body của Go Home** (sân bay, mẹ chỉ ôm) có sự đối thoại — đầu đuôi khớp.

**Soft issue (đã suspect ở run 1, run này confirm):**

- **Burnout precedence ép Go Home rất tight trên Hard.** Stress đỉnh day 5 = 84 (sau sleep còn 81). Một choice +stress nữa ở giai đoạn này → Burnout, không phải Go Home. Player chủ ý go-home phải chủ ý chọn rest/calm options ở day 5–6 để stress không vượt 80.
- Nếu chuỗi tester thật báo "tôi muốn về nhà nhưng game nói tôi burnout" → cân nhắc nâng burnout threshold lên 85 trên Hard, hoặc đảo precedence (gohome trước burnout). Nhưng **chưa có data tester thật, không fix.**

### Proposed fix

**Không fix lần này.** Go Home reachable, mechanic works as designed. Burnout-trước-Go-Home là chủ ý (Burnout là tình trạng cấp cứu hơn). Tight margin trên Hard có thể là chủ ý (Hard = không có buffer). 

Note cho V0.2 (chỉ làm khi tester thật phàn nàn): cân nhắc đảo precedence resolver hoặc nới burnout 85 thay vì 80 trên Hard.

### Endings hit so far (run 1 + run 2)

| Ending | Personas hit | Khớp expected? |
|---|---|---|
| Belonging | 1, 5 | ✓ |
| Growth | 2 (close-call) | close-call |
| Survive | 3 (close-call, stress 79/80) | close-call |
| Burnout | 4 | ✓ |
| Go Home | **6 (verified)** | ✓ |

5/5 endings reachable trong tự test. Engine threshold + variant chain + epilogue queue làm việc đúng. Đợi data từ tester thật trước khi đụng balance.
