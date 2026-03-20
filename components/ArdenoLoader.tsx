import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ArdenoLoaderProps {
    onComplete: () => void;
}

const LOADER_PHASE = {
    INITIAL: 0,
    STAGE_IN: 1,
    STROKE_DRAW: 2,
    FILL: 3,
    ARDENO: 4,
    DIVIDER: 5,
    STUDIO: 6,
    EXIT: 8,
} as const;

type LoaderPhase = (typeof LOADER_PHASE)[keyof typeof LOADER_PHASE];

const STROKE_D =
    "M 514.300781 878.699219 L 434.792969 718.777344 C 411.382812 739.714844 390.78125 776.453125 391.929688 806.554688 L 415.984375 853.996094 C 416.851562 855.699219 418.324219 857.015625 420.113281 857.679688 L 504.851562 889.203125 C 511.304688 891.605469 517.367188 884.867188 514.300781 878.699219 Z M 371.617188 791.304688 C 371.410156 791.605469 371.222656 791.925781 371.054688 792.265625 L 340.871094 853.445312 C 340.011719 855.183594 338.523438 856.527344 336.707031 857.207031 L 250.40625 889.308594 C 243.988281 891.699219 237.9375 885.042969 240.917969 878.878906 L 369.019531 614.007812 C 371.769531 608.324219 379.851562 608.277344 382.664062 613.929688 L 432.074219 713.316406 C 404.980469 732.679688 383.765625 759.746094 371.617188 791.304688";

const expoEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const exitEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const ArdenoLoader: React.FC<ArdenoLoaderProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState<LoaderPhase>(LOADER_PHASE.INITIAL);
    const [flareActive, setFlareActive] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        // Allow bypassing loader for Lighthouse/Performance testing
        const params = new URLSearchParams(window.location.search);
        if (params.has('skipLoader') || (window as any).SKIP_LOADER) {
            onComplete();
            return;
        }

        let cancelled = false;
        const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

        const sequence = async () => {
            // Speed up the sequence significantly
            // Total time: ~2.0s instead of ~4.5s
            
            if (prefersReducedMotion) {
                setPhase(LOADER_PHASE.STAGE_IN);
                await wait(150);
                if (cancelled) return;

                setPhase(LOADER_PHASE.STUDIO);
                await wait(200);
                if (cancelled) return;

                setPhase(LOADER_PHASE.EXIT);
                await wait(200);
                if (!cancelled) onComplete();
                return;
            }

            // Full optimized sequence
            setPhase(LOADER_PHASE.STAGE_IN);
            await wait(400); // Reduced from 800
            if (cancelled) return;

            setPhase(LOADER_PHASE.STROKE_DRAW);
            await wait(600); // Reduced from 1100
            if (cancelled) return;

            setPhase(LOADER_PHASE.FILL);
            await wait(150); // Reduced from 200
            if (cancelled) return;

            setPhase(LOADER_PHASE.ARDENO);
            await wait(200); // Reduced from 300
            if (cancelled) return;

            setPhase(LOADER_PHASE.DIVIDER);
            await wait(150); // Reduced from 200
            if (cancelled) return;

            setPhase(LOADER_PHASE.STUDIO);
            await wait(500); // Reduced from 1200
            if (cancelled) return;

            setFlareActive(true);
            await wait(100); // Reduced from 140
            if (cancelled) return;
            setFlareActive(false);

            setPhase(LOADER_PHASE.EXIT);
            await wait(400); // Reduced from 850
            if (!cancelled) onComplete();
        };

        sequence();

        return () => {
            cancelled = true;
        };
    }, [onComplete, prefersReducedMotion]);

    return (
        <div
            className="fixed inset-0 z-[10000] bg-[#07070a] overflow-hidden flex items-center justify-center"
            role="status"
            aria-live="polite"
            aria-label="Loading Ardeno Studio"
        >
            {/* Visually hidden message for screen readers */}
            <span className="sr-only">Loading Ardeno Studio</span>

            {/* Noise Grain (decorative) */}
            <div
                className="absolute inset-0 z-[10001] pointer-events-none opacity-[0.052] bg-grain animate-grain-shimmer"
                aria-hidden="true"
            />

            {/* Vignette (decorative) */}
            <div
                className="absolute inset-0 z-[10002] pointer-events-none bg-[radial-gradient(ellipse_90%_80%_at_50%_46%,rgba(255,255,255,0.012)_0%,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.7)_100%)]"
                aria-hidden="true"
            />

            {/* Ambient Glow */}
            <motion.div
                className="absolute z-[10003] pointer-events-none w-[70vmin] h-[70vmin] rounded-full"
                style={{
                    left: '50%',
                    top: '50%',
                    background:
                        'radial-gradient(circle, rgba(255,51,1,0.13) 0%, rgba(255,51,1,0.04) 50%, transparent 72%)',
                }}
                initial={{ opacity: 0, x: '-50%', y: '-50%' }}
                animate={
                    phase >= LOADER_PHASE.STAGE_IN
                        ? {
                            opacity: 1,
                            scale: [1, 1.1, 1],
                            x: '-50%',
                            y: '-50%',
                        }
                        : {}
                }
                transition={
                    phase >= LOADER_PHASE.STAGE_IN
                        ? {
                            opacity: { duration: 1.2 },
                            scale: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                        }
                        : {}
                }
                aria-hidden="true"
            />

            {/* Red Flare Exit */}
            <AnimatePresence>
                {flareActive && !prefersReducedMotion && (
                    <motion.div
                        key="flare"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10005] pointer-events-none bg-[radial-gradient(900px_500px_at_50%_48%,rgba(255,51,1,0.22),transparent_62%)]"
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Flash Finish (White) */}
            <motion.div
                className="fixed inset-0 z-[10006] bg-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={phase === LOADER_PHASE.EXIT ? { opacity: [0, 1, 0] } : {}}
                transition={{ duration: 0.8, times: [0, 0.2, 1] }}
                aria-hidden="true"
            />

            {/* Center Stage */}
            <motion.div
                className="relative z-[10004] flex flex-col items-center w-[min(580px,92vw)] text-center"
                initial={{ opacity: 0, y: 10, scale: 0.975 }}
                animate={
                    phase >= LOADER_PHASE.STAGE_IN
                        ? phase === LOADER_PHASE.EXIT
                            ? { opacity: 0, scale: 1.14, filter: 'blur(12px)' }
                            : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                        : {}
                }
                transition={{
                    duration: phase === LOADER_PHASE.EXIT ? 0.55 : 0.75,
                    ease: phase === LOADER_PHASE.EXIT ? exitEase : expoEase,
                }}
            >
                {/* Logo Mark */}
                <svg
                    viewBox="200 580 380 340"
                    className="w-[clamp(160px,20vw,230px)] h-[clamp(160px,20vw,230px)] overflow-visible"
                    aria-hidden="true"
                >
                    <defs>
                        <filter id="p4-glow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="9" result="blur" />
                            <feColorMatrix
                                in="blur"
                                type="matrix"
                                values="1 0 0 0 0.05  0 0.1 0 0 0  0 0 0.05 0 0  0 0 0 0.9 0"
                                result="glow"
                            />
                            <feMerge>
                                <feMergeNode in="glow" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="p4-sheen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff8060" />
                            <stop offset="40%" stopColor="#ff3301" />
                            <stop offset="56%" stopColor="#ffc4b4" stopOpacity="0.95" />
                            <stop offset="72%" stopColor="#ff3301" />
                            <stop offset="100%" stopColor="#ff3301" />
                        </linearGradient>
                    </defs>

                    {/* Stroke Path */}
                    <motion.path
                        d={STROKE_D}
                        fill="transparent"
                        stroke="url(#p4-sheen)"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ filter: 'url(#p4-glow)' }}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={
                            phase >= LOADER_PHASE.STROKE_DRAW
                                ? {
                                    pathLength: 1,
                                    opacity: phase >= LOADER_PHASE.FILL ? 0 : 1,
                                }
                                : {}
                        }
                        transition={
                            phase >= LOADER_PHASE.STROKE_DRAW
                                ? {
                                    pathLength: { duration: 1.0, ease: 'easeOut' },
                                    opacity: { duration: 0.45, ease: 'easeIn' },
                                }
                                : {}
                        }
                    />

                    {/* Fill Path */}
                    <motion.path
                        d={STROKE_D}
                        fill="#ff3301"
                        fillRule="nonzero"
                        style={{ filter: 'url(#p4-glow)' }}
                        initial={{ opacity: 0 }}
                        animate={phase >= LOADER_PHASE.FILL ? { opacity: 1 } : {}}
                        transition={{ duration: 0.65, ease: expoEase }}
                    />
                </svg>

                {/* Text Block */}
                <div className="mt-7 flex flex-col items-center gap-3 w-full">
                    {/* ARDENO */}
                    <motion.div className="flex justify-center gap-[0.2em] font-serif font-bold text-[clamp(24px,3.4vw,36px)] tracking-[0.26em] text-white leading-none">
                        {'ARDENO'.split('').map((ch, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
                                animate={
                                    phase >= LOADER_PHASE.ARDENO
                                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                                        : {}
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.055,
                                    ease: expoEase,
                                }}
                            >
                                {ch}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        className="w-[min(280px,66vw)] h-px"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent, rgba(255,255,255,0.13), rgba(255,51,1,0.22), rgba(255,255,255,0.12), transparent)',
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={
                            phase >= LOADER_PHASE.DIVIDER ? { scaleX: 1, opacity: 1 } : {}
                        }
                        transition={{ duration: 1.0, ease: expoEase }}
                    />

                    {/* STUDIO */}
                    <motion.div className="flex justify-center gap-[0.2em] font-serif italic font-light text-[clamp(10px,1.4vw,14px)] tracking-[0.52em] text-white/50 leading-none">
                        {'STUDIO'.split('').map((ch, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                animate={
                                    phase >= LOADER_PHASE.STUDIO
                                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                                        : {}
                                }
                                transition={{
                                    duration: 0.58,
                                    delay: 0.1 + i * 0.052,
                                    ease: expoEase,
                                }}
                            >
                                {ch}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Local styles for grain */}
            <style>{`
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 240px;
        }
        .animate-grain-shimmer {
          animation: gsh 0.09s steps(1) infinite;
        }
        @keyframes gsh {
          0%  { background-position: 0 0; }
          33% { background-position: -14px 8px; }
          66% { background-position: 8px -14px; }
        }
      `}</style>
        </div>
    );
};

export default ArdenoLoader;