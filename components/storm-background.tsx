"use client";

import { useEffect, useRef, useState } from "react";

export function StormBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync(); preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || paused || reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let width = 0, height = 0, frame = 0, last = 0, time = 0;
    let nextStrike = 2.5, strikeAt = -10;
    let bolt: { x: number; y: number }[] = [];
    const ghost = new window.Image();
    ghost.src = "/effects/spectral-ghost.webp";
    const batImage = new window.Image();
    batImage.src = "/effects/night-bat.webp";
    const drops = Array.from({ length: 360 }, () => ({ x: Math.random(), y: Math.random(), depth: .2 + Math.random() * .8 }));
    const bats = Array.from({ length: 4 }, (_, i) => ({ phase: i * 2.1, x: .2 + i * .22, y: .2 + i * .12, vx: i % 2 ? -.065 : .065, vy: 0, targetX: i % 2 ? -.15 : 1.15, targetY: .15 + Math.random() * .5, nextTurn: 3 + i, bank: 0, size: 10 + i * 2.4 }));
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio; canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawBat = (x: number, y: number, size: number, phase: number, bank: number, effort: number) => {
      if (!batImage.complete || !batImage.naturalWidth) return;
      ctx.save(); ctx.translate(x, y); ctx.rotate(bank);
      ctx.globalAlpha = .92;
      const sw = batImage.naturalWidth, sh = batImage.naturalHeight;
      const w = size * 5, h = w * sh / sw;
      // Project a textured wing mesh around its shoulder and wrist joints.
      // The body stays rigid; outer wing flex lags the power stroke.
      const project = (u: number, v: number) => {
        const side = u < .5 ? -1 : 1;
        const span = Math.max(0, Math.abs(u - .5) - .055) / .445;
        const shoulder = Math.sin(phase) * (.68 + effort * .2);
        const wrist = Math.sin(phase - .65) * .48 * span * span;
        const angle = shoulder + wrist + bank * side * .2;
        return { x: side * (w * .055 + span * w * .445 * Math.cos(angle)), y: (v - .5) * h + Math.sin(angle) * span * w * .3 };
      };
      const triangle = (uv: number[][], xy: { x: number; y: number }[]) => {
        const [a, b, c] = uv.map(([u, v]) => ({ x: u * sw, y: v * sh }));
        const [p, q, r] = xy;
        const d = (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
        const m11 = ((q.x - p.x) * (c.y - a.y) - (r.x - p.x) * (b.y - a.y)) / d;
        const m12 = ((q.y - p.y) * (c.y - a.y) - (r.y - p.y) * (b.y - a.y)) / d;
        const m21 = ((r.x - p.x) * (b.x - a.x) - (q.x - p.x) * (c.x - a.x)) / d;
        const m22 = ((r.y - p.y) * (b.x - a.x) - (q.y - p.y) * (c.x - a.x)) / d;
        ctx.save(); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.lineTo(r.x, r.y); ctx.closePath(); ctx.clip();
        ctx.transform(m11, m12, m21, m22, p.x - m11 * a.x - m21 * a.y, p.y - m12 * a.x - m22 * a.y);
        ctx.drawImage(batImage, 0, 0); ctx.restore();
      };
      for (const start of [0, .555]) for (let i = 0; i < 5; i++) {
        const u0 = start + i * .445 / 5, u1 = start + (i + 1) * .445 / 5;
        const uv = [[u0, 0], [u1, 0], [u1, 1], [u0, 1]];
        const p = uv.map(([u, v]) => project(u, v));
        triangle([uv[0], uv[1], uv[2]], [p[0], p[1], p[2]]);
        triangle([uv[0], uv[2], uv[3]], [p[0], p[2], p[3]]);
      }
      ctx.drawImage(batImage, sw * .445, 0, sw * .11, sh, -w * .055, -h / 2, w * .11, h);
      ctx.restore();
    };

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      if (now - last < 32) return;
      const dt = Math.min((now - (last || now)) / 1000, .06);
      last = now; time += dt;
      ctx.clearRect(0, 0, width, height);
      if (time >= nextStrike) {
        strikeAt = time; nextStrike = time + 9 + Math.random() * 9;
        const origin = width * (.64 + Math.random() * .25);
        bolt = Array.from({ length: 19 }, (_, i) => ({ x: origin + Math.sin(i * 2.3) * 18 + Math.random() * 24, y: i * height * .033 }));
      }
      const age = time - strikeAt;
      // One soft illumination per strike, never a rapid strobe.
      const glow = age < 2 ? Math.min(age / .055, 1) * Math.exp(-age * 2) : 0;
      if (glow > .015) {
        const light = ctx.createRadialGradient(width * .78, height * .12, 0, width * .7, height * .2, width * .8);
        light.addColorStop(0, `rgba(218,234,255,${glow * .72})`); light.addColorStop(.45, `rgba(159,188,237,${glow * .32})`); light.addColorStop(1, "rgba(127,153,195,0)");
        ctx.fillStyle = light; ctx.fillRect(0, 0, width, height);
        if (age < .65 && bolt.length) {
          ctx.save(); ctx.globalAlpha = Math.max(0, 1 - age / .65);
          ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2.2; ctx.shadowColor = "#a7caff"; ctx.shadowBlur = 24;
          ctx.beginPath(); bolt.forEach((point, i) => { if (i === 0) ctx.moveTo(point.x, point.y); else ctx.lineTo(point.x, point.y); }); ctx.stroke();
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bolt[5].x, bolt[5].y); ctx.lineTo(bolt[5].x + 38, bolt[5].y + 18); ctx.lineTo(bolt[5].x + 25, bolt[5].y + 42); ctx.lineTo(bolt[5].x + 85, bolt[5].y + 85); ctx.stroke(); ctx.restore();
        }
        if (ghost.complete && ghost.naturalWidth) {
          ctx.save(); ctx.globalAlpha = glow * .56;
          const gh = Math.min(height * .5, 430), gw = gh * ghost.naturalWidth / ghost.naturalHeight;
          ctx.drawImage(ghost, width * .76 - gw / 2, height * .33 + Math.sin(time) * 7, gw, gh);
          ctx.globalAlpha = glow * .23; ctx.drawImage(ghost, width * .51, height * .54, gw * .45, gh * .45); ctx.restore();
        }
      }
      for (const bat of bats) {
        if (time > bat.nextTurn) { bat.targetY = .15 + Math.random() * .5; bat.nextTurn = time + 3 + Math.random() * 4; }
        const ax = (bat.targetX - bat.x) * .055 - bat.vx * .3;
        const ay = (bat.targetY - bat.y) * .35 - bat.vy * 1.3;
        bat.vx += ax * dt; bat.vy += ay * dt;
        bat.x += bat.vx * dt; bat.y += bat.vy * dt;
        if (bat.x > 1.15 || bat.x < -.15) { bat.targetX = bat.x > 1 ? -.15 : 1.15; }
        const desiredBank = Math.atan2(bat.vy, Math.abs(bat.vx) + .025) * .65;
        bat.bank += (desiredBank - bat.bank) * Math.min(1, dt * 3);
        const effort = Math.min(1, Math.abs(ay) * 8);
        bat.phase += dt * (18 + effort * 8);
        drawBat(bat.x * width, bat.y * height, bat.size * (width < 600 ? .7 : 1), bat.phase, bat.bank, effort);
      }
      const count = width < 600 ? 165 : drops.length;
      for (let i = 0; i < count; i++) {
        const drop = drops[i];
        drop.y += dt * (.45 + drop.depth * .65); drop.x -= dt * (.025 + drop.depth * .055);
        if (drop.y > 1.05) { drop.y = -.05; drop.x = Math.random() * 1.15; }
        if (drop.x < -.1) drop.x = 1.1;
        const x = drop.x * width, y = drop.y * height, length = 14 + drop.depth * 36;
        const streak = ctx.createLinearGradient(x, y, x - length * .24, y + length);
        streak.addColorStop(0, "rgba(182,207,224,0)");
        streak.addColorStop(1, `rgba(202,222,240,${Math.min(.9, (.16 + drop.depth * .35) * (1 + glow))})`);
        ctx.strokeStyle = streak; ctx.lineWidth = .5 + drop.depth * .85;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - length * .24, y + length); ctx.stroke();
      }
    };
    const visibility = () => {
      cancelAnimationFrame(frame); last = 0;
      if (!document.hidden) frame = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", visibility);
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", visibility); ctx.clearRect(0, 0, width, height); };
  }, [paused, reduced]);

  return <>
    <canvas ref={canvasRef} className="storm-canvas" aria-hidden="true" />
    {!reduced && <button className="storm-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play atmosphere" : "Pause atmosphere"}</button>}
  </>;
}
