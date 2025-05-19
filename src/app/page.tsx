"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Wine Berry color palette
const WINE = "#6B1839";
const BERRY = "#A23E48";
const SOFT_PINK = "#F8E1E7";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Responsive width/height
  const letterWidth = "w-[430px] max-w-full sm:w-[350px] xs:w-[95vw]";
  const letterHeight = "h-[260px] sm:h-[180px] xs:h-[44vw]";

  // Open letter with animation
  const handleOpen = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setOpened(true);
    }, 700); // match animation duration
  };

  // Back to letter
  const handleBack = () => {
    setOpened(false);
    setTimeout(() => setAnimating(false), 100);
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen w-full transition-colors duration-700 bg-cover bg-center"
      animate={
        hovered && !opened
          ? {
              background: `radial-gradient(circle at 60% 40%, ${SOFT_PINK} 0%, #f3c6d3 60%, ${BERRY} 100%)`,
            }
          : { background: WINE }
      }
      transition={{ duration: 0.7 }}
    >
      <AnimatePresence>
        {!opened && (
          <motion.div
            className={`relative ${letterWidth} ${letterHeight} flex items-center justify-center select-none`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={
              hovered
                ? { scale: 1.04, y: -10, rotateZ: -3, boxShadow: `0 12px 40px 0 ${BERRY}33` }
                : { scale: 1, y: 0, rotateZ: 0, boxShadow: `0 4px 16px 0 ${WINE}22` }
            }
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
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
              initial={{ scale: 1, opacity: 1, rotateY: 0, filter: 'brightness(1)', rotate: 0 }}
              animate={
                animating
                  ? { scale: 5, opacity: 1, filter: 'brightness(5)', zIndex: 50, rotate: 720 }
                  : opened
                  ? { scale: 0.98, opacity: 0, rotateY: 540, y: 40, filter: 'brightness(1)', rotate: 720 }
                  : { scale: 1, opacity: 1, rotateY: 0, y: 0, filter: 'brightness(1)', rotate: 0 }
              }
              transition={{ duration: animating ? 0.7 : 0.9, type: 'spring' }}
            />
            {/* Title overlay */}
            {/* Clickable area to open letter */}
            {!opened && !animating && (
              <button
                className="absolute inset-0 w-full h-full z-40 cursor-pointer bg-transparent"
                aria-label="Open Letter"
                onClick={handleOpen}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {opened && (
          <motion.div
            key="invitation"
            initial={{ y: 100, opacity: 0, scale: 0.9, filter: 'brightness(0.8)' }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: 'brightness(1)' }}
            exit={{ y: 100, opacity: 0, scale: 0.9, filter: 'brightness(0.8)' }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white p-4 max-w-md w-full flex flex-col items-center border rounded-lg mx-2"
            style={{ borderColor: BERRY, borderWidth: 2 }}
          >
            <Image
              src="/S__22020099.png"
              alt="Postcard Invitation"
              className="rounded mb-6 w-full max-w-[400px] object-contain border"
              style={{ borderColor: BERRY, borderWidth: 1 }}
              width={400}
              height={280}
              priority
            />
            <a
              href="https://forms.gle/FVo38Pi1AWb2K1yh7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-8 py-2 rounded-full text-lg font-semibold hover:scale-105 transition-transform"
              style={{ background: BERRY, color: SOFT_PINK }}
            >
              ยืนยันการเข้าร่วม
            </a>
            <button
              className="mt-2 px-6 py-2 rounded-full border text-luxury font-semibold hover:bg-luxury hover:text-white transition-colors"
              style={{ borderColor: BERRY, borderWidth: 1 }}
              onClick={handleBack}
            >
              กลับไปยังจดหมาย
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
