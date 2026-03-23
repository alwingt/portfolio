import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alwin George Thomas — Electronics & Instrumentation Engineer",
  description:
    "Portfolio of Alwin George Thomas — AEI engineer, robotics enthusiast, co-founder, and embedded systems builder from Kochi, India.",
  openGraph: {
    title: "Alwin George Thomas",
    description: "Electronics · Instrumentation · Robotics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable}`}
    >
      <body className="bg-bg text-text antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
