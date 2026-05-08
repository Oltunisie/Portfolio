"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  { label: "University", value: "UCLA — University of California, Los Angeles" },
  { label: "Degree", value: "B.S. Aerospace Engineering" },
  { label: "Expected Graduation", value: "2028 · GPA 4.0" },
  { label: "Focus Areas", value: "Propulsion · Structures · ADCS · Feed Systems" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-32 px-6 bg-slate-50 dark:bg-slate-900 texture-dots relative overflow-hidden">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}>
          <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-3">About</p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-12 tracking-tight">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-5">
            {[
              "I'm an Aerospace Engineering student at UCLA with hands-on experience leading propulsion and spacecraft systems projects.",
              "From designing a 586 lbf hybrid rocket feed system to leading the ADCS subsystem for a CubeSat, I enjoy turning rigorous analysis into real hardware — through FEA validation, hydrostatic testing, cold-flow, and static fire campaigns.",
              "Before UCLA, I led an astronomy club to international recognition, competed in the National Informatics Olympiads, and flew experiments aboard a CNES Zero-G parabolic flight.",
            ].map((text, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                className={`leading-relaxed ${i === 0 ? "text-slate-600 dark:text-slate-300 text-lg font-light" : "text-slate-500 dark:text-slate-400"}`}>
                {text}
              </motion.p>
            ))}
          </div>

          <div className="space-y-5">
            {items.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                className="group flex gap-5 p-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800/40 transition-all duration-300 cursor-default">
                <div className="w-0.5 rounded-full bg-blue-900/20 dark:bg-blue-500/30 shrink-0 group-hover:bg-blue-900/50 dark:group-hover:bg-blue-500/60 transition-colors duration-300" />
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1">{item.label}</p>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
