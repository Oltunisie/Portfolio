"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; opacity: number; twinkleSpeed: number; twinkleOffset: number };

type Satellite = { angle: number; speed: number; dotRadius: number; trailLength: number };

type Orbit = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  tilt: number;
  satellites: Satellite[];
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let stars: Star[] = [];
    let orbits: Orbit[] = [];
    let frame = 0;

    const build = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        opacity: Math.random() * 0.55 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));

      orbits = [
        // Large sweeping outer orbit — 1 satellite
        { cx, cy, rx: W * 0.46, ry: H * 0.10, tilt: -0.2,
          satellites: [{ angle: 0, speed: 0.0025, dotRadius: 3, trailLength: 30 }] },

        // Wide tilted orbit — 2 satellites opposite each other
        { cx, cy, rx: W * 0.40, ry: H * 0.18, tilt: 0.5,
          satellites: [
            { angle: 0,       speed: 0.0035, dotRadius: 2.5, trailLength: 24 },
            { angle: Math.PI, speed: 0.0035, dotRadius: 2,   trailLength: 20 },
          ] },

        // Mid orbit — 1 satellite
        { cx, cy, rx: W * 0.30, ry: H * 0.22, tilt: -0.9,
          satellites: [{ angle: Math.PI * 0.7, speed: 0.005, dotRadius: 2.5, trailLength: 22 }] },

        // Steep inclination orbit — 2 satellites
        { cx, cy, rx: W * 0.20, ry: H * 0.35, tilt: 1.2,
          satellites: [
            { angle: Math.PI * 0.3, speed: 0.007, dotRadius: 2,   trailLength: 18 },
            { angle: Math.PI * 1.3, speed: 0.007, dotRadius: 1.5, trailLength: 14 },
          ] },

        // Small fast inner orbit — 1 satellite
        { cx, cy, rx: W * 0.14, ry: H * 0.20, tilt: 0.3,
          satellites: [{ angle: Math.PI * 1.5, speed: 0.011, dotRadius: 2, trailLength: 16 }] },

        // Near-equatorial large orbit — 1 satellite
        { cx, cy, rx: W * 0.42, ry: H * 0.07, tilt: 0.08,
          satellites: [{ angle: Math.PI * 0.5, speed: 0.002, dotRadius: 2, trailLength: 18 }] },

        // Diagonal mid-small — 2 satellites
        { cx, cy, rx: W * 0.24, ry: H * 0.14, tilt: -0.6,
          satellites: [
            { angle: 0,             speed: 0.008, dotRadius: 1.8, trailLength: 16 },
            { angle: Math.PI * 1.2, speed: 0.008, dotRadius: 1.5, trailLength: 12 },
          ] },
      ];
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      build();
    };
    resize();
    window.addEventListener("resize", resize);

    const ellipsePoint = (o: Orbit, t: number) => {
      const px = o.rx * Math.cos(t);
      const py = o.ry * Math.sin(t);
      return {
        x: o.cx + px * Math.cos(o.tilt) - py * Math.sin(o.tilt),
        y: o.cy + px * Math.sin(o.tilt) + py * Math.cos(o.tilt),
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Twinkling stars
      for (const s of stars) {
        const twinkle = 0.7 + 0.3 * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 58, 95, ${s.opacity * twinkle})`;
        ctx.fill();
      }

      // Subtle coordinate grid (like a star chart)
      const W = canvas.width;
      const H = canvas.height;
      const gridStep = Math.min(W, H) * 0.12;
      ctx.strokeStyle = "rgba(30, 58, 95, 0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += gridStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridStep) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Central focal point — small crosshair + dot (like a target/origin)
      const fcx = W / 2;
      const fcy = H / 2;
      const crossSize = 10;
      ctx.strokeStyle = "rgba(30, 58, 95, 0.18)";
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(fcx - crossSize, fcy); ctx.lineTo(fcx + crossSize, fcy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fcx, fcy - crossSize); ctx.lineTo(fcx, fcy + crossSize); ctx.stroke();
      ctx.beginPath();
      ctx.arc(fcx, fcy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30, 58, 95, 0.25)";
      ctx.fill();
      // Outer ring around focal point
      ctx.beginPath();
      ctx.arc(fcx, fcy, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(30, 58, 95, 0.08)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Orbits and satellites
      for (const o of orbits) {
        // Dashed orbit path
        ctx.save();
        ctx.translate(o.cx, o.cy);
        ctx.rotate(o.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(30, 58, 95, 0.13)";
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 9]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        for (const sat of o.satellites) {
          // Glowing trail
          for (let i = 0; i < sat.trailLength; i++) {
            const t = sat.angle - i * 0.016;
            const pt = ellipsePoint(o, t);
            const progress = 1 - i / sat.trailLength;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, sat.dotRadius * progress * 0.65, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(30, 58, 95, ${0.3 * progress * progress})`;
            ctx.fill();
          }

          // Satellite glow halo
          const pos = ellipsePoint(o, sat.angle);
          const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, sat.dotRadius * 5);
          grd.addColorStop(0, "rgba(96, 165, 250, 0.3)");
          grd.addColorStop(1, "rgba(96, 165, 250, 0)");
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, sat.dotRadius * 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Satellite core
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, sat.dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(30, 58, 95, 0.9)";
          ctx.fill();

          sat.angle += sat.speed;
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
}
