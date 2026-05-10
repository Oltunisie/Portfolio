"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Project, MediaItem } from "@/data/projects";

const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay },
});

// ── Carousel + Lightbox ───────────────────────────────────────────
function MediaGallery({ items, slug, title }: { items: MediaItem[]; slug: string; title: string }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const go = useCallback((next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  const prev = () => go((index - 1 + items.length) % items.length);
  const next = () => go((index + 1) % items.length);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "Escape") setLightbox(null);
        if (e.key === "ArrowRight") setLightbox((l) => l !== null ? (l + 1) % items.length : l);
        if (e.key === "ArrowLeft")  setLightbox((l) => l !== null ? (l - 1 + items.length) % items.length : l);
        return;
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, lightbox, items.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const current = items[index];

  return (
    <>
      {/* ── Carousel ── */}
      <div className="relative select-none">
        {/* Main slide */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38 }}
              className="absolute inset-0"
            >
              <MediaSlide item={current} slug={slug} title={title} index={index}
                onImageClick={() => setLightbox(index)} />
            </motion.div>
          </AnimatePresence>

          {/* Arrows — only show if more than 1 item */}
          {items.length > 1 && (
            <>
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:scale-110 transition-all duration-200 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:scale-110 transition-all duration-200 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </>
          )}

          {/* Image counter */}
          {items.length > 1 && (
            <div className="absolute bottom-3 right-3 z-10 text-xs bg-black/40 text-white px-2 py-1 rounded-full backdrop-blur-sm font-mono">
              {index + 1} / {items.length}
            </div>
          )}

          {/* Zoom hint for images */}
          {current.type === "image" && (
            <div className="absolute bottom-3 left-3 z-10 text-xs bg-black/40 text-white/80 px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              Click to expand
            </div>
          )}
        </div>

        {/* Caption */}
        {"caption" in current && current.caption && (
          <p className="mt-3 text-slate-400 dark:text-slate-500 text-xs text-center leading-relaxed">{current.caption as string}</p>
        )}

        {/* Dot indicators */}
        {items.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {items.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 ${i === index
                  ? "w-5 h-1.5 bg-blue-800 dark:bg-blue-400"
                  : "w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500"}`} />
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative max-w-5xl w-full mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`${BASE}/projects/${slug}/${(items[lightbox] as Extract<MediaItem, { type: "image" }>).file}`}
                alt={(items[lightbox] as Extract<MediaItem, { type: "image" }>).caption ?? `${title} — image ${lightbox + 1}`}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
              {(items[lightbox] as Extract<MediaItem, { type: "image" }>).caption && (
                <p className="text-white/60 text-sm text-center mt-4">
                  {(items[lightbox] as Extract<MediaItem, { type: "image" }>).caption}
                </p>
              )}

              {/* Close */}
              <button onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>

              {/* Lightbox arrows */}
              {items.filter(it => it.type === "image").length > 1 && (
                <>
                  <button
                    onClick={() => setLightbox((l) => l !== null ? (l - 1 + items.length) % items.length : l)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button
                    onClick={() => setLightbox((l) => l !== null ? (l + 1) % items.length : l)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MediaSlide({ item, slug, title, index, onImageClick }:
  { item: MediaItem; slug: string; title: string; index: number; onImageClick: () => void }) {
  if (item.type === "image") {
    return (
      <button className="w-full h-full cursor-zoom-in" onClick={onImageClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/projects/${slug}/${item.file}`}
          alt={item.caption ?? `${title} — image ${index + 1}`}
          className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
        />
      </button>
    );
  }
  if (item.type === "video") {
    return (
      <video src={`${BASE}/projects/${slug}/${item.file}`} controls className="w-full h-full" />
    );
  }
  if (item.type === "model") {
    return (
      <ModelViewer
        src={`${BASE}/projects/${slug}/${item.file}`}
        alt={(item as { caption?: string }).caption ?? `${title} — 3D model`}
      />
    );
  }
  return (
    <iframe
      src={`https://www.youtube.com/embed/${item.id}`}
      title={item.caption ?? `${title} — video ${index + 1}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    />
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function ProjectPageClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#080d1a] texture-paper">

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <Link href="/"
          className="group flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="group-hover:-translate-x-1 transition-transform duration-200">
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
            }`}>{project.status}</span>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-full border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 border-b border-slate-100 dark:border-slate-800/60">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp(0)}>
            {project.period && (
              <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-5">{project.period}</p>
            )}
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed mb-10 max-w-2xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-900/30 dark:hover:border-blue-500/30 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-28">

        {project.problem && (
          <motion.section {...fadeUp(0.05)}>
            <SectionLabel index="01" label="The Problem" />
            <div className="pl-0 md:pl-12">
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light space-y-4">
                {project.problem.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
          </motion.section>
        )}

        {project.goals && project.goals.length > 0 && (
          <motion.section {...fadeUp(0.08)}>
            <SectionLabel index="02" label="Goals" />
            <div className="pl-0 md:pl-12 space-y-3">
              {project.goals.map((goal, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                  className="group flex gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-all duration-300">
                  <span className="text-blue-800/50 dark:text-blue-500/50 font-mono text-sm mt-0.5 shrink-0 w-5 text-right">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{goal}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {project.myRole && (
          <motion.section {...fadeUp(0.1)}>
            <SectionLabel index="03" label="My Role" />
            <div className="pl-0 md:pl-12">
              <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed font-light space-y-4">
                  {project.myRole.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {project.process && project.process.length > 0 && (
          <motion.section {...fadeUp(0.12)}>
            <SectionLabel index="04" label="The Process" />
            <div className="pl-0 md:pl-12 relative">
              <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-blue-900/25 via-blue-900/10 to-transparent dark:from-blue-500/25 dark:via-blue-500/10" />
              {project.process.map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                  className="group relative pl-10 pb-10 last:pb-0">
                  <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-blue-900 dark:bg-blue-500 ring-4 ring-white dark:ring-[#080d1a] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white text-[8px] font-bold">{i + 1}</span>
                  </div>
                  <div className="p-5 rounded-xl border border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-800 group-hover:bg-slate-50/60 dark:group-hover:bg-slate-900/40 transition-all duration-300">
                    <h4 className="text-slate-900 dark:text-white font-semibold mb-2 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors duration-200">{step.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {project.outcome && (
          <motion.section {...fadeUp(0.14)}>
            <SectionLabel index="05" label="Outcome & Results" />
            <div className="pl-0 md:pl-12">
              <div className="relative p-6 rounded-2xl bg-slate-900 dark:bg-white/5 border border-slate-800 dark:border-white/10">
                <div className="absolute top-4 left-4 w-1 h-8 rounded-full bg-blue-500 dark:bg-blue-400 opacity-60" />
                <div className="pl-5 text-slate-300 dark:text-slate-300 leading-relaxed font-light space-y-4">
                  {project.outcome.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {project.media && project.media.length > 0 && (
          <motion.section {...fadeUp(0.16)}>
            <SectionLabel index="06" label="Gallery" />
            <div className="pl-0 md:pl-12">
              <MediaGallery items={project.media} slug={project.slug} title={project.title} />
            </div>
          </motion.section>
        )}

      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 dark:border-slate-800 py-12 px-6 text-center">
        <Link href="/"
          className="group inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="group-hover:-translate-x-1 transition-transform duration-200">
            <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to all projects
        </Link>
      </div>
    </div>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-5 mb-10">
      <span className="text-blue-800/40 dark:text-blue-500/40 font-mono text-xs tracking-widest">{index}</span>
      <p className="text-blue-800 dark:text-blue-400 text-xs font-medium tracking-[0.2em] uppercase">{label}</p>
      <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}
