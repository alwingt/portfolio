"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Phase Change Memory Research",
    subtitle: "COMSOL Multiphysics · Ongoing",
    description:
      "Studying next-generation non-volatile memory architectures. Building a 2D axisymmetric PCM stack (TiN-GST-TiN) in COMSOL, analyzing RESET energy, thermal confinement, and resistance switching against DRAM and NAND baselines.",
    tags: ["COMSOL", "PCM", "Memory Architecture", "Thermal Analysis", "Research"],
    highlight: "Confined cell & mushroom cell PCM structures",
    status: "ongoing",
  },
  {
    number: "02",
    title: "Industry-Funded Airflow Analysis Robot",
    subtitle: "ESP32 · Flutter · MIT App Inventor · Jan 2025",
    description:
      "Developed a semi-autonomous mobile sensing robot for real-time precision airflow data collection and wireless transmission. Built the companion app in Flutter and MIT App Inventor; collaborated with industry stakeholders to optimize sensor visualization.",
    tags: ["ESP32", "Flutter", "Embedded C", "IoT", "Sensors", "Robotics"],
    highlight: "Industry-funded, real-world deployment",
    status: "complete",
  },
  {
    number: "03",
    title: "Bluetooth RC Car — IEEE E-ATV",
    subtitle: "Microcontrollers · Motor Drivers · Oct 2024 & 2025",
    description:
      "Designed and built a Bluetooth-controlled RC car for the IEEE SB E-ATV competition at Saintgits College of Engineering. Implemented all electronic systems including microcontrollers and motor drivers.",
    tags: ["Arduino", "Bluetooth", "Motor Drivers", "PCB", "Competition"],
    highlight: "3rd (2024) → 1st (2025) · ₹10,000 prize total",
    status: "complete",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-header",
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
        ".proj-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".proj-grid", start: "top 80%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-40 md:py-52 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border)" }}
      />

      <div className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="proj-header flex items-center gap-4 mb-8">
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            03 / Projects
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <h2
          className="proj-header font-bold mb-20"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Things I&apos;ve{" "}
          <span style={{ color: "var(--accent)" }}>built & researched</span>
        </h2>

        <div className="proj-grid space-y-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="proj-card group rounded-sm overflow-hidden transition-all duration-400"
              style={{
                background: "var(--surface)",
                border: `1px solid ${active === i ? "var(--accent)" : "var(--border)"}`,
                boxShadow:
                  active === i
                    ? "0 0 30px color-mix(in srgb, var(--accent) 10%, transparent)"
                    : "none",
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="p-10 md:p-14">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Number */}
                  <div
                    className="font-mono font-bold shrink-0 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      color: active === i ? "var(--accent)" : "var(--border)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {p.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3
                        className="font-bold text-xl"
                        style={{ color: "var(--text)" }}
                      >
                        {p.title}
                      </h3>
                      {p.status === "ongoing" && (
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-full flex items-center gap-1.5"
                          style={{
                            color: "var(--accent)",
                            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                            border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "var(--accent)",
                              animation: "pulse 1.5s ease-in-out infinite",
                            }}
                          />
                          Ongoing
                        </span>
                      )}
                    </div>

                    <p
                      className="text-sm font-mono mb-4"
                      style={{ color: "var(--muted)" }}
                    >
                      {p.subtitle}
                    </p>

                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "var(--muted)" }}
                    >
                      {p.description}
                    </p>

                    {/* Highlight */}
                    <div
                      className="flex items-center gap-2 mb-5 text-sm font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      <span>★</span>
                      <span>{p.highlight}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono rounded-sm"
                          style={{
                            color: "var(--muted)",
                            background: "var(--muted-2)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
