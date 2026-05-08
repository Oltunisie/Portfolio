"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; opacity: number };

type Orbit = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  tilt: number;   // rotation of ellipse in radians
  speed: number;  // radians per frame
  angle: number;  // current position on orbit
  dotRadius: number;
  trailLength: number;
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

    const build = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      // Static star field
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
      }));

      // Orbital paths — different sizes, tilts, speeds
      orbits = [
        { cx, cy, rx: W * 0.38, ry: H * 0.14, tilt: -0.25, speed: 0.004, angle: 0,        dotRadius: 3,   trailLength: 28 },
        { cx, cy, rx: W * 0.28, ry: H * 0.22, tilt:  0.55, speed: 0.006, angle: Math.PI,   dotRadius: 2.5, trailLength: 22 },
        { cx, cy, rx: W * 0.18, ry: H * 0.30, tilt:  1.1,  speed: 0.009, angle: Math.PI/2, dotRadius: 2,   trailLength: 18 },
        { cx, cy, rx: W * 0.44, ry: H * 0.09, tilt:  0.15, speed: 0.003, angle: Math.PI*1.5, dotRadius: 2, trailLength: 16 },
      ];
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      build();
    };
    resize();
    window.addEventListener("resize", resize);

    // Get point on ellipse at angle t, with tilt rotation around center
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

      // Stars
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 58, 95, ${s.opacity})`;
        ctx.fill();
      }

      for (const o of orbits) {
        // Draw full ellipse orbit (dashed, very faint)
        ctx.save();
        ctx.translate(o.cx, o.cy);
        ctx.rotate(o.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(30, 58, 95, 0.12)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Draw glowing trail behind satellite
        const trailSteps = o.trailLength;
        for (let i = 0; i < trailSteps; i++) {
          const t = o.angle - (i * 0.018);
          const pt = ellipsePoint(o, t);
          const progress = 1 - i / trailSteps;
          const r = o.dotRadius * progress * 0.7;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(30, 58, 95, ${0.35 * progress})`;
          ctx.fill();
        }

        // Draw satellite dot with glow
        const pos = ellipsePoint(o, o.angle);

        // Outer glow
        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, o.dotRadius * 4);
        grd.addColorStop(0, "rgba(59, 130, 246, 0.35)");
        grd.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, o.dotRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, o.dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(30, 58, 95, 0.85)";
        ctx.fill();

        o.angle += o.speed;
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
