"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-3">About</p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-12 tracking-tight">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-5">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
              I&apos;m an Aerospace Engineering student at UCLA with hands-on experience leading propulsion and spacecraft systems projects.
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              From designing a 586 lbf hybrid rocket feed system to leading the ADCS subsystem for a CubeSat, I enjoy turning rigorous analysis into real hardware — through FEA validation, hydrostatic testing, cold-flow, and static fire campaigns.
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Before UCLA, I led an astronomy club to international recognition, competed in the National Informatics Olympiads, and flew experiments aboard a CNES Zero-G parabolic flight.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="space-y-6">
            {[
              { label: "University", value: "UCLA — University of California, Los Angeles" },
              { label: "Degree", value: "B.S. Aerospace Engineering" },
              { label: "Expected Graduation", value: "2028 · GPA 4.0" },
              { label: "Focus Areas", value: "Propulsion · Structures · ADCS · Feed Systems" },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-blue-900/20 dark:border-blue-500/30 pl-6">
                <p className="text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1">{item.label}</p>
                <p className="text-slate-700 dark:text-slate-200 font-medium">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
