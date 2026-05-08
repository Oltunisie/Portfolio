"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = ["About", "Projects", "Skills", "Contact"];

export default function Navbar() {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100"
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-slate-800 font-semibold tracking-tight text-lg hover:text-blue-900 transition-colors"
      >
        Omar Lemkecher
      </button>
      <ul className="flex gap-8">
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => scrollTo(link)}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors tracking-wide"
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
