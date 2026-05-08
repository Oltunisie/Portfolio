"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ParticleBackground from "./ParticleBackground";

// ─── CUSTOMIZE HERE ───────────────────────────────────────────────
const BG_IMAGE = "/hero-bg.jpg";
const BLUR_AMOUNT = "6px";
const OVERLAY_OPACITY = 0.55;
// ──────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50">

      {/* Particle constellation background */}
      <ParticleBackground />

      {/* Background image with blur (shows when hero-bg.jpg is added to /public) */}
      <div className="absolute inset-0 scale-110" style={{ zIndex: 0 }}>
        <Image
          src={BG_IMAGE}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          style={{ filter: `blur(${BLUR_AMOUNT})` }}
          onError={() => {}}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(255, 255, 255, ${OVERLAY_OPACITY})`, zIndex: 2 }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-blue-900 text-sm font-medium tracking-[0.2em] uppercase mb-4"
        >
          Aerospace Engineering · UCLA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-6xl md:text-8xl font-light text-slate-900 tracking-tight mb-6"
        >
          Omar Lemkecher
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-xl text-slate-500 font-light max-w-md mx-auto mb-10"
        >
          Building the future of flight — one equation at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-slate-900 text-white text-sm tracking-wide rounded-full hover:bg-blue-900 transition-colors duration-300"
          >
            View Projects
          </button>
          <a
            href="/Portfolio/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-blue-900 text-white text-sm tracking-wide rounded-full hover:bg-blue-800 transition-colors duration-300 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 border border-slate-300 text-slate-600 text-sm tracking-wide rounded-full hover:border-slate-500 transition-colors duration-300"
          >
            Get in Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
