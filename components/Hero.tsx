"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Oscilloscope canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      /* Grid */
      ctx.strokeStyle = "rgba(0, 245, 212, 0.04)";
      ctx.lineWidth = 1;
      const cols = 12, rows = 8;
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo((i / cols) * W, 0);
        ctx.lineTo((i / cols) * W, H);
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, (j / rows) * H);
        ctx.lineTo(W, (j / rows) * H);
        ctx.stroke();
      }

      /* Center line */
      ctx.strokeStyle = "rgba(0, 245, 212, 0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      /* Wave traces */
      const traces = [
        { amp: H * 0.12, freq: 2.2, phase: 0,      alpha: 0.7, width: 1.5 },
        { amp: H * 0.07, freq: 5.1, phase: 1.2,    alpha: 0.35, width: 1 },
        { amp: H * 0.04, freq: 11,  phase: 2.7,    alpha: 0.2, width: 0.8 },
      ];

      traces.forEach(({ amp, freq, phase, alpha, width }) => {
        ctx.save();
        ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
        ctx.lineWidth = width;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(0, 245, 212, 0.5)";
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const relX = x / W;
          const y =
            H / 2 +
            amp * Math.sin(freq * Math.PI * 2 * relX + t + phase);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      /* Scan line */
      const scanX = ((t * 60) % (W + 40)) - 20;
      const grad = ctx.createLinearGradient(scanX - 20, 0, scanX + 20, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(0,245,212,0.08)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - 20, 0, 40, H);

      t += 0.008;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── GSAP hero entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        ".hero-tag",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".hero-line-1 .char",
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .fromTo(
          ".hero-line-2 .char",
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const line1 = "ALWIN GEORGE".split("");
  const line2 = "THOMAS".split("");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Oscilloscope canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--bg) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-20 pt-36">
        {/* Tag */}
        <div className="hero-tag flex items-center gap-3 mb-12">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
          />
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Electronics · Instrumentation · Robotics
          </span>
        </div>

        {/* Name */}
        <h1 className="font-bold leading-none mb-10 select-none">
          <div className="hero-line-1 overflow-hidden">
            <div
              className="flex flex-wrap"
              style={{
                fontSize: "clamp(3rem, 9vw, 10rem)",
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            >
              {line1.map((char, i) => (
                <span key={i} className="char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-line-2 overflow-hidden">
            <div
              className="flex flex-wrap"
              style={{
                fontSize: "clamp(4rem, 14vw, 14rem)",
                letterSpacing: "-0.03em",
                WebkitTextStroke: "1px var(--muted)",
                color: "transparent",
                marginLeft: "clamp(0px, 4vw, 80px)",
              }}
            >
              {line2.map((char, i) => (
                <span key={i} className="char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-sub text-base md:text-xl font-light mb-14 max-w-2xl"
          style={{ color: "var(--muted)", lineHeight: 1.7 }}
        >
          AEI undergrad at Rajagiri, Kochi — building at the intersection of
          hardware and intelligence. Co-founder,{" "}
          <a
            href="https://virtusco.in"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-accent"
            style={{ color: "var(--text)" }}
          >
            VirtusCo
          </a>
          .
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <button
            className="hero-cta px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-accent hover:text-bg hover:shadow-lg"
            style={{
              color: "var(--accent)",
              border: "1px solid var(--accent)",
              letterSpacing: "0.12em",
              boxShadow: "0 0 0 0 var(--accent)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 24px color-mix(in srgb, var(--accent) 30%, transparent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
            onClick={() =>
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Work
          </button>
          <button
            className="hero-cta px-6 py-3 text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-accent"
            style={{
              color: "var(--muted)",
              letterSpacing: "0.12em",
            }}
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact →
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "50%",
              background: "var(--accent)",
              animation: "scrollLine 1.6s ease-in-out infinite",
            }}
          />
        </div>
        <style>{`
          @keyframes scrollLine {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </div>
    </section>
  );
}
