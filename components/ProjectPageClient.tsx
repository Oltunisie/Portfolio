"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

export default function ProjectPageClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#080d1a]">

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <Link href="/Portfolio/"
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Portfolio
        </Link>
        <div className="flex items-center gap-3">
          {project.status && (
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              project.status === "Completed"
                ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                : "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
            }`}>
              {project.status}
            </span>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {project.period && (
              <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-4">{project.period}</p>
            )}
            <h1 className="text-4xl md:text-6xl font-light text-slate-900 dark:text-white tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed mb-8 max-w-2xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">

        {/* Overview */}
        {project.overview && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionLabel>Overview</SectionLabel>
            <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light whitespace-pre-line">
              {project.overview}
            </div>
          </motion.section>
        )}

        {/* Goals */}
        {project.goals && project.goals.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <SectionLabel>Goals</SectionLabel>
            <ul className="space-y-3">
              {project.goals.map((goal, i) => (
                <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300">
                  <span className="text-blue-800 dark:text-blue-400 mt-1 shrink-0 font-medium">{String(i + 1).padStart(2, "0")}.</span>
                  {goal}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Process */}
        {project.process && project.process.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <SectionLabel>Process</SectionLabel>
            <div className="space-y-0 relative">
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-900/30 via-blue-900/15 to-transparent dark:from-blue-500/30 dark:via-blue-500/15" />
              {project.process.map((step, i) => (
                <div key={i} className="relative pl-10 pb-10">
                  <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-blue-900 dark:bg-blue-500 ring-4 ring-white dark:ring-[#080d1a] flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">{i + 1}</span>
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-semibold mb-2">{step.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <SectionLabel>Challenges</SectionLabel>
            <ul className="space-y-4">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-blue-800 dark:text-blue-400 shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">{c}</p>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <SectionLabel>Gallery</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <Image
                    src={`/Portfolio/projects/${project.slug}/${img}`}
                    alt={`${project.title} — image ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Empty gallery placeholder */}
        {(!project.images || project.images.length === 0) && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <SectionLabel>Gallery</SectionLabel>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
              <p className="text-slate-400 dark:text-slate-600 text-sm">
                Drop images in{" "}
                <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">
                  public/projects/{project.slug}/
                </code>{" "}
                and add filenames to <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">data/projects.ts</code>
              </p>
            </div>
          </motion.section>
        )}

      </div>

      {/* Footer nav */}
      <div className="border-t border-slate-100 dark:border-slate-800 py-10 px-6 text-center">
        <Link href="/Portfolio/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to all projects
        </Link>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase">
        {children}
      </p>
      <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}
