"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--bg) 85%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-bold text-lg tracking-wider"
          style={{ color: "var(--accent)", letterSpacing: "0.15em" }}
        >
          AGT
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-accent"
                style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <a
          href="mailto:alwingt.edu@gmail.com"
          className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-sm transition-all duration-200 hover:bg-accent hover:text-bg"
          style={{
            color: "var(--accent)",
            border: "1px solid var(--accent)",
            letterSpacing: "0.08em",
          }}
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "var(--text)",
              transform: open ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="block w-4 h-px transition-all duration-300"
            style={{
              background: "var(--text)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "var(--text)",
              transform: open ? "rotate(-45deg) translateY(-4px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? "320px" : "0" }}
      >
        <ul
          className="px-6 pb-6 flex flex-col gap-5 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="text-base font-medium tracking-widest uppercase w-full text-left"
                style={{ color: "var(--muted)" }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
