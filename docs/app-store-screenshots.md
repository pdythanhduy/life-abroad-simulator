# App Store screenshots — capture guide

Apple requires screenshots in specific sizes per device class. For this MVP
we only need the **iPhone 6.7" display class** (covers iPhone 14/15/16 Pro
Max and similar). Apple will scale this down for smaller iPhone listings
automatically — only 6.5" requires a separate set if Apple rejects.

## Required size

- **iPhone 6.7" display:** **1290 × 2796 px**, PNG, RGB, no alpha channel
- Portrait orientation only
- Maximum 10 screenshots per locale; we ship 5

## How to capture at the right size

The Vite dev server renders the game at any viewport size. Easiest method:

1. `npm run dev`
2. Open Chrome (not Safari — DevTools resize is more flexible)
3. F12 → toggle device toolbar (Ctrl+Shift+M)
4. Top bar: device dropdown → **"Edit…"** → **Add custom device**
   - Name: `App Store 6.7"`
   - Width: `1290`, Height: `2796`
   - Device pixel ratio: `1` (we want pixel-exact, not retina-doubled)
   - User agent: `Mobile`
5. Select the custom device. Page now renders exactly at 1290×2796.
6. DevTools menu (⋮ top-right of DevTools) → **"Capture full-size
   screenshot"** for each screen.
7. Files save to your Downloads folder. Rename per the list below.

Output filenames (used by App Store Connect upload UI):

```
01-home.png
02-mom-chat.png
03-day-recap.png
04-konbini-night.png
05-ending.png
```

## Five screenshots — captions + capture instructions

Captions go in the App Store Connect "screenshot caption" field (Apple
overlays them on the preview if you use App Store Connect's auto-layout, or
you can bake them into the PNG yourself in Figma/Photoshop).

---

### 1. Home — set the premise

**Capture:** Home screen on first launch (no save). MISSION pill visible.

- Open game → if "Tiếp tục" button is showing, Settings → Reset → Home.
- Screenshot the full home.

**Caption — English:**

```
Survive 7 days in Tokyo —
and find one reason to stay for week 8.
```

**Caption — Tiếng Việt:**

```
Sống sót 7 ngày ở Tokyo —
và tìm một lý do để tiếp tục tuần thứ 8.
```

---

### 2. Mom chat — emotional hook

**Capture:** Day 1, event **EV02** (Mom calling/messaging). Make sure the
chat shows mom's pink-bordered bubble + at least one of your choice options
visible.

- Reset save → "Bắt đầu mới" → pick **Normal** → play through EV01
  (arrival) until EV02 mom message reveals.
- Wait until all of mom's messages have revealed AND the choice list shows.
- Screenshot. If a choice button got cut off, scroll up slightly so 1 full
  message + 3 choices are visible.

**Caption — English:**

```
Every reply changes something.
But you only see how when the week ends.
```

**Caption — Tiếng Việt:**

```
Mỗi câu trả lời thay đổi điều gì đó.
Bạn chỉ thấy rõ vào cuối tuần.
```

---

### 3. Day Recap — show the stats system

**Capture:** Day 2 or Day 3 recap screen with at least 2 stats moving in
different directions (one green, one red).

- Easiest path: play Day 1 → at Day Recap between Day 1→2, screenshot.
- If the deltas are all the same color, replay and pick choices that mix
  positive and negative effects (e.g. accept night shift = money up,
  energy down).

**Caption — English:**

```
Five stats that breathe.
Skip dinner once, see it Friday.
```

**Caption — Tiếng Việt:**

```
Năm chỉ số chuyển động liên tục.
Bỏ một bữa, đến thứ Sáu mới thấy.
```

---

### 4. Konbini night shift — show scene art

**Capture:** Any event during a konbini shift (EV08, EV17, or EV26) — the
konbini scene art should be clearly visible behind chat. Pick a moment with
a short message + visible choices so the background is half-exposed.

- Best target: **EV17** (manager asking about overtime) — has a clean
  3-option choice that fits the screen.

**Caption — English:**

```
Tokyo, 2 AM. The fluorescent light hums.
Your manager asks if you can take one more shift.
```

**Caption — Tiếng Việt:**

```
Tokyo, 2 giờ sáng. Đèn neon vẫn kêu.
Tenchou hỏi bạn cố thêm một ca nữa không.
```

---

### 5. Ending — narrative payoff

**Capture:** "Belonging" or "Growth" ending screen (warmest visuals).
Belonging is the route most likely to feel earned for a marketing shot.

- Easy: play through with Easy difficulty, follow Belonging route in
  README QA section 5 (mom open + Sato tea + Kenta + letter).
- At Ending screen, scroll so title + first 2 lines of body + Ending
  Collection bar are visible.

**Caption — English:**

```
Five endings. One week.
You choose which version of yourself walks into week eight.
```

**Caption — Tiếng Việt:**

```
Năm cách kết thúc. Một tuần.
Bạn chọn phiên bản nào của mình bước vào tuần thứ tám.
```

---

## Pre-upload checklist

- [ ] All 5 files exactly **1290×2796** (check Properties → Details on each
      PNG)
- [ ] No watermarks, no DevTools chrome, no browser address bar in the
      capture
- [ ] Dark mode rendered correctly (game is dark-first; no flash of light)
- [ ] Captions checked for typos in both locales
- [ ] First screenshot (`01-home.png`) is the strongest at thumbnail size —
      tag-line readable when shrunk to ~120px wide on App Store search
- [ ] Optional: open each PNG in Preview/Photos and confirm chat text is
      legible at half size (~600px wide); if not, retry with the legibility
      gradient — text should be `text-white/95` over dark scrim, not gray

## Localization strategy

Apple App Store Connect allows separate screenshot uploads per locale. Two
options:

1. **Same image, different caption** (cheapest): upload the 5 English PNGs
   for both en-US and vi-VN locales. Captions in the App Store Connect form
   differ per locale.
2. **Localized in-game screenshots** (better): re-capture the 5 shots after
   switching the in-game text to Vietnamese. The game is already in
   Vietnamese by default, so the **Tiếng Việt** captures are the
   authentic ones. **Recommended:** ship the Vietnamese captures as the
   default and use them for the vi-VN listing; only the en-US listing needs
   English-text captures, which requires a future i18n sprint.

Until i18n lands, **upload the Vietnamese captures for both locales** and
caption them differently. App reviewers accept this for early playtest
releases.
