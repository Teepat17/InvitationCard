"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Wine Berry color palette
const WINE = "#6B1839";
const BERRY = "#A23E48";
const SOFT_PINK = "#F8E1E7";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Responsive width/height
  const letterWidth = "w-[430px] max-w-full sm:w-[350px] xs:w-[95vw]";
  const letterHeight = "h-[260px] sm:h-[180px] xs:h-[44vw]";

  // Animation variants
  const wiggleVariants = {
    initial: { scale: 1, rotate: 0, filter: 'brightness(1)' },
    wiggle1: { scale: 1.05, rotate: [-10, 10, -10, 10, 0], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] },
    wiggle2: { scale: 1.1, rotate: -5, filter: 'brightness(2.5)' },
    wiggle3: { scale: 1.1, rotate: 5, filter: 'brightness(3.5)' },
    spin: { scale: 5, rotate: 720, filter: 'brightness(1)' }
  };

  // Fullscreen dark congrats animation
  const fullscreenCongratsVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 5 } },
    exit: { opacity: 0, transition: { duration: 5 } }
  };
  const bigTextVariants = {
    initial: { scale: 0.7, opacity: 0, letterSpacing: "0.1em" },
    animate: { scale: 1.15, opacity: 1, letterSpacing: "0.2em", transition: { type: "spring", stiffness: 180, damping: 14 } },
    exit: { scale: 0.7, opacity: 0, transition: { duration: 0.3 } }
  };
  const goldSparkleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0],
      rotate: i * 45,
      transition: { duration: 1.2, delay: i * 0.12, repeat: Infinity, repeatType: "loop" as const }
    })
  };
  const confettiDropVariants = {
    initial: { y: -100, opacity: 0 },
    animate: (i: number) => ({ y: [ -100, 600 ], opacity: [0, 1, 0], x: [0, (i-2)*120], transition: { duration: 1.5, delay: i*0.15 } }),
    exit: { opacity: 0 }
  };

  // Handle mouse/touch down
  const handlePressStart = () => {
    const timer = setTimeout(() => {
      setIsLongPress(true);
      setAnimating(true);
      setAnimationPhase(1);
      
      // Faster wiggle sequence
      setTimeout(() => setAnimationPhase(2), 300);
      setTimeout(() => setAnimationPhase(3), 600);
      setTimeout(() => setAnimationPhase(4), 900);
      
      // Final spin and reveal
      setTimeout(() => {
        setAnimating(false);
        setOpened(true);
        setShowCongrats(true);
        setTimeout(() => setShowCongrats(false), 5000);
      }, 3400);
    }, 500);
    setPressTimer(timer);
  };

  // Handle mouse/touch up
  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    if (!isLongPress) {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, 500);
    }
  };

  // Get current animation state
  const getAnimationState = () => {
    if (!animating) return 'initial';
    if (!isLongPress) return 'wiggle1';
    switch (animationPhase) {
      case 1: return 'wiggle1';
      case 2: return 'wiggle2';
      case 3: return 'wiggle3';
      case 4: return 'spin';
      default: return 'initial';
    }
  };

  // Helper to get transition for the current animation
  const getWiggleTransition = () => {
    const state = getAnimationState();
    if (state === 'wiggle1') {
      return {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
      };
    }
    if (state === 'spin') {
      return {
        type: 'tween',
        ease: 'easeInOut',
        duration: 2.5
      };
    }
    // For other states, use spring
    return {
      type: 'spring',
      stiffness: 200,
      damping: 15
    };
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen w-full transition-colors duration-700 bg-cover bg-center"
      style={{ background: WINE }}
    >
      <AnimatePresence>
        {!opened && (
          <motion.div
            className={`relative ${letterWidth} ${letterHeight} flex items-center justify-center select-none`}
            style={{ perspective: 1200 }}
          >
            {/* Animated shadow under letter */}
            <motion.div
              className="absolute left-1/2 top-[90%] -translate-x-1/2 z-0"
              initial={{ scaleX: 1, scaleY: 1, opacity: 0.25, filter: 'blur(0.5px)' }}
              animate={opened || animating ? { scaleX: 1.4, scaleY: 0.7, opacity: 0.10, filter: 'blur(4px)' } : { scaleX: 1, scaleY: 1, opacity: 0.25, filter: 'blur(0.5px)' }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ width: 220, height: 48, maxWidth: '60vw' }}
            >
              <svg width="220" height="48" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="110" cy="24" rx="100" ry="20" fill={WINE} fillOpacity="0.18" />
              </svg>
            </motion.div>
            {/* SVG Letter as image with page flip and open animation */}
            <motion.img
              src="/Rub Nong (172 x 105 mm).svg"
              alt="Letter"
              className="w-full h-full object-contain rounded-lg shadow-lg"
              style={{ backfaceVisibility: 'hidden' }}
              variants={wiggleVariants}
              initial="initial"
              animate={getAnimationState()}
              transition={getWiggleTransition()}
            />
            {/* Title overlay */}
            {/* Clickable area to open letter */}
            {!opened && !animating && (
              <button
                className="absolute inset-0 w-full h-full z-40 cursor-pointer bg-transparent"
                aria-label="Open Letter"
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            variants={fullscreenCongratsVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#2a0a1b] via-[#441533] to-[#1a0a1b] px-2"
          >
            {/* Gold Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={goldSparkleVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute w-10 h-10 sm:w-16 sm:h-16"
                  style={{
                    left: `${10 + i * 10}%`,
                    top: `${i % 2 === 0 ? 10 : 80}%`,
                    zIndex: 51,
                    pointerEvents: 'none',
                    background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(2px)',
                  }}
                />
              ))}
            </div>
            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={confettiDropVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute w-5 h-5 sm:w-6 sm:h-6"
                  style={{
                    left: `${5 + i * 9}%`,
                    top: 0,
                    zIndex: 52,
                    pointerEvents: 'none',
                    fontSize: '1.5rem',
                  }}
                >
                  {i % 3 === 0 ? '🎉' : i % 3 === 1 ? '✨' : '🎊'}
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={bigTextVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-4xl sm:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#fffbe6] to-[#FFD700] drop-shadow-lg mb-4"
              style={{ letterSpacing: '0.2em', wordBreak: 'break-word' }}
            >
              Congratulations!
            </motion.div>
            <div className="text-lg sm:text-3xl text-white font-bold mb-8 text-center drop-shadow">You&apos;ve unlocked the invitation!</div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {opened && !showCongrats && (
          <motion.div
            key="invitation"
            initial={{ y: 100, opacity: 0, scale: 0.9, filter: 'brightness(0.8)' }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: 'brightness(1)' }}
            exit={{ y: 100, opacity: 0, scale: 0.9, filter: 'brightness(0.8)' }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white p-4 max-w-md w-full flex flex-col items-center border rounded-lg mx-2 relative shadow-lg sm:mt-8 mt-4"
            style={{ borderColor: BERRY, borderWidth: 2, minHeight: '320px', maxWidth: '98vw' }}
          >
            <div className="text-center mb-4 text-luxury text-base sm:text-lg">
              กดค้างเพื่อเปิดจดหมาย
            </div>
            <img
              src="/S__22020099.png"
              alt="Postcard Invitation"
              className="rounded mb-6 w-full max-w-[400px] object-contain border"
              style={{ borderColor: BERRY, borderWidth: 1 }}
              width={400}
              height={280}
              loading="eager"
            />
            <a
              href="https://forms.gle/FVo38Pi1AWb2K1yh7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-2 rounded-full text-base sm:text-lg font-semibold hover:scale-105 transition-transform"
              style={{ background: BERRY, color: SOFT_PINK }}
            >
              ยืนยันการเข้าร่วม
            </a>
            <button
              className="mt-2 px-6 py-2 rounded-full border text-luxury font-semibold hover:bg-luxury hover:text-white transition-colors"
              style={{ borderColor: BERRY, borderWidth: 1 }}
              onClick={() => { setOpened(false); setIsLongPress(false); setAnimationPhase(0); setAnimating(false); }}
            >
              กลับไปยังจดหมาย
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
