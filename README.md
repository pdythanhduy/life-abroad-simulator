# Life Abroad Simulator — MVP 0.1

Game mô phỏng cuộc sống xa quê dạng chat. Season 1: Year One Abroad (7 ngày).

> Mục tiêu: sống sót 7 ngày ở Tokyo — và tìm một lý do để tiếp tục tuần thứ 8.

## Trạng thái — v0.1 Public Playtest

**Live:** https://life-abroad-simulator.vercel.app

Season 1: Year One Abroad — bản **7-day public playtest**. Một lượt chơi 20–30 phút trên điện thoại. Có **5 ending** khác nhau; chơi lại với khẩu vị khác để mở dần collection (hiển thị trên Ending screen, lưu local). Save persist theo browser/device, không cloud sync.

**Chưa có ở milestone này:** sound, art (chỉ vibe placeholder), cloud sync, account, payment, analytics, **Day 8 (tuần thứ hai) thật sự** — chỉ có teaser. Content vẫn trong 1 file `events.json` — sẽ tách per-day khi bắt đầu V0.2 (30 ngày).

## Phản hồi cần nhất

Nếu bạn đã chơi xong (hoặc bỏ giữa) 1 lượt, vui lòng trả lời 4 câu sau — dù chỉ 1 dòng/câu cũng rất đắt giá ở giai đoạn này:

1. **Bạn dừng ở đâu?** Hết Day 7 hay bỏ giữa chừng? Nếu bỏ — đoạn nào, vì sao?
2. **Cảnh hoặc nhân vật nào nhớ nhất?** Một câu mẹ nói? Một lần lạc đường? Một event làm bạn ngần ngừ rất lâu mới chọn?
3. **Bạn có muốn chơi lại không?** Để thử route khác, hay để xem nội dung khác? Nếu không — vì sao? (chán / đủ rồi / không đủ khác biệt)
4. **Ending bạn nhận được có hợp lý không?** Thấy nó khớp với cách bạn chơi tuần đó không? Nếu cảm giác sai — sai chỗ nào?

**Gửi feedback nhanh nhất** — bấm link này, GitHub tự mở form đã điền sẵn:
👉 https://github.com/pdythanhduy/life-abroad-simulator/issues/new?template=playtest-feedback.md

Hoặc nhắn trực tiếp cho người đã share link cho bạn.

### Tester docs

| File | Khi nào dùng |
|---|---|
| [`docs/tester-guide.md`](./docs/tester-guide.md) | Gửi cho tester trước khi họ chơi — kỳ vọng, mindset, content warning |
| [`docs/tester-feedback-form.md`](./docs/tester-feedback-form.md) | Tester paste vào tin nhắn / issue điền sau khi chơi (5 câu, ~3 phút) |
| [`docs/playtest-feedback.md`](./docs/playtest-feedback.md) | Bảng tổng hợp internal — ghi từng tester + self-test 6 persona |
| [`docs/social-drafts.md`](./docs/social-drafts.md) | 3 draft post (devlog / du học sinh / emotional) — chỉnh trước khi đăng |
| [`docs/analytics-v0.md`](./docs/analytics-v0.md) | Planning doc — track gì khi V0.2 bật analytics. Chưa implement. |

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
| `npm run dev -- --host` | Như trên + expose ra LAN (test bằng điện thoại thật) |
| `npm run validate` | Check `events.json` (id, refs, flags, day coverage) — exit code khác 0 nếu lỗi |
| `npm run build` | Validate + tsc --noEmit + vite build (build refuse to ship nếu validate fail) |
| `npm run preview` | Serve bundle production để test bundle thật |

## Mobile local test

Test trên thiết bị thật (Android/iOS) trong cùng mạng Wi-Fi:

```powershell
cd $env:USERPROFILE\Desktop\life-abroad-simulator
npm run dev -- --host
```

Vite sẽ in 2-3 URL:

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

1. Lấy URL **Network** (không phải localhost).
2. Trên điện thoại, bật cùng Wi-Fi với máy tính, mở trình duyệt → paste URL.
3. Lần đầu Windows có thể bật firewall prompt — chọn **Allow access**. Nếu không hỏi, mở Windows Defender Firewall → cho phép Node.js trên Private network.
4. Trên iOS Safari, tap "Add to Home Screen" để chạy fullscreen (không có address bar).

**Test tối thiểu trên 2 kích cỡ:**

- iPhone SE / Android nhỏ: **360×640** (Chrome DevTools cũng được)
- iPhone Pro Max: **430×932**

**Checklist mobile UX (sau Sprint 5):**

- [ ] Tap target ← và ≡ trong ChatScreen ≥ 44×44 px (chạm bằng ngón cái không bị trượt).
- [ ] StatsBar 5 cột không vỡ; label "🔥 Stress" không xuống dòng.
- [ ] Choice button đủ wrap với text Japanese dài (vd "「半分だけならできます。」").
- [ ] DayRecap row không tràn ngang khi delta là 3-digit (vd `+100`).
- [ ] Bottom button (Tiếp tục, Chơi lại, Chọn độ khó) không sát với home indicator của iPhone — có safe-area padding.
- [ ] Refresh giữa game không bị clip do address bar Safari (dùng `100dvh`).
- [ ] Không scroll ngang ở bất kỳ screen nào.

## Deploy on Vercel

Vercel host static site miễn phí, có CDN toàn cầu, auto-deploy mỗi lần push. Project này không cần backend, không có env secret — deploy 1 click.

### Lần đầu setup (~3 phút)

1. Mở https://vercel.com → **Sign Up** → chọn **Continue with GitHub** → cho phép Vercel access (chỉ chọn repo `life-abroad-simulator` cho gọn).
2. Vào dashboard → bấm **Add New… → Project**.
3. Tìm `life-abroad-simulator` trong danh sách → bấm **Import**.
4. Màn config: Vercel tự detect Vite. Giữ nguyên mọi default:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Bấm **Deploy**. Đợi ~30 giây.
6. Xong sẽ có URL kiểu `https://life-abroad-simulator-<random>.vercel.app` — bấm **Visit**.

### Auto-redeploy

- Mỗi `git push origin main` → Vercel tự rebuild + redeploy. URL chính không đổi.
- Mỗi pull request nhận thêm 1 URL preview riêng (vd `…-git-feature-x.vercel.app`) để test trước khi merge.

### Custom domain (tuỳ chọn)

Vercel dashboard → Project → **Settings → Domains → Add**. Nếu domain mua ở nơi khác, làm theo hướng dẫn DNS Vercel hiện ra.

### File config liên quan

- `vercel.json` — SPA fallback rewrite. Mọi URL không khớp file thật trong `dist/` đều rewrite về `/index.html`. Nhờ vậy refresh tại bất kỳ đường dẫn nào cũng load được app, không 404.
- `vite.config.ts` — `target: "es2020"`, `sourcemap: false`. Bundle production gọn, không lộ source code khi inspect.
- `index.html` — title, description, og tags, theme-color, favicon SVG (`/favicon.svg`).

## Save / LocalStorage limitations

Game không có backend. Toàn bộ tiến trình lưu trong **localStorage của trình duyệt**. Hệ quả người chơi cần biết:

- **Save không đồng bộ giữa thiết bị**: chơi trên điện thoại không nhìn thấy save trên máy tính, và ngược lại.
- **Save không đồng bộ giữa trình duyệt**: Chrome ≠ Safari ≠ Firefox dù cùng máy.
- **Clear browsing data → mất save** (xoá cookies/site data của trang này cũng xoá save).
- **Chế độ ẩn danh / private**: localStorage bị reset khi đóng tab.
- **Storage limit**: ~5–10 MB tuỳ trình duyệt. Save game này chỉ vài KB nên không lo đầy.

Không có cloud sync trong MVP. Có thể thêm trong V2+ (vd Supabase free tier) nếu thực sự cần share save giữa thiết bị — nhưng kéo theo backend, auth, account → nghĩ kỹ trước khi làm.

Trong app: Settings → **Reset toàn bộ** xoá save thủ công.

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

## iOS / TestFlight build

App iOS dùng **Capacitor wrapper** — bundle Vite `dist/` vào WebView native. Không phải React Native, không có code Swift custom; native shell chỉ là một WebView load thư mục `public/` được copy từ `dist/` lúc sync.

**Quan trọng:** App ship offline, không load Vercel URL. `capacitor.config.ts` cố ý **không có** `server.url`. Vercel deploy chỉ phục vụ web browser; build App Store là self-contained.

### Yêu cầu

- **macOS** + **Xcode 15+**
- Apple Developer account ($99/năm) để upload TestFlight / App Store
- (Tuỳ) Apple Silicon Mac để build nhanh hơn

Phần Capacitor scaffold đã chuẩn bị sẵn ở `ios/` (commit lên repo). Mở project trên Mac không cần `cap add ios` lại.

### Workflow trên Mac

Clone repo về Mac rồi:

```bash
# 1. Cài deps + build dist + sync sang iOS
npm install
npm run ios:build

# 2. Mở Xcode workspace
npm run ios:open
```

Hai lệnh trên là tất cả. `ios:build` chạy validator + tsc + vite build + `cap sync ios` (copy `dist/` → `ios/App/App/public/`). `ios:open` mở `ios/App/App.xcworkspace` trong Xcode.

### Trong Xcode (lần đầu)

1. **Chọn project root** (`App` ở sidebar) → tab **Signing & Capabilities**.
2. **Team:** chọn Apple Developer Team của bạn.
3. **Bundle Identifier:** `com.pdythanhduy.lifeabroadsimulator` (đã set sẵn trong `capacitor.config.ts`).
4. **Automatically manage signing:** tick. Xcode tự tạo provisioning profile.
5. Bấm ▶ Run trên simulator (vd iPhone 15) để smoke test app khởi chạy đúng và load được dist offline.

### Archive + Upload TestFlight

1. Trong Xcode top bar: chọn target **Any iOS Device (arm64)** thay vì simulator.
2. Menu **Product → Archive**. Đợi 2–5 phút.
3. Khi xong, Organizer mở. Bấm **Distribute App** → **App Store Connect** → **Upload**.
4. Đợi 1–2 phút Xcode upload + signing.
5. Trên https://appstoreconnect.apple.com → **My Apps** → tạo app mới (nếu lần đầu) với cùng Bundle ID. Đợi build "Processing" xong (~10–30 phút từ Apple side).
6. Vào tab **TestFlight** → thêm tester (internal/external). Tester nhận invite qua email → cài TestFlight app → cài game.

### Khi sửa code

Sau mỗi lần đụng src/ hoặc events.json:

```bash
npm run ios:build   # rebuild dist + sync sang ios/App/App/public
```

Trong Xcode bấm Run lại. Không cần đụng config.

### Files chính

| File / folder | Mục đích |
|---|---|
| `capacitor.config.ts` | App ID, app name, web dir. KHÔNG có `server.url`. |
| `ios/App/App.xcworkspace` | Mở bằng Xcode |
| `ios/App/App/public/` | Bundle web — auto-regenerated từ `dist/` qua `cap sync`. **Gitignored.** |
| `ios/.gitignore` | Loại trừ build artifacts, public snapshot, xcuserdata |

### Android build (sau iOS)

Tương tự, chạy `npx cap add android` trên máy có Android Studio. Sẽ làm trong sprint Android riêng.

## Changelog

### v0.1.1 — Ending Collection

Headline: ending unlocks persist across reset, Day 8 teaser, replay CTA improved.

| Sprint | Highlight |
|---|---|
| 10 | Feedback intake template (`docs/playtest-feedback.md`) — table for testers + 5 self-test personas |
| 11 | 5-persona self-playtest run 1 + StatsBar metadata fix (`Tokyo · 23°C` → `Tokyo · 23:47`, no fake realtime) |
| 12 | Go Home ending path verified via Persona 6 (Hard, money tank); 5/5 endings reachable |
| 13 | Validation sprint: StatsBar MAX/MIN cap indicator + tester package (`tester-guide.md`, `tester-feedback-form.md`, `social-drafts.md`, `analytics-v0.md`) |
| 14b | GitHub issue template (`.github/ISSUE_TEMPLATE/playtest-feedback.md`) — one-click feedback with auto-applied labels |
| 14 | **Ending Collection** — `las.endings.unlocked.v1` storage separate from save, EndingScreen shows X/5 collection + locked/unlocked rows + Day 8 teaser; "Chơi lại để mở ending khác" smart CTA |

### v0.1.0 — Public Playtest

| Sprint | Highlight |
|---|---|
| 1 | Engine dedup (no double-fire), defensive save migration, `npm run validate` script wired into build |
| 2 | Autosave hint trên ChatScreen header, **Day Recap** giữa các ngày (stat delta colored, Stress inverted) |
| 3 | +EV35 (lạc đường Shinjuku, không ai giúp), +EV36 (bank form fail, hanko thiếu), tone fix EV28 |
| 4 | QA pass: HowTo button text, EV08 detail, README QA checklist 9 mục với expected variant text |
| 5 | Mobile playtest polish (360–430px): tap targets 44×44, safe-area bottom, `100dvh`, break-words cho Japanese |
| 6 | Vercel deploy: `vercel.json` SPA fallback, meta tags + og + theme-color, favicon SVG, README "Deploy on Vercel" |
| 7 | First-time clarity: tagline *"Chơi như đang trả lời tin nhắn trong 7 ngày đầu ở Nhật. Không có đáp án đúng, chỉ có cách bạn chọn sống."* trên Home + HowTo |
| 8 | Difficulty wording trung thực: "dễ thở hơn / cân bằng / áp lực nặng hơn" thay vì "có người đỡ / không ai đỡ" — cùng câu chuyện, khác chỉ số khởi đầu và hồi phục |

**Initial MVP** (commit `aebcc94`): 5 stats · 3 difficulties · 5 endings · 32 main + 4 branch + 9 epilogue = 45 events · React + TS + Tailwind + Vite, no backend.

## Tài khoản git

Repo public: https://github.com/pdythanhduy/life-abroad-simulator

Khi sửa code, commit + push:

```powershell
git add .
git commit -m "Mô tả ngắn"
git push
```
