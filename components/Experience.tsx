"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Hybrid Propulsion Feed Systems Lead",
    org: "Rocket Project at UCLA",
    period: "2025 – Present",
    bullets: [
      "Lead engineer for a 586 lbf N₂O/HTPB hybrid rocket feed system targeting a club record 20,000 ft apogee",
      "Designed full oxidizer feed system (750 psi MEOP): plumbing, fittings, valve selection, and pressure relief strategy",
      "Discharge coefficient calculations and flow modeling to characterize pressure losses and transient behavior",
      "FEA-validated lightweight oxidizer tank endcaps and brackets under internal pressure and bolt preload",
      "Overseeing hydrostatic proof testing, structural qualifications, and cold-flow / static fire campaigns",
    ],
  },
  {
    role: "ADCS Lead",
    org: "BruinSpace",
    period: "2025 – Present",
    bullets: [
      "Leading design and development of the Attitude Determination and Control System for the team's satellite",
      "Developing and assembling the ADCS test setup to validate sensors, actuators, and control algorithms",
      "Coordinating subsystem integration between ADCS, electronics, and structures teams",
    ],
  },
  {
    role: "Lead Programmer & President",
    org: "Horizon Astronomy Club",
    period: "Mar 2023 – Jun 2025",
    bullets: [
      "Won international competitions including the Young Searchers Prize (2023, 2024, 2025)",
      "Promoted astronomy through courses, workshops, and expert colloquiums",
      "Selected to present awards at the 2025 Project X closing ceremony",
    ],
  },
];

const achievements = [
  { title: "66th Parabolic Flight Campaign — CNES", period: "2023", description: "Selected by the French CNES to conduct Zero-G experiments aboard a parabolic flight in Bordeaux, covering thermodynamics, centrifugal forces, and Newton's Laws in microgravity." },
  { title: "Young Searchers Prize, Project X", period: "2023 · 2024 · 2025", description: "Three-time winner — 2023 (Space Probe), 2024 (Zero-G experiments). Selected to present awards at the 2025 closing ceremony." },
  { title: "National Informatics Olympiads", period: "2023", description: "Participated in the 2023 IOI national selections — ranked 18th in Tunisia." },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-32 px-6 bg-white dark:bg-[#080d1a] texture-paper relative">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-3">Background</p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-16 tracking-tight">Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-900/40 via-blue-900/15 to-transparent dark:from-blue-500/40 dark:via-blue-500/15" />
          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div key={exp.role}
                initial={{ opacity: 0, x: -24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.1 + 0.12 * i }}
                className="group relative pl-10 pb-12">
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-blue-900 dark:bg-blue-500 ring-4 ring-slate-50 dark:ring-[#080d1a] group-hover:scale-110 transition-transform duration-300" />
                <div className="p-5 rounded-xl border border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-800 group-hover:bg-slate-50/70 dark:group-hover:bg-slate-900/50 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-semibold text-lg leading-tight group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors duration-200">{exp.role}</h3>
                      <p className="text-blue-800 dark:text-blue-400 text-sm font-medium mt-0.5">{exp.org}</p>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 tracking-wide bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full mt-1">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex gap-3">
                        <span className="text-blue-800/40 dark:text-blue-500/50 mt-1.5 shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-20">
          <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-3">Recognition</p>
          <h3 className="text-3xl font-light text-slate-900 dark:text-white mb-10 tracking-tight">Achievements</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {achievements.map((a, i) => (
              <motion.div key={a.title}
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.5 + 0.1 * i }}
                whileHover={{ y: -3 }}
                className="group p-6 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-blue-900/20 dark:hover:border-blue-500/25 hover:shadow-md dark:hover:shadow-blue-950/20 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 cursor-default">
                <p className="text-xs text-blue-800 dark:text-blue-400 tracking-widest uppercase mb-2">{a.period}</p>
                <h4 className="text-slate-800 dark:text-slate-100 font-medium text-sm mb-3 leading-snug group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{a.title}</h4>
                <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
