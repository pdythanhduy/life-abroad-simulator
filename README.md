# Life Abroad Simulator — MVP 0.1

Game mô phỏng cuộc sống xa quê dạng chat. Season 1: Year One Abroad (7 ngày).

> Mục tiêu: sống sót 7 ngày ở Tokyo — và tìm một lý do để tiếp tục tuần thứ 8.

## Yêu cầu

- Node.js 18+ (đã test trên Node 22)
- Windows 10/11 — chạy trong PowerShell
- (Tuỳ chọn cho mobile build) Android Studio + JDK 17

## Chạy local

```powershell
cd $env:USERPROFILE\Desktop\life-abroad-simulator
npm install
npm run dev
```

Mở: http://localhost:5173 → DevTools (F12) → Toggle device toolbar → iPhone 14.

## Lệnh chính

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Vite dev server có hot reload |
| `npm run validate` | Check `events.json` (id, refs, flags, day coverage) — exit code khác 0 nếu lỗi |
| `npm run build` | Validate + tsc --noEmit + vite build (build refuse to ship nếu validate fail) |
| `npm run preview` | Serve bundle production để test bundle thật |

## Cấu trúc

```
src/
├─ types/game.ts          # types chung
├─ data/events.json       # 32 main + 4 branch + 9 epilogue events
├─ engine/
│  ├─ difficulty.ts       # starting stats, sleep tick
│  ├─ engine.ts           # game loop, choice resolver, variant resolver, epilogue queue
│  ├─ endings.ts          # 5 endings + resolver
│  └─ storage.ts          # localStorage save + defensive migration
├─ hooks/useGame.ts       # state hook duy nhất
├─ components/            # Home, HowToPlay, Difficulty, Chat, History, Settings, Ending, DayRecap, MessageBubble, ChoiceList, StatsBar
├─ App.tsx                # router theo screen
└─ main.tsx               # entrypoint
scripts/
└─ validate.mjs           # static validator chạy trước build
```

---

## QA Checklist

Chạy lại sau mỗi sprint hoặc trước khi commit content lớn.

### 1. Build pipeline (must pass)

```powershell
npm run validate    # 0 errors, warnings OK
npm run build       # validate + tsc + vite, phải exit 0
```

### 2. First-launch flow

DevTools → Application → Local Storage → xoá `las.tutorial.seen.v1` và `las.save.v1`.

- [ ] Refresh — Home hiện MISSION pill "Sống sót 7 ngày…".
- [ ] Tap **Bắt đầu mới** → tự dẫn vào màn **Cách chơi** (vì là first-time).
- [ ] Tap **Chọn độ khó →** → Difficulty.
- [ ] Pick Easy → Day 1 EV01_ARRIVE.

### 3. Day flow

- [ ] Mỗi event reveal message từng dòng (~650ms/dòng).
- [ ] Choice list xuất hiện sau dòng cuối.
- [ ] Pick choice → StatsBar update ngay, vào event tiếp.
- [ ] Sau event cuối Day N (1≤N≤6) → **DayRecapScreen** hiện stat delta.
- [ ] Stress (🔥) ngược màu các stat khác: giảm = xanh.
- [ ] **Day 7 không có recap** — vào thẳng epilogue → EndingScreen.

### 4. Save / resume

- [ ] Mid-game tap ← (hint "tự lưu") → Home.
- [ ] **Tiếp tục** → resume đúng event đang dở.
- [ ] Refresh trình duyệt mid-game → Tiếp tục vẫn resume.
- [ ] Refresh giữa lúc đang xem DayRecap → Tiếp tục → recap hiện lại.

### 5. Ending routes

5 ending. Reset giữa các lần. Mỗi lượt ~20 phút.

| Ending | Difficulty | Cách đẩy |
|---|---|---|
| **Belonging** | Easy | Mở lòng với mẹ (B/C ở EV02, EV12) · ngồi trà với bà Sato (EV18) · bình tĩnh tiếng Nhật với khách say (EV19 B) · đi nhậu với Kenta (EV23) · viết thư cho bà Sato (EV27) → kết: language ≥ 60 và relationship ≥ 60 |
| **Growth** | Normal | Đăng ký giấy tờ sớm với Linh (EV04 A) · half ca với manager (EV17 C) · học 30 từ mới (EV20 A) · ăn cơm tamago tiết kiệm (EV24 A) → money ≥ 50, language ≥ 45, stress < 60 |
| **Survive** | Normal | Chọn vừa phải tất cả · không nhận cực, không trốn — default ending |
| **Burnout** | Hard | Nhận hết ca thêm (EV17 A, EV26 A) · skip tea bà Sato (EV18 C) · lướt mạng đêm (EV05 B, EV16 B) → energy < 25 hoặc stress > 80 |
| **Go Home** | Hard | Đóng full bảo hiểm (EV14 A) · gửi tiền về cho mẹ (EV22 A) · book vé về (EV22 B) · ice tất cả NPC (EV03 C, EV15 C, EV04 C) → money < 15 hoặc relationship < 20 |

Sau mỗi lần kết:
- [ ] 1–2 cảnh epilogue hiện trước EndingScreen.
- [ ] EndingScreen hiện đúng title + body.
- [ ] **Chơi lại** → wipe save → Home.

### 6. Variant callbacks (test memory hệ thống)

- [ ] Pick **C "Khóc"** ở EV12 (Day 3) → tới EV29 (Day 7) Mẹ phải nói: *"Hôm con khóc qua điện thoại, mẹ biết. Mẹ định gọi lại — nhưng mẹ chờ con tự nói."*
- [ ] Pick **A "Mai đi luôn"** ở EV04 (Day 1) → EV15 (Day 3) Linh xin lỗi dài và ấm hơn (đề cập city hall).
- [ ] Pick **B "Bình tĩnh nói tiếng Nhật"** ở EV19 (Day 4) → EV23 (Day 5) Kenta mở đầu: *"Cool đó. Hôm trước thấy mày cãi lại ông khách say bằng tiếng Nhật."*
- [ ] Pick **A hoặc B (uống trà)** ở EV18 (Day 4) → EV27 (Day 6) note bà Sato thêm dòng *"Trong tủ lạnh có chè đậu đỏ. Tự lấy nha."* + mở choice mới *"Sang ăn chè cùng bà"*.
- [ ] Pick **A "はい、できます"** ở EV17 (Day 4) → EV26 (Day 6) Tenchou đổi lời: *"Tuần trước bắt cố quá nhỉ. Tuần này tăng nhẹ thôi."*
- [ ] Pick **C "Cảm ơn. Bảo trọng nhé."** ở EV09 (Day 2) → EV25 (Day 6) Hà mở đầu khác (dài hơn, nhắc lại "bảo trọng").

### 7. Migration safety (kiểm tra save cũ không crash)

DevTools → edit JSON của key `las.save.v1`:

- [ ] Xoá field `flags` → reload → game vẫn load, không crash.
- [ ] Xoá field `dayStartStats` → reload → recap kế tiếp vẫn hoạt động.
- [ ] Set `difficulty` thành `"xyz"` → reload → save bị huỷ, về Home (không crash).

### 8. Visual / mobile

- [ ] Phone-frame (border tròn 36px) chỉ hiện ≥ 640px (`sm:`); mobile full-screen.
- [ ] Header chat hiện "← tự lưu" hint.
- [ ] StatsBar: Stress màu amber (≤70) hoặc rose (>70). 4 stat khác xanh accent (≥25) hoặc rose (<25).
- [ ] DayRecap không bị clip ở chiều cao ngắn.
- [ ] Dark mode default, không có flash trắng khi chuyển screen.

### 9. Reset toàn bộ

- [ ] Settings → **Reset toàn bộ** → confirm → save bị xoá → về Home.
- [ ] Sau reset, "Tiếp tục" không hiện. Tutorial-seen flag vẫn giữ (không show lại).

---

## Build mobile (sau MVP)

```powershell
npm install @capacitor/core @capacitor/cli
npx cap init "Life Abroad Simulator" "com.yourname.lifeabroad" --web-dir=dist
npm install @capacitor/android
npm run build
npx cap add android
npx cap open android
```

Trong Android Studio: **Build → Build Bundle(s)/APK(s) → Build APK(s)**.

## Tài khoản git

Repo public: https://github.com/pdythanhduy/life-abroad-simulator

Khi sửa code, commit + push:

```powershell
git add .
git commit -m "Mô tả ngắn"
git push
```
