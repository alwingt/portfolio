export default function Footer() {
  return (
    <footer
      className="py-10 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-xs font-mono"
          style={{ color: "var(--muted)" }}
        >
          © {new Date().getFullYear()} Alwin George Thomas
        </span>
        <span
          className="text-xs font-mono text-center"
          style={{ color: "var(--muted)" }}
        >
          Built with Next.js · Deployed on Vercel
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: "var(--muted)" }}
        >
          Kochi, India 🇮🇳
        </span>
      </div>
    </footer>
  );
}
