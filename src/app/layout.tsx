import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lana Zumbrunn",
  description:
    "Technical leader shaping AI workflows, agent platforms, and curriculum innovation in NYC.",
  openGraph: {
    title: "Lana Zumbrunn",
    description:
      "Technical leader shaping AI workflows, agent platforms, and curriculum innovation in NYC.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lana Zumbrunn",
    description:
      "Technical leader shaping AI workflows, agent platforms, and curriculum innovation in NYC.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
