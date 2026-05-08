"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-3">Work</p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-4 tracking-tight">Projects</h2>
          <p className="text-slate-400 dark:text-slate-500 font-light mb-16 max-w-md">A selection of engineering and research projects.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -4 }}
            >
              <Link href={`/Portfolio/projects/${project.slug}/`} className="block h-full group border border-slate-100 dark:border-slate-800 rounded-2xl p-7 bg-white dark:bg-[#080d1a] hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-950/50 transition-all duration-300">

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-slate-900 dark:text-white font-semibold text-lg group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.period && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{project.period}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {project.status && (
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                        project.status === "Completed"
                          ? "bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                          : "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                      }`}>
                        {project.status}
                      </span>
                    )}
                    {/* Arrow icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="text-slate-300 dark:text-slate-600 group-hover:text-blue-900 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200 shrink-0">
                      <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 font-light">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-100 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
