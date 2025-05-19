"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Wine Berry color palette
const WINE = "#6B1839";
const BERRY = "#A23E48";
const SOFT_PINK = "#F8E1E7";
const GOLD = "#D6B370";

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
            className="relative w-[340px] h-[220px] flex items-center justify-center select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={
              hovered
                ? { scale: 1.04, y: -10, rotateZ: -3, boxShadow: `0 12px 40px 0 ${BERRY}33` }
                : { scale: 1, y: 0, rotateZ: 0, boxShadow: `0 4px 16px 0 ${WINE}22` }
            }
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            {/* Animated shadow under envelope */}
            <motion.div
              className="absolute left-1/2 top-[200px] -translate-x-1/2 z-0"
              initial={{ scaleX: 1, scaleY: 1, opacity: 0.25, filter: 'blur(0.5px)' }}
              animate={opened ? { scaleX: 1.4, scaleY: 0.7, opacity: 0.10, filter: 'blur(4px)' } : { scaleX: 1, scaleY: 1, opacity: 0.25, filter: 'blur(0.5px)' }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ width: 180, height: 38 }}
            >
              <svg width="180" height="38" viewBox="0 0 180 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="90" cy="19" rx="80" ry="15" fill={WINE} fillOpacity="0.18" />
              </svg>
            </motion.div>
            {/* SVG Envelope with animated body lift */}
            <motion.div
              className="absolute w-full h-full z-10"
              initial={{ y: 0 }}
              animate={opened ? { y: -24 } : { y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <svg
                viewBox="0 0 340 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Envelope body */}
                <rect x="10" y="20" width="320" height="180" rx="10" fill={SOFT_PINK} stroke={WINE} strokeWidth="4" />
                {/* Envelope outline */}
                <path
                  d="M30 60 Q170 180 310 60"
                  stroke={WINE}
                  strokeWidth="4"
                  fill="none"
                />
                {/* Flaps */}
                <path
                  d="M30 60 L170 140 L310 60"
                  stroke={WINE}
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M30 60 L170 30 L310 60"
                  stroke={WINE}
                  strokeWidth="3"
                  fill={SOFT_PINK}
                />
                {/* Wax seal shadow */}
                <ellipse
                  cx="170"
                  cy="140"
                  rx="22"
                  ry="8"
                  fill={BERRY}
                  opacity="0.18"
                />
                {/* Floral accent */}
                <circle cx="185" cy="120" r="3" fill={GOLD} />
                <circle cx="192" cy="126" r="2" fill={GOLD} />
                <path d="M170 140 Q180 120 192 126" stroke={GOLD} strokeWidth="2" fill="none" />
                {/* Wax seal */}
                <ellipse
                  cx="170"
                  cy="140"
                  rx="18"
                  ry="16"
                  fill={BERRY}
                  stroke={WINE}
                  strokeWidth="4"
                />
                <text
                  x="170"
                  y="146"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="#fff3e3"
                  style={{ fontFamily: 'serif' }}
                >
                  LN
                </text>
              </svg>
            </motion.div>
            {/* Animated flap (top) */}
            <motion.svg
              viewBox="0 0 340 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-full h-[80px] top-0 left-0 z-20"
              style={{ transformOrigin: '170px 60px' }}
              animate={{ rotateX: opened ? -110 : 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <path
                d="M30 60 L170 30 L310 60 Q170 110 30 60 Z"
                fill={SOFT_PINK}
                stroke={WINE}
                strokeWidth="4"
              />
            </motion.svg>
            {/* Clickable area to open flap */}
            {!opened && (
              <button
                className="absolute inset-0 w-full h-full z-40 cursor-pointer bg-transparent"
                aria-label="Open Envelope"
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
            <img
              src="/S__22020099.png"
              alt="Postcard Invitation"
              className="rounded-lg shadow-lg mb-6 w-full max-w-[600px] object-contain border-2"
              style={{ borderColor: BERRY }}
            />
            <a
              href="/form"
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
