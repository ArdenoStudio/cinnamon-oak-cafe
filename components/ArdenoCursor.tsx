import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence, useTransform } from 'framer-motion';

const ArdenoCursor: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isGrab, setIsGrab] = useState(false);

    // 1. Fast Position (Base Dot)
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // 2. Lag Position (Spring Ring)
    const springConfig = { damping: 28, stiffness: 180, mass: 0.6 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Check for hoverable elements
            const target = e.target as HTMLElement;
            const interactive = target.closest('button, a, [data-cursor-hover], [data-magnetic]');
            const customText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
            const grabElem = target.closest('[data-cursor-grab]');

            if (interactive) {
                setIsHovered(true);
                setHoverText(customText || '');
            } else {
                setIsHovered(false);
                setHoverText('');
            }

            setIsGrab(!!grabElem);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseDown = () => document.body.classList.add('grabbing');
        const handleMouseUp = () => document.body.classList.remove('grabbing');

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block">
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* LAYER 1: Base Precision Dot (Follows mouse exactly) */}
                        <motion.div
                            className="absolute w-1.5 h-1.5 bg-[#ff3301] rounded-full z-20"
                            style={{
                                left: mouseX,
                                top: mouseY,
                                x: '-50%',
                                y: '-50%',
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                        />

                        {/* LAYER 2: Lag Ring (Spring Following) */}
                        <motion.div
                            className="absolute flex items-center justify-center z-10"
                            style={{
                                left: springX,
                                top: springY,
                                x: '-50%',
                                y: '-50%',
                                mixBlendMode: 'difference'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                        >
                            <motion.div
                                animate={{
                                    width: isHovered ? 48 : 32,
                                    height: isHovered ? 48 : 32,
                                    backgroundColor: 'rgba(255, 255, 255, 0)',
                                    borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
                                    borderWidth: 1,
                                }}
                                transition={{ duration: 0.4, ease: [0.7, 0, 0.2, 1] }}
                                className="rounded-full border flex items-center justify-center relative"
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                @media (min-width: 768px) {
                    html, body, a, button, [role="button"] {
                        cursor: none !important;
                    }
                }
                .grabbing {
                    cursor: none !important;
                }
            `}</style>
        </div>
    );
};

export default ArdenoCursor;
