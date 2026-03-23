"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterLink = () => {
      dot.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%) scale(2.5)`;
      ring.style.opacity = "0";
    };
    const onMouseLeaveLink = () => {
      ring.style.opacity = "1";
    };

    const links = document.querySelectorAll("a, button, [data-cursor]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    const animate = () => {
      const { x, y } = posRef.current;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

      ringPosRef.current.x += (x - ringPosRef.current.x) * 0.1;
      ringPosRef.current.y += (y - ringPosRef.current.y) * 0.1;
      ring.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-150"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 8px var(--accent), 0 0 16px var(--accent)",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-200"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid color-mix(in srgb, var(--accent) 50%, transparent)",
        }}
      />
    </>
  );
}
