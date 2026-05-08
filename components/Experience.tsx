"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Hybrid Propulsion Feed Systems Lead",
    org: "Rocket Project at UCLA",
    period: "2025 – Present",
    type: "Engineering",
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
    type: "Engineering",
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
    type: "Leadership",
    bullets: [
      "Won international competitions including the Young Searchers Prize (2023, 2024, 2025)",
      "Promoted astronomy through courses, workshops, and expert colloquiums",
      "Selected to present awards at the 2025 Project X closing ceremony",
    ],
  },
];

const achievements = [
  {
    title: "66th Parabolic Flight Campaign — CNES",
    period: "2023",
    description:
      "Selected by the French National Space Studies Center to conduct Zero-G experiments aboard a parabolic flight in Bordeaux. Experiments covered thermodynamics, centrifugal forces, and Newton's Laws in microgravity.",
  },
  {
    title: "Young Searchers Prize, Project X",
    period: "2023 · 2024 · 2025",
    description:
      "Three-time winner of this national engineering competition — 2023 (Space Probe), 2024 (Zero-G experiments), and selected to present awards at the 2025 closing ceremony.",
  },
  {
    title: "National Informatics Olympiads",
    period: "2023",
    description: "Participated in the 2023 IOI national selections — ranked 18th in Tunisia.",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-blue-900 text-xs font-medium tracking-[0.2em] uppercase mb-3">
            Background
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-16 tracking-tight">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-100" />

          <div className="space-y-14">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="pl-8 relative"
              >
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-900 -translate-x-[3px]" />
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-slate-900 font-medium text-lg">{exp.role}</h3>
                    <p className="text-blue-900 text-sm font-medium">{exp.org}</p>
                  </div>
                  <span className="text-xs text-slate-400 tracking-wide mt-1">{exp.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="text-slate-500 text-sm leading-relaxed flex gap-2">
                      <span className="text-blue-900/40 mt-1.5">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24"
        >
          <p className="text-blue-900 text-xs font-medium tracking-[0.2em] uppercase mb-3">
            Recognition
          </p>
          <h2 className="text-3xl font-light text-slate-900 mb-10 tracking-tight">
            Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + 0.1 * i }}
                className="p-6 border border-slate-100 rounded-2xl hover:border-blue-900/20 hover:shadow-sm transition-all duration-300"
              >
                <p className="text-xs text-blue-900 tracking-widest uppercase mb-2">{a.period}</p>
                <h4 className="text-slate-800 font-medium text-sm mb-3 leading-snug">{a.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
