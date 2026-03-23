"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Co-Founder",
    org: "VirtusCo",
    url: "https://virtusco.in",
    period: "Jan 2025 — Present",
    type: "Startup",
    bullets: [
      "Co-founded a five-member startup building an Autonomous Airport Porter to enhance traveler convenience.",
      "Shortlisted for KSUM Idea Fest and the Wadhwani Foundation Cohort after pitching to investors and industry stakeholders.",
      "Received early product interest from Bangalore International Airport.",
      "Led market research, ownership structuring, and operational strategy.",
    ],
  },
  {
    role: "Engineering Intern",
    org: "Kerala Electrical and Allied Engineering Co.",
    url: null,
    period: "Dec 2024",
    type: "Industrial Internship",
    bullets: [
      "Hands-on experience in the construction, testing, and dispatching of step-down and power transformers.",
      "Deep understanding of core winding, insulation, and mineral oil immersion cooling.",
      "Observed and documented all pre-dispatch testing procedures.",
      "Strengthened understanding of power transmission systems in electrical distribution networks.",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".exp-card",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-list", start: "top 80%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-40 md:py-52 relative">
      {/* Subtle horizontal rule / section border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border)" }}
      />

      <div className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="exp-header flex items-center gap-4 mb-20">
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            02 / Experience
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <div className="exp-list relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "var(--border)", left: "1px" }}
          />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="exp-card relative md:pl-12"
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute left-0 top-2 w-3 h-3 rounded-full -translate-x-1/2"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 12px var(--accent)",
                    left: "1px",
                  }}
                />

                <div
                  className="rounded-sm p-10 md:p-12 transition-colors duration-300 hover:border-accent/50 group"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="text-xs font-mono tracking-widest uppercase px-2 py-1 rounded-sm"
                          style={{
                            color: "var(--accent)",
                            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                            border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <h3
                        className="font-bold text-xl mb-1"
                        style={{ color: "var(--text)" }}
                      >
                        {exp.role}
                      </h3>
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-accent"
                          style={{ color: "var(--muted)" }}
                        >
                          {exp.org} ↗
                        </a>
                      ) : (
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--muted)" }}
                        >
                          {exp.org}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-sm font-mono shrink-0"
                      style={{ color: "var(--muted)" }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm leading-relaxed"
                        style={{ color: "var(--muted)" }}
                      >
                        <span
                          className="mt-2 shrink-0 w-1 h-1 rounded-full"
                          style={{ background: "var(--accent)" }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
