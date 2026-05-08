"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type Star = { x: number; y: number; r: number; opacity: number; twinkleSpeed: number; twinkleOffset: number };
type Satellite = { angle: number; speed: number; dotRadius: number; trailLength: number };
type Orbit = { cx: number; cy: number; rx: number; ry: number; tilt: number; satellites: Satellite[] };

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let stars: Star[] = [];
    let orbits: Orbit[] = [];
    let frame = 0;

    const isDark = () => document.documentElement.classList.contains("dark");

    // Colors shift based on theme
    const orbitColor  = () => isDark() ? "99, 160, 255"  : "20, 40, 100";
    const glowColor   = () => isDark() ? "120, 180, 255" : "59, 130, 246";
    const starColor   = () => isDark() ? "150, 190, 255" : "20, 40, 100";
    const gridColor   = () => isDark() ? "99, 140, 255"  : "20, 40, 100";

    const build = () => {
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;

      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.7 + 0.15,
        twinkleSpeed: Math.random() * 0.025 + 0.006,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));

      orbits = [
        { cx, cy, rx: W * 0.46, ry: H * 0.10, tilt: -0.2,
          satellites: [{ angle: 0, speed: 0.0025, dotRadius: 4, trailLength: 35 }] },
        { cx, cy, rx: W * 0.40, ry: H * 0.18, tilt: 0.5,
          satellites: [
            { angle: 0,       speed: 0.0035, dotRadius: 3.5, trailLength: 28 },
            { angle: Math.PI, speed: 0.0035, dotRadius: 3,   trailLength: 24 },
          ] },
        { cx, cy, rx: W * 0.30, ry: H * 0.22, tilt: -0.9,
          satellites: [{ angle: Math.PI * 0.7, speed: 0.005, dotRadius: 3.5, trailLength: 26 }] },
        { cx, cy, rx: W * 0.20, ry: H * 0.35, tilt: 1.2,
          satellites: [
            { angle: Math.PI * 0.3, speed: 0.007, dotRadius: 3,   trailLength: 22 },
            { angle: Math.PI * 1.3, speed: 0.007, dotRadius: 2.5, trailLength: 18 },
          ] },
        { cx, cy, rx: W * 0.14, ry: H * 0.20, tilt: 0.3,
          satellites: [{ angle: Math.PI * 1.5, speed: 0.011, dotRadius: 3, trailLength: 20 }] },
        { cx, cy, rx: W * 0.42, ry: H * 0.07, tilt: 0.08,
          satellites: [{ angle: Math.PI * 0.5, speed: 0.002, dotRadius: 2.5, trailLength: 20 }] },
        { cx, cy, rx: W * 0.24, ry: H * 0.14, tilt: -0.6,
          satellites: [
            { angle: 0,             speed: 0.008, dotRadius: 2.5, trailLength: 18 },
            { angle: Math.PI * 1.2, speed: 0.008, dotRadius: 2,   trailLength: 16 },
          ] },
      ];
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      build();
    };
    resize();
    window.addEventListener("resize", resize);

    const ellipsePoint = (o: Orbit, t: number) => {
      const px = o.rx * Math.cos(t), py = o.ry * Math.sin(t);
      return {
        x: o.cx + px * Math.cos(o.tilt) - py * Math.sin(o.tilt),
        y: o.cy + px * Math.sin(o.tilt) + py * Math.cos(o.tilt),
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      const sc = starColor(), oc = orbitColor(), gc = glowColor(), grc = gridColor();
      const dark = isDark();

      // Stars with twinkle
      for (const s of stars) {
        const twinkle = 0.65 + 0.35 * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sc}, ${s.opacity * twinkle * (dark ? 0.9 : 0.65)})`;
        ctx.fill();
      }

      // Coordinate grid
      const W = canvas.width, H = canvas.height;
      const gridStep = Math.min(W, H) * 0.12;
      ctx.strokeStyle = `rgba(${grc}, ${dark ? 0.07 : 0.05})`;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += gridStep) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += gridStep) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Central focal point
      const fcx = W / 2, fcy = H / 2;
      ctx.strokeStyle = `rgba(${oc}, ${dark ? 0.35 : 0.22})`;
      ctx.lineWidth = 0.9;
      const cs = 12;
      ctx.beginPath(); ctx.moveTo(fcx - cs, fcy); ctx.lineTo(fcx + cs, fcy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fcx, fcy - cs); ctx.lineTo(fcx, fcy + cs); ctx.stroke();
      ctx.beginPath(); ctx.arc(fcx, fcy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${oc}, ${dark ? 0.45 : 0.3})`; ctx.fill();
      ctx.beginPath(); ctx.arc(fcx, fcy, 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${oc}, ${dark ? 0.15 : 0.1})`; ctx.stroke();

      // Orbits
      for (const o of orbits) {
        ctx.save();
        ctx.translate(o.cx, o.cy);
        ctx.rotate(o.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${oc}, ${dark ? 0.35 : 0.22})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        for (const sat of o.satellites) {
          // Trail
          for (let i = 0; i < sat.trailLength; i++) {
            const pt = ellipsePoint(o, sat.angle - i * 0.018);
            const prog = 1 - i / sat.trailLength;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, sat.dotRadius * prog * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${oc}, ${(dark ? 0.6 : 0.4) * prog * prog})`;
            ctx.fill();
          }

          const pos = ellipsePoint(o, sat.angle);

          // Wide soft glow
          const g2 = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, sat.dotRadius * 7);
          g2.addColorStop(0, `rgba(${gc}, ${dark ? 0.45 : 0.3})`);
          g2.addColorStop(1, `rgba(${gc}, 0)`);
          ctx.beginPath(); ctx.arc(pos.x, pos.y, sat.dotRadius * 7, 0, Math.PI * 2);
          ctx.fillStyle = g2; ctx.fill();

          // Inner glow
          const g1 = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, sat.dotRadius * 2.5);
          g1.addColorStop(0, `rgba(${gc}, ${dark ? 0.9 : 0.7})`);
          g1.addColorStop(1, `rgba(${gc}, 0)`);
          ctx.beginPath(); ctx.arc(pos.x, pos.y, sat.dotRadius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = g1; ctx.fill();

          // Core dot
          ctx.beginPath(); ctx.arc(pos.x, pos.y, sat.dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${oc}, ${dark ? 1 : 0.9})`; ctx.fill();

          sat.angle += sat.speed;
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener("resize", resize); };
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />;
}
