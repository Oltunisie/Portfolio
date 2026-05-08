"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  { category: "Propulsion & Fluids", skills: ["Hybrid Rocket Feed Systems", "N₂O Thermodynamics", "Discharge Coefficient Modeling", "Ullage Optimization", "Pressure Vessel Design", "CFD Basics"] },
  { category: "Structures & Analysis", skills: ["FEA (ANSYS, SolidWorks)", "Stress Analysis", "Bracket & Endcap Design", "Bolt Analysis", "Hydrostatic Testing"] },
  { category: "Software & Tools", skills: ["Python", "C++", "SolidWorks", "Fusion 360", "Onshape", "ANSYS"] },
  { category: "Fabrication", skills: ["CNC Machining", "CAM", "3D Printing", "Instrumentation Integration", "Cold-Flow Testing"] },
  { category: "Languages", skills: ["English", "French", "Arabic"] },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6 bg-white dark:bg-[#080d1a]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-3">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-16 tracking-tight">Skills</h2>
        </motion.div>
        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.12 * gi }}>
              <p className="text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4">{group.category}</p>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => (
                  <motion.span key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.12 * gi + 0.04 * si }}
                    className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-full hover:border-blue-900/30 dark:hover:border-blue-500/40 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-200">
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
