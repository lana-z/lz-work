import type { Metadata } from "next";
import "./globals.css";

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
        className="bg-background text-foreground antialiased font-mono"
      >
        {children}
      </body>
    </html>
  );
}
