"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-blue-900 text-xs font-medium tracking-[0.2em] uppercase mb-3">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-12 tracking-tight">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              I&apos;m an Aerospace Engineering student at UCLA, passionate about the intersection
              of physics, mathematics, and real-world engineering challenges.
            </p>
            <p className="text-slate-500 leading-relaxed">
              [Placeholder — add a sentence about your focus area: propulsion, structures,
              aerodynamics, guidance systems, etc.]
            </p>
            <p className="text-slate-500 leading-relaxed">
              [Placeholder — mention any research, clubs, internships, or goals you want
              visitors to know about.]
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="border-l-2 border-blue-900/20 pl-6">
              <p className="text-xs text-slate-400 tracking-widest uppercase mb-1">University</p>
              <p className="text-slate-700 font-medium">UCLA — University of California, Los Angeles</p>
            </div>
            <div className="border-l-2 border-blue-900/20 pl-6">
              <p className="text-xs text-slate-400 tracking-widest uppercase mb-1">Degree</p>
              <p className="text-slate-700 font-medium">B.S. Aerospace Engineering</p>
            </div>
            <div className="border-l-2 border-blue-900/20 pl-6">
              <p className="text-xs text-slate-400 tracking-widest uppercase mb-1">Expected Graduation</p>
              <p className="text-slate-700 font-medium">[Year]</p>
            </div>
            <div className="border-l-2 border-blue-900/20 pl-6">
              <p className="text-xs text-slate-400 tracking-widest uppercase mb-1">Interests</p>
              <p className="text-slate-700 font-medium">[Propulsion / Aerodynamics / Structures / GNC]</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
