"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3rd", label: "Year Undergrad" },
  { value: "2", label: "Competition Wins" },
  { value: "3+", label: "Live Projects" },
  { value: "∞", label: "Curiosity" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="py-32 relative">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="about-reveal flex items-center gap-4 mb-16">
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            01 / About
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Text block */}
          <div>
            <h2
              className="about-reveal font-bold mb-8"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              I build things that exist at the{" "}
              <span style={{ color: "var(--accent)" }}>edge of hardware</span>{" "}
              and software.
            </h2>

            <div
              className="about-reveal space-y-4 text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              <p>
                I&apos;m Alwin George Thomas, a 3rd year B.Tech student in Applied
                Electronics &amp; Instrumentation at Rajagiri School of Engineering
                and Technology, Kochi, with a minor in Robotics &amp; Automation.
              </p>
              <p>
                My work spans embedded systems design, circuit simulation, OSINT,
                and prototype development for competitive engineering challenges.
                I&apos;m equally comfortable writing Verilog for FPGAs, soldering
                a transformer, or architecting a Flutter app for a semi-autonomous
                robot.
              </p>
              <p>
                Outside labs and lecture halls, I co-founded{" "}
                <a
                  href="https://virtusco.in"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-accent"
                  style={{ color: "var(--text)" }}
                >
                  VirtusCo
                </a>
                , a startup building an Autonomous Airport Porter — shortlisted for
                KSUM Idea Fest and the Wadhwani Foundation Cohort, with early
                product interest from Bangalore International Airport.
              </p>
            </div>
          </div>

          {/* Right: stats + identity tags */}
          <div>
            {/* Stats */}
            <div className="stats-grid grid grid-cols-2 gap-4 mb-10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="stat-card rounded-sm p-6"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="font-bold mb-1"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                      color: "var(--accent)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="about-reveal flex flex-wrap gap-2">
              {[
                "Embedded Systems",
                "OSINT",
                "Robotics",
                "FPGA / VerilogHDL",
                "Circuit Design",
                "Python · C++",
                "Fusion 360",
                "MATLAB",
                "Entrepreneurship",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-mono tracking-wide rounded-sm"
                  style={{
                    background: "var(--muted-2)",
                    color: "var(--muted)",
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
    </section>
  );
}
