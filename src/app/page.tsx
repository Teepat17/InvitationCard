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

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen w-full transition-colors duration-700"
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
            className="relative w-[430px] h-[260px] flex items-center justify-center select-none"
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
              className="absolute left-1/2 top-[230px] -translate-x-1/2 z-0"
              initial={{ scaleX: 1, scaleY: 1, opacity: 0.25, filter: 'blur(0.5px)' }}
              animate={opened ? { scaleX: 1.4, scaleY: 0.7, opacity: 0.10, filter: 'blur(4px)' } : { scaleX: 1, scaleY: 1, opacity: 0.25, filter: 'blur(0.5px)' }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ width: 220, height: 48 }}
            >
              <svg width="220" height="48" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="110" cy="24" rx="100" ry="20" fill={WINE} fillOpacity="0.18" />
              </svg>
            </motion.div>
            {/* SVG Letter as image with page flip */}
            <motion.img
              src="/Rub Nong (172 x 105 mm).svg"
              alt="Letter"
              className="w-full h-full object-contain rounded-lg shadow-lg border-2"
              style={{ borderColor: BERRY, backfaceVisibility: 'hidden' }}
              initial={{ scale: 1, opacity: 1, rotateY: 0 }}
              animate={opened ? { scale: 0.98, opacity: 0, rotateY: 180, y: 40 } : { scale: 1, opacity: 1, rotateY: 0, y: 0 }}
              transition={{ duration: 0.9, type: 'spring' }}
            />
            {/* Clickable area to open letter */}
            {!opened && (
              <button
                className="absolute inset-0 w-full h-full z-40 cursor-pointer bg-transparent"
                aria-label="Open Letter"
                onClick={() => setOpened(true)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {opened && (
          <motion.div
            key="invitation"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white p-8 max-w-2xl w-full flex flex-col items-center shadow-2xl relative rounded-xl border-4"
            style={{ borderColor: BERRY }}
          >
            <Image
              src="/S__22020099.png"
              alt="Postcard Invitation"
              className="rounded-lg shadow-lg mb-6 w-full max-w-[600px] object-contain border-2"
              style={{ borderColor: BERRY }}
              width={600}
              height={400}
              priority
            />
            <a
              href="https://forms.gle/FVo38Pi1AWb2K1yh7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-8 py-2 rounded-full text-lg font-semibold shadow hover:scale-105 transition-transform"
              style={{ background: BERRY, color: SOFT_PINK }}
            >
              ยืนยันการเข้าร่วม
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
