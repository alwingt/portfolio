"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    label: "Email",
    value: "alwingt.edu@gmail.com",
    href: "mailto:alwingt.edu@gmail.com",
    icon: "✉",
  },
  {
    label: "LinkedIn",
    value: "/in/alwin-gt",
    href: "https://www.linkedin.com/in/alwin-gt/",
    icon: "↗",
  },
  {
    label: "GitHub",
    value: "github.com/alwingt",
    href: "https://github.com/alwingt",
    icon: "↗",
  },
  {
    label: "Startup",
    value: "virtusco.in",
    href: "https://virtusco.in",
    icon: "↗",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-el",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-40 md:py-52 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border)" }}
      />

      {/* Circuit grid bg */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Vignette over grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, var(--bg) 100%)",
        }}
      />

      <div className="relative max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="contact-el flex items-center gap-4 mb-20">
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            05 / Contact
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <div className="max-w-2xl">
          <h2
            className="contact-el font-bold mb-10"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Let&apos;s build
            <br />
            something{" "}
            <span style={{ color: "var(--accent)" }}>real.</span>
          </h2>

          <p
            className="contact-el text-base md:text-lg leading-relaxed mb-14"
            style={{ color: "var(--muted)" }}
          >
            Open to internships, research collaborations, competitions, or just
            a good conversation about embedded systems, startups, or technology.
            I&apos;m based in Kochi, India.
          </p>

          <div className="space-y-5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="contact-el group flex items-center justify-between rounded-sm p-5 transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.background = "color-mix(in srgb, var(--accent) 5%, var(--surface))";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.background = "var(--surface)";
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-lg w-8 text-center"
                    style={{ color: "var(--accent)" }}
                  >
                    {l.icon}
                  </span>
                  <div>
                    <div
                      className="text-xs font-mono tracking-widest uppercase mb-0.5"
                      style={{ color: "var(--muted)" }}
                    >
                      {l.label}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      {l.value}
                    </div>
                  </div>
                </div>
                <span
                  className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "var(--muted)" }}
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
