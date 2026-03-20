import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";

// ── Shared Ardeno Styles ──────────────────────────────────────────────────────
const ARDENO_STYLES = `
  @keyframes avl-breathe {
    0%,100% { opacity:0.3; transform:scale(1); filter: blur(20px); }
    50%      { opacity:0.6;  transform:scale(1.15); filter: blur(30px); }
  }
  @keyframes avl-drawPath {
    from { stroke-dashoffset: 2000; filter: drop-shadow(0 0 2px rgba(200,128,74,0)); }
    to   { stroke-dashoffset: 0; filter: drop-shadow(0 0 12px rgba(200,128,74,0.6)); }
  }
  @keyframes avl-fillFade {
    from { opacity: 0; filter: blur(4px); transform: scale(0.95); }
    to   { opacity: 1; filter: blur(0px); transform: scale(1); }
  }
  @keyframes avl-charIn {
    from { opacity:0; transform: translateY(20px) scale(1.15); filter:blur(12px) brightness(2); letter-spacing: 0.05em; }
    to   { opacity:1; transform: translateY(0) scale(1); filter:blur(0) brightness(1);  letter-spacing: 0.18em; }
  }
  @keyframes avl-charInUp {
    from { opacity:0; transform: translateY(15px) scale(0.9); filter:blur(8px); }
    to   { opacity:1; transform: translateY(0) scale(1); filter:blur(0); }
  }
  @keyframes avl-crownReveal {
    from { opacity:0; transform:translateY(-20px) scale(0.9); filter: blur(10px); }
    to   { opacity:1; transform:translateY(0) scale(1); filter: blur(0px); }
  }
  @keyframes avl-fadeInPhase {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes avl-fadeOutPhase {
    from { opacity:1; transform:scale(1); filter: blur(0px); }
    to   { opacity:0; transform:scale(1.05); filter: blur(14px); }
  }
  @keyframes avl-flashRed {
    0%   { opacity:0; }
    40%  { opacity:1; filter: blur(10px); }
    100% { opacity:0; filter: blur(0px); }
  }
  .glass-overlay {
    backdrop-filter: blur(8px);
    background: radial-gradient(circle at 50% 50%, rgba(10,5,5,0.4) 0%, rgba(0,0,0,0.9) 100%);
  }
`;

const A_MARK_PATH =
  "M 514.300781 878.699219 L 434.792969 718.777344 " +
  "C 411.382812 739.714844 390.78125 776.453125 391.929688 806.554688 " +
  "L 415.984375 853.996094 " +
  "C 416.851562 855.699219 418.324219 857.015625 420.113281 857.679688 " +
  "L 504.851562 889.203125 " +
  "C 511.304688 891.605469 517.367188 884.867188 514.300781 878.699219 Z " +
  "M 371.617188 791.304688 " +
  "C 371.410156 791.605469 371.222656 791.925781 371.054688 792.265625 " +
  "L 340.871094 853.445312 " +
  "C 340.011719 855.183594 338.523438 856.527344 336.707031 857.207031 " +
  "L 250.40625 889.308594 " +
  "C 243.988281 891.699219 237.9375 885.042969 240.917969 878.878906 " +
  "L 369.019531 614.007812 " +
  "C 371.769531 608.324219 379.851562 608.277344 382.664062 613.929688 " +
  "L 432.074219 713.316406 " +
  "C 404.980469 732.679688 383.765625 759.746094 371.617188 791.304688";

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' " +
  "numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FULL_COVER: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };
const CENTER_FLEX: React.CSSProperties = { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" };

// ── Google Fonts injected once ─────────────────────────────────────────────
const injectFonts = () => {
  if (document.getElementById("cinnamon-oak-fonts")) return;
  const link = document.createElement("link");
  link.id = "cinnamon-oak-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Lato:wght@300;400" +
    "&family=Cormorant+Garamond:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400" +
    "&family=Sora:wght@300;400" +
    "&family=Cinzel:wght@400;600" +
    "&display=swap";
  document.head.appendChild(link);
};

// ── Oak Leaf SVG ───────────────────────────────────────────────────────────
const OakLeafIcon: React.FC = () => (
  <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <defs>
      <radialGradient id="col-cbg" cx="50%" cy="38%" r="62%">
        <stop offset="0%" stopColor="#3a1c07" />
        <stop offset="100%" stopColor="#1c0d03" />
      </radialGradient>
      <linearGradient id="col-lfg" x1="30%" y1="10%" x2="70%" y2="90%">
        <stop offset="0%" stopColor="#c8804a" />
        <stop offset="50%" stopColor="#8b4a18" />
        <stop offset="100%" stopColor="#562a08" />
      </linearGradient>
      <filter id="col-shad">
        <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="rgba(0,0,0,0.55)" />
      </filter>
    </defs>
    <circle cx="60" cy="60" r="53" fill="url(#col-cbg)" stroke="#5a2c0a" strokeWidth="1.8" />
    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(80,40,10,0.3)" strokeWidth="0.8" />
    <g stroke="rgba(110,60,18,0.35)" strokeWidth="1" strokeLinecap="round">
      <line x1="60" y1="5"   x2="60" y2="12" />
      <line x1="60" y1="108" x2="60" y2="115" />
      <line x1="5"  y1="60"  x2="12" y2="60" />
      <line x1="108" y1="60" x2="115" y2="60" />
    </g>
    <g className="col-leaf-sway" filter="url(#col-shad)">
      <g transform="translate(21,22) scale(0.78)">
        <path
          d="M 50,95 C 48,90 47,85 48,80 C 44,80 39,82 36,79 C 33,76 34,71 31,68
             C 27,65 22,66 20,62 C 18,58 20,53 18,49 C 16,45 11,44 11,39
             C 11,34 16,30 21,31 C 24,32 26,35 29,34 C 31,33 32,28 35,26
             C 38,24 42,25 44,23 C 46,21 46,16 50,15 C 54,16 54,21 56,23
             C 58,25 62,24 65,26 C 68,28 69,33 71,34 C 74,35 76,32 79,31
             C 84,30 89,34 89,39 C 89,44 84,45 82,49 C 80,53 82,58 80,62
             C 78,66 73,65 69,68 C 66,71 67,76 64,79 C 61,82 56,80 52,80
             C 53,85 52,90 50,95 Z"
          fill="url(#col-lfg)"
          stroke="#3d1a05"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line x1="50" y1="92" x2="50" y2="18" stroke="rgba(20,6,0,0.38)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="50" y1="95" x2="50" y2="88" stroke="rgba(20,6,0,0.5)"  strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="70" x2="35" y2="66" stroke="rgba(20,6,0,0.25)" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="50" y1="57" x2="32" y2="53" stroke="rgba(20,6,0,0.25)" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="50" y1="44" x2="33" y2="40" stroke="rgba(20,6,0,0.25)" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="50" y1="32" x2="38" y2="27" stroke="rgba(20,6,0,0.22)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="50" y1="70" x2="65" y2="66" stroke="rgba(20,6,0,0.25)" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="50" y1="57" x2="68" y2="53" stroke="rgba(20,6,0,0.25)" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="50" y1="44" x2="67" y2="40" stroke="rgba(20,6,0,0.25)" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="50" y1="32" x2="62" y2="27" stroke="rgba(20,6,0,0.22)" strokeWidth="0.8" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);

// ── Ardeno Components ─────────────────────────────────────────────────────────
const SvgDefs = memo(() => (
  <defs>
    <linearGradient id="avl-aGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#e8ba87" />
      <stop offset="50%" stopColor="#c8845a" />
      <stop offset="100%" stopColor="#8b4a18" />
    </linearGradient>
    <linearGradient id="avl-aStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#f0dfc4" />
      <stop offset="100%" stopColor="#c8845a" />
    </linearGradient>
    <filter id="avl-aGlow">
      <feGaussianBlur stdDeviation="8" result="g" />
      <feMerge>
        <feMergeNode in="g" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
));
SvgDefs.displayName = "SvgDefs";

const StaggerWord = memo<{ text: string; baseDelay: number; charStyle: React.CSSProperties; animName?: string }>(
  ({ text, baseDelay, charStyle, animName = "avl-charIn" }) => (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            ...charStyle,
            display: "inline-block",
            opacity: 0,
            animation: `${animName} 0.7s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * 0.06}s forwards`,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  )
);
StaggerWord.displayName = "StaggerWord";

const ArdenoPhase = memo<{ exiting: boolean; flashRed: boolean; progress: number }>(({ exiting, flashRed, progress }) => (
  <div
    className="glass-overlay"
    style={{
      ...FULL_COVER,
      animation: exiting ? "avl-fadeOutPhase 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "avl-fadeInPhase 1s ease-out forwards",
      zIndex: 3,
      perspective: "1000px"
    }}
  >
    <div style={{ ...FULL_COVER, backgroundImage: GRAIN_BG, opacity: 0.04, mixBlendMode: "overlay", pointerEvents: "none" }} />
    <div style={{ ...FULL_COVER, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
    <div style={{ ...FULL_COVER, background: "radial-gradient(circle at 50% 45%, rgba(200,132,90,0.15) 0%, transparent 50%)", animation: "avl-breathe 5s ease-in-out infinite", pointerEvents: "none" }} />
    <div style={CENTER_FLEX}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ width: 80, height: 80, marginBottom: 8, opacity: 0, animation: "avl-crownReveal 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s forwards" }}>
          <svg viewBox="200 580 360 340" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <SvgDefs />
            <path d={A_MARK_PATH} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <path d={A_MARK_PATH} fill="none" stroke="url(#avl-aStroke)" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 2000, animation: "avl-drawPath 2.2s cubic-bezier(0.2,1,0.4,1) 0.4s forwards" }} />
            <path d={A_MARK_PATH} fill="url(#avl-aGrad)" filter="url(#avl-aGlow)" style={{ opacity: 0, transformOrigin: "center", animation: "avl-fillFade 1.4s cubic-bezier(0.16,1,0.3,1) 1.8s forwards" }} />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <StaggerWord text="ARDENO" baseDelay={0.8} charStyle={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 8vw, 34px)", fontWeight: 600, color: "#ffffff", textShadow: "0 0 16px rgba(255,255,255,0.3)", letterSpacing: "0.18em" }} />
          <StaggerWord text="STUDIO" baseDelay={1.4} charStyle={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 4vw, 15px)", fontWeight: 300, fontStyle: "italic", color: "rgba(200,132,90,0.8)", letterSpacing: "0.5em", textShadow: "0 0 12px rgba(200,132,90,0.4)" }} animName="avl-charInUp" />
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", width: 280, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>{progress < 100 ? "LOADING" : "INITIALIZING"}</p>
      <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)", overflow: "hidden", position: "relative" }}>
        <motion.div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, transparent, #c8845a)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: progress / 100 }} transition={{ ease: "easeOut", duration: 0.1 }} />
      </div>
    </div>
    {flashRed && <div style={{ ...FULL_COVER, background: "radial-gradient(circle at 50% 50%, rgba(200,132,90,0.18) 0%, transparent 80%)", animation: "avl-flashRed 0.6s cubic-bezier(0.16,1,0.3,1) forwards", pointerEvents: "none", zIndex: 10 }} />}
  </div>
));
ArdenoPhase.displayName = "ArdenoPhase";

// ── DemoLoader — Cinnamon Oak Café branded ─────────────────────────────────
const DemoLoader: React.FC<{ onComplete?: () => void; demoName?: string; demoLogoUrl?: string }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"ardeno" | "demo" | "done">("ardeno");
  const [ardenoExiting, setArdenoExiting] = useState(false);
  const [demoExiting, setDemoExiting] = useState(false);
  const [flashRed, setFlashRed] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef(0);

  useEffect(() => {
    injectFonts();
    const style = document.createElement("style");
    style.id = "avl-keyframes";
    style.textContent = ARDENO_STYLES;
    document.head.appendChild(style);

    // Progress bar
    const start = Date.now();
    const duration = 2400;
    const tick = () => {
      const raw = Math.min(((Date.now() - start) / duration) * 100, 100);
      setProgress(Math.round(raw));
      if (raw < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Sequence
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setFlashRed(true), 2800));
    timers.push(setTimeout(() => setArdenoExiting(true), 2900));
    timers.push(setTimeout(() => setPhase("demo"), 3300));

    // Phase 2 (Demo)
    const demoRevealTime = 3300;
    const demoDuration = 2800;
    timers.push(setTimeout(() => setDemoExiting(true), demoRevealTime + demoDuration - 600));
    timers.push(setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, demoRevealTime + demoDuration));

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
      style.remove();
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", background: "#050303" }}>
      {phase === "ardeno" && <ArdenoPhase exiting={ardenoExiting} flashRed={flashRed} progress={progress} />}
      
      {phase === "demo" && (
        <div style={{
          ...FULL_COVER,
          background: "#1a0f06",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: demoExiting ? "col-fadeOut 0.6s ease forwards" : "col-fadeIn 0.8s ease forwards",
        }}>
          <style>{`
            @keyframes col-popIn { from { opacity: 0; transform: scale(0.55) rotate(-5deg); } to { opacity: 1; transform: scale(1) rotate(0deg); } }
            @keyframes col-fadeUp { from { opacity: 0; transform: translateY(9px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes col-fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes col-fadeOut { from { opacity: 1; } to { opacity: 0; } }
            @keyframes col-growLine { from { width: 0; } to { width: 52px; } }
            @keyframes col-steamUp { 0% { opacity: 0; transform: translateY(0); } 35% { opacity: 0.6; } 100% { opacity: 0; transform: translateY(-20px); } }
            @keyframes col-sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
            .col-icon-wrap { width: 120px; height: 120px; position: relative; margin-bottom: 22px; opacity: 0; animation: col-popIn 0.75s cubic-bezier(0.34,1.56,0.64,1) 0.2s forwards; }
            .col-steam { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px; align-items: flex-end; }
            .col-steam-wisp { width: 2px; border-radius: 3px; background: linear-gradient(to top, rgba(210,175,130,0.45), transparent); animation: col-steamUp 2.2s ease-in-out infinite; }
            .col-leaf-sway { animation: col-sway 4s ease-in-out infinite; transform-origin: 60px 55px; }
            .col-cinnamon { font-family: 'Lato', sans-serif; font-size: 12px; font-weight: 300; letter-spacing: 0.46em; color: #a86838; text-transform: uppercase; display: block; margin-bottom: 5px; opacity: 0; animation: col-fadeUp 0.6s ease 0.9s forwards; }
            .col-wordmark { display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 50px; font-weight: 700; line-height: 1; opacity: 0; animation: col-fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.1s forwards; }
            .col-divider { display: flex; align-items: center; gap: 10px; opacity: 0; animation: col-fadeIn 0.6s ease 1.6s forwards; }
            .col-div-line { height: 1px; width: 0; animation: col-growLine 0.7s ease 1.65s forwards; }
          `}</style>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 60% at 50% 48%, rgba(90,42,10,0.68) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="col-icon-wrap">
              <OakLeafIcon />
              <div className="col-steam">
                <div className="col-steam-wisp" style={{ height: 15, animationDelay: "0s" }} />
                <div className="col-steam-wisp" style={{ height: 22, animationDelay: "0.4s" }} />
                <div className="col-steam-wisp" style={{ height: 14, animationDelay: "0.85s" }} />
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span className="col-cinnamon">Cinnamon</span>
              <span className="col-wordmark">
                <span style={{ fontStyle: "italic", color: "#c8845a" }}>Oak</span>
                <span style={{ fontStyle: "normal", color: "#f0dfc4", marginLeft: 3 }}>Café</span>
              </span>
            </div>
            <div className="col-divider">
              <div className="col-div-line" style={{ background: "linear-gradient(90deg, transparent, rgba(150,90,40,0.5))" }} />
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(150,90,40,0.55)" }} />
              <div className="col-div-line" style={{ background: "linear-gradient(90deg, rgba(150,90,40,0.5), transparent)" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoLoader;

