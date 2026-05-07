# Life Abroad Simulator — MVP 0.1

Game mô phỏng cuộc sống xa quê dạng chat. Season 1: Year One Abroad (7 ngày).

## Yêu cầu

- Node.js 18+ (đã test trên Node 22)
- Windows 10/11 — chạy trong PowerShell
- (Tùy chọn cho mobile build) Android Studio + JDK 17

## Chạy local

```powershell
cd $env:USERPROFILE\Desktop\life-abroad-simulator
npm install
npm run dev
```

Mở: http://localhost:5173

DevTools (F12) → bật Device Mode → chọn iPhone 14 để xem đúng vibe mobile.

## Build production (test bundle)

```powershell
npm run build
npm run preview
```

## Reset save

Mở DevTools → tab **Application** → **Local Storage** → xoá key `las.save.v1`. Hoặc bấm **Reset toàn bộ** trong màn Settings của game.

## Cấu trúc

```
src/
├─ types/game.ts          # types chung
├─ data/events.json       # 30 events (sửa file này để thêm/bớt nội dung)
├─ engine/
│  ├─ difficulty.ts       # starting stats, sleep tick
│  ├─ engine.ts           # game loop, choice resolver
│  ├─ endings.ts          # 5 endings + resolver
│  └─ storage.ts          # localStorage save/load
├─ hooks/useGame.ts       # state hook duy nhất
├─ components/            # các màn hình + UI
├─ App.tsx                # router theo screen
├─ main.tsx               # entrypoint
└─ index.css              # Tailwind
```

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

## Kiểm tra nhanh sau khi sửa code

```powershell
npm run build
```

Lệnh này chạy `tsc --noEmit` trước → nếu pass là code TS đúng → rồi `vite build`.
