"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Programming",
    icon: "</>",
    skills: [
      { name: "C++", level: 80 },
      { name: "Python", level: 75 },
      { name: "VerilogHDL", level: 65 },
    ],
  },
  {
    category: "Simulation & CAD",
    icon: "◈",
    skills: [
      { name: "MATLAB", level: 75 },
      { name: "COMSOL Multiphysics", level: 70 },
      { name: "TINA-TI", level: 72 },
      { name: "Fusion 360", level: 68 },
    ],
  },
  {
    category: "Hardware & Embedded",
    icon: "⚡",
    skills: [
      { name: "ESP32 / Arduino", level: 82 },
      { name: "PCB Design", level: 65 },
      { name: "Sensor Integration", level: 78 },
      { name: "Power Electronics", level: 60 },
    ],
  },
  {
    category: "Software & Tools",
    icon: "◻",
    skills: [
      { name: "Flutter", level: 60 },
      { name: "Git / GitHub", level: 70 },
      { name: "Linux / CLI", level: 65 },
      { name: "OSINT", level: 72 },
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
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
        ".skill-group",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
        }
      );

      /* Animate bars */
      gsap.fromTo(
        ".skill-bar-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: ".skills-grid", start: "top 75%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-40 md:py-52 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border)" }}
      />

      <div className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="skills-header flex items-center gap-4 mb-8">
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            04 / Skills
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <h2
          className="skills-header font-bold mb-20"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Tools of the{" "}
          <span style={{ color: "var(--accent)" }}>trade</span>
        </h2>

        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="skill-group rounded-sm p-8 md:p-10"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-mono text-lg"
                  style={{ color: "var(--accent)" }}
                >
                  {group.icon}
                </span>
                <h3
                  className="text-sm font-semibold tracking-widest uppercase"
                  style={{ color: "var(--text)" }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--text)" }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="text-xs font-mono"
                        style={{ color: "var(--muted)" }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-px w-full relative"
                      style={{ background: "var(--border)" }}
                    >
                      <div
                        className="skill-bar-fill absolute left-0 top-0 h-full origin-left"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, var(--accent), var(--accent-2))`,
                          boxShadow: "0 0 6px var(--accent)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education callout */}
        <div
          className="skills-header mt-16 rounded-sm p-10 md:p-12 flex flex-col md:flex-row md:items-center gap-6"
          style={{
            background: "color-mix(in srgb, var(--accent) 5%, var(--surface))",
            border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
          }}
        >
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text)" }}>
              B.Tech — Applied Electronics &amp; Instrumentation
            </h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Rajagiri School of Engineering &amp; Technology, Kochi · 6th Semester
              · Minor in Robotics &amp; Automation
            </p>
          </div>
          <div
            className="text-sm font-mono shrink-0"
            style={{ color: "var(--accent)" }}
          >
            2023 — 2027
          </div>
        </div>
      </div>
    </section>
  );
}
