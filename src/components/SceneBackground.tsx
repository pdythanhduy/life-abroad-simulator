// Layered scene background.
//
//   Layer A — gradient (always present, instant)
//   Layer B — SVG silhouette fallback (used until/unless image loads)
//   Layer C — /scenes/{key}.jpg if it exists (covers layers A+B)
//   Layer D — CSS animated overlay (rain, bats, flicker, dust, etc.)
//
// User can drop JPG/PNG files into public/scenes/ at any time — no code
// change needed. Missing files just fall back to the SVG layer.

import { useEffect, useState } from "react";

type SceneKey =
  | "tiny_room"
  | "konbini"
  | "station_night"
  | "office"
  | "rainy_street"
  | "cityhall";

const GRADIENT: Record<SceneKey, string> = {
  tiny_room:     "from-[#0e1118] to-[#1a1d28]",
  konbini:       "from-[#0e1726] to-[#152033]",
  station_night: "from-[#0a0d16] to-[#181c2c]",
  office:        "from-[#16131a] to-[#1f1c26]",
  rainy_street:  "from-[#0c1014] to-[#161b22]",
  cityhall:      "from-[#11140e] to-[#1c2017]",
};

function isSceneKey(s: string): s is SceneKey {
  return s in GRADIENT;
}

// ---------- SVG silhouette fallbacks ----------

function TinyRoom() {
  return (
    <svg viewBox="0 0 100 180" preserveAspectRatio="xMidYMid slice"
         className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
      <rect x="56" y="18" width="36" height="50" fill="#3a3025" opacity="0.7" rx="1"/>
      <line x1="74" y1="18" x2="74" y2="68" stroke="#1a1d28" strokeWidth="1"/>
      <line x1="56" y1="44" x2="92" y2="44" stroke="#1a1d28" strokeWidth="1"/>
      <path d="M56 18 L58 68 L62 18 Z" fill="#0e1118" opacity="0.8"/>
      <path d="M88 18 L90 68 L92 18 Z" fill="#0e1118" opacity="0.8"/>
      <rect x="12" y="118" width="26" height="3" fill="#0a0d12"/>
      <rect x="14" y="121" width="2" height="14" fill="#0a0d12"/>
      <rect x="34" y="121" width="2" height="14" fill="#0a0d12"/>
      <rect x="4" y="152" width="86" height="14" fill="#0a0d12" opacity="0.85" rx="2"/>
      <rect x="4" y="152" width="86" height="4" fill="#1a1d28" opacity="0.7" rx="1"/>
      <line x1="0" y1="142" x2="100" y2="142" stroke="#0a0d12" strokeWidth="0.8" opacity="0.85"/>
    </svg>
  );
}

function Konbini() {
  return (
    <svg viewBox="0 0 100 180" preserveAspectRatio="xMidYMid slice"
         className="absolute inset-0 w-full h-full opacity-55 pointer-events-none">
      <rect x="6"  y="4" width="26" height="3" fill="#cdeaff" opacity="0.85"/>
      <rect x="37" y="4" width="26" height="3" fill="#cdeaff" opacity="0.85"/>
      <rect x="68" y="4" width="26" height="3" fill="#cdeaff" opacity="0.85"/>
      <rect x="0" y="7" width="100" height="18" fill="#cdeaff" opacity="0.08"/>
      <rect x="28" y="28" width="44" height="12" fill="#0a0d12" opacity="0.9" rx="1"/>
      {[31,38,45,52,59,66].map((x,i)=>(
        <rect key={i} x={x} y={31} width="4" height="6" fill="#cdeaff" opacity="0.7"/>
      ))}
      <rect x="4" y="78" width="92" height="4" fill="#0a0d12"/>
      <rect x="4" y="100" width="92" height="4" fill="#0a0d12"/>
      <rect x="4" y="122" width="92" height="4" fill="#0a0d12"/>
      {[8,21,34,47,60,73,86].map((x,i)=>(
        <rect key={i} x={x} y={68} width="9" height="10" fill="#1a2230" opacity="0.85"/>
      ))}
      {[8,21,34,47,60,73,86].map((x,i)=>(
        <rect key={i+'b'} x={x} y={90} width="9" height="10" fill="#1a2230" opacity="0.85"/>
      ))}
      <line x1="0" y1="140" x2="100" y2="140" stroke="#0a0d12" strokeWidth="0.8" opacity="0.85"/>
    </svg>
  );
}

function StationNight() {
  return (
    <svg viewBox="0 0 100 180" preserveAspectRatio="xMidYMid slice"
         className="absolute inset-0 w-full h-full opacity-55 pointer-events-none">
      <rect x="0" y="0" width="100" height="46" fill="#05070b" opacity="0.6"/>
      {Array.from({length:24}).map((_,i)=>(
        <rect key={i}
              x={3 + i*4.1} y={48 + (i%4)*3}
              width="1.5" height="1.5"
              fill="#d6b34a"
              opacity={0.3 + (i%5)*0.12}/>
      ))}
      <rect x="0" y="118" width="100" height="22" fill="#0a0d12" opacity="0.95"/>
      <rect x="0" y="116" width="100" height="2" fill="#d6b34a" opacity="0.7"/>
      <line x1="0" y1="146" x2="100" y2="156" stroke="#1a1d28" strokeWidth="1.2"/>
      <line x1="0" y1="158" x2="100" y2="170" stroke="#1a1d28" strokeWidth="1.2"/>
      <rect x="11" y="42" width="2" height="78" fill="#0a0d12"/>
      <rect x="6" y="40" width="12" height="8" fill="#3a3025" opacity="0.85" rx="1"/>
      <rect x="6" y="40" width="12" height="8" fill="#d6b34a" opacity="0.25"/>
      <rect x="66" y="28" width="26" height="16" fill="#0a0d12" rx="1"/>
      <rect x="71" y="32" width="4" height="8" fill="#cdeaff" opacity="0.65"/>
      <rect x="78" y="32" width="4" height="8" fill="#cdeaff" opacity="0.65"/>
      <rect x="85" y="32" width="4" height="8" fill="#cdeaff" opacity="0.65"/>
    </svg>
  );
}

function Office() {
  return (
    <svg viewBox="0 0 100 180" preserveAspectRatio="xMidYMid slice"
         className="absolute inset-0 w-full h-full opacity-45 pointer-events-none">
      <line x1="0" y1="14" x2="100" y2="14" stroke="#0a0d12" strokeWidth="0.8"/>
      {[0,32,64].map((x,i)=>(
        <g key={i}>
          <rect x={4+x} y={92} width="26" height="4" fill="#0a0d12"/>
          <rect x={6+x} y={96} width="2" height="18" fill="#0a0d12"/>
          <rect x={28+x} y={96} width="2" height="18" fill="#0a0d12"/>
          <rect x={9+x} y={76} width="16" height="11" fill="#0a0d12" rx="0.5"/>
          <rect x={10+x} y={77} width="14" height="9" fill="#cdeaff" opacity="0.35"/>
          <rect x={13+x} y={116} width="8" height="12" fill="#0a0d12" rx="0.5"/>
        </g>
      ))}
      <line x1="0" y1="140" x2="100" y2="140" stroke="#0a0d12" strokeWidth="0.8" opacity="0.85"/>
    </svg>
  );
}

function RainyStreet() {
  return (
    <svg viewBox="0 0 100 180" preserveAspectRatio="xMidYMid slice"
         className="absolute inset-0 w-full h-full opacity-55 pointer-events-none">
      <rect x="0"  y="48" width="24" height="84" fill="#0a0d12" opacity="0.85"/>
      <rect x="22" y="60" width="16" height="72" fill="#0a0d12" opacity="0.85"/>
      <rect x="36" y="40" width="22" height="92" fill="#0a0d12" opacity="0.85"/>
      <rect x="56" y="56" width="20" height="76" fill="#0a0d12" opacity="0.85"/>
      <rect x="74" y="50" width="26" height="82" fill="#0a0d12" opacity="0.85"/>
      {[[6,70],[14,90],[40,80],[48,100],[60,76],[80,84],[92,72],[10,108],[42,118]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="2" height="2" fill="#d6b34a" opacity="0.75"/>
      ))}
      <rect x="0" y="138" width="100" height="42" fill="#0a0d12" opacity="0.95"/>
      <rect x="0" y="138" width="100" height="3" fill="#cdeaff" opacity="0.3"/>
      <path d="M38 130 Q50 118 62 130 L62 132 Q50 128 38 132 Z" fill="#0a0d12"/>
      <line x1="50" y1="130" x2="50" y2="148" stroke="#0a0d12" strokeWidth="1.2"/>
    </svg>
  );
}

function CityHall() {
  return (
    <svg viewBox="0 0 100 180" preserveAspectRatio="xMidYMid slice"
         className="absolute inset-0 w-full h-full opacity-45 pointer-events-none">
      <line x1="0" y1="12" x2="100" y2="12" stroke="#0a0d12" strokeWidth="0.8"/>
      <line x1="33" y1="0" x2="33" y2="12" stroke="#0a0d12" strokeWidth="0.6"/>
      <line x1="66" y1="0" x2="66" y2="12" stroke="#0a0d12" strokeWidth="0.6"/>
      <rect x="0" y="96" width="100" height="8" fill="#0a0d12"/>
      <rect x="0" y="104" width="100" height="26" fill="#0a0d12" opacity="0.85"/>
      <rect x="12" y="86" width="20" height="10" fill="#cdeaff" opacity="0.6" rx="0.5"/>
      <line x1="12" y1="90" x2="32" y2="90" stroke="#0a0d12" strokeWidth="0.5"/>
      <line x1="12" y1="93" x2="32" y2="93" stroke="#0a0d12" strokeWidth="0.5"/>
      <rect x="54" y="82" width="28" height="16" fill="#0a0d12" rx="1"/>
      <rect x="58" y="86" width="20" height="10" fill="#d6b34a" opacity="0.65"/>
      <rect x="76" y="20" width="16" height="44" fill="#0a0d12" opacity="0.85"/>
      <rect x="78" y="22" width="12" height="40" fill="#1c2017" opacity="0.95"/>
      {[20,38,56,74].map((x,i)=>(
        <rect key={i} x={x} y={146} width="8" height="2" fill="#d6b34a" opacity="0.6"/>
      ))}
      <line x1="0" y1="138" x2="100" y2="138" stroke="#0a0d12" strokeWidth="0.8" opacity="0.85"/>
    </svg>
  );
}

const SVG_RENDERERS: Record<SceneKey, () => React.JSX.Element> = {
  tiny_room: TinyRoom,
  konbini: Konbini,
  station_night: StationNight,
  office: Office,
  rainy_street: RainyStreet,
  cityhall: CityHall,
};

// ---------- Animated overlays per scene ----------

function RainOverlay({ density = 22 }: { density?: number }) {
  const streaks = Array.from({ length: density }).map((_, i) => ({
    left: `${(i * 7.13) % 100}%`,
    duration: `${0.6 + (i % 6) * 0.12}s`,
    delay: `${(i % 9) * 0.13}s`,
    key: i,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streaks.map((s) => (
        <span
          key={s.key}
          className="rain-streak"
          style={{
            left: s.left,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

function Bat() {
  // Single SVG bat that loops across the upper sky every ~18s.
  return (
    <svg className="bat" viewBox="0 0 36 14" aria-hidden>
      <g className="bat-wings" fill="#05070b">
        <path d="M18 7 Q12 0 4 4 Q10 6 8 10 Q14 8 18 9 Z"/>
        <path d="M18 7 Q24 0 32 4 Q26 6 28 10 Q22 8 18 9 Z"/>
        <ellipse cx="18" cy="7" rx="1.4" ry="2.4"/>
      </g>
    </svg>
  );
}

function DustMotes({ count = 14 }: { count?: number }) {
  const motes = Array.from({ length: count }).map((_, i) => ({
    left: `${(i * 9.7) % 100}%`,
    duration: `${22 + (i % 6) * 4}s`,
    delay: `-${(i * 1.8) % 22}s`,
    key: i,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {motes.map((m) => (
        <span
          key={m.key}
          className="dust-mote"
          style={{
            left: m.left,
            animationDuration: m.duration,
            animationDelay: m.delay,
          }}
        />
      ))}
    </div>
  );
}

function OverlayFor({ sceneKey }: { sceneKey: SceneKey }) {
  switch (sceneKey) {
    case "rainy_street":
      return (
        <>
          <RainOverlay density={28} />
          <div className="absolute inset-0 lightning pointer-events-none" />
        </>
      );
    case "station_night":
      return (
        <>
          <RainOverlay density={14} />
          <Bat />
          <div className="train-sweep" />
        </>
      );
    case "konbini":
      return <div className="absolute inset-0 flicker-bright pointer-events-none" />;
    case "cityhall":
      return <div className="absolute inset-0 flicker-bright pointer-events-none" style={{ animationDuration: "13s" }} />;
    case "tiny_room":
      return <DustMotes count={16} />;
    case "office":
      return <div className="absolute inset-0 monitor-pulse pointer-events-none" />;
    default:
      return null;
  }
}

// ---------- Image layer ----------

function useImageProbe(src: string): "unknown" | "loaded" | "missing" {
  const [state, setState] = useState<"unknown" | "loaded" | "missing">("unknown");
  useEffect(() => {
    setState("unknown");
    const img = new Image();
    let cancelled = false;
    img.onload = () => !cancelled && setState("loaded");
    img.onerror = () => !cancelled && setState("missing");
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);
  return state;
}

export default function SceneBackground({ sceneKey }: { sceneKey?: string }) {
  const key: SceneKey = sceneKey && isSceneKey(sceneKey) ? sceneKey : "tiny_room";
  const gradient = GRADIENT[key];
  const Render = SVG_RENDERERS[key];
  const imgSrc = `/scenes/${key}.jpg`;
  const imgState = useImageProbe(imgSrc);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-gradient-to-b ${gradient}`} aria-hidden>
      {/* Silhouette — shown until image loads, kept behind otherwise. */}
      <Render />

      {/* Photo, if present in public/scenes/. */}
      {imgState === "loaded" && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 1,
          }}
        />
      )}

      {/* Atmospheric motion always on top. */}
      <OverlayFor sceneKey={key} />

      {/* Bottom darken gradient so chat bubbles stay legible over any photo. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,7,11,0) 0%, rgba(5,7,11,0.55) 60%, rgba(5,7,11,0.85) 100%)",
        }}
      />
    </div>
  );
}
