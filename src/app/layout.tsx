import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar, Footer } from "@/components/chrome";
import { GlobalClickGlow } from "@/components/glow";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://globaldeeptech.society"),
  title: {
    default: "Deep Tech Community — AI · Quantum · Cybersecurity · AI Governance",
    template: "%s | Deep Tech Community",
  },
  description:
    "A practitioner community platform connecting researchers, engineers, founders, and leaders across Artificial Intelligence, Quantum Computing, Cybersecurity, and AI Governance.",
  keywords: [
    "Deep Tech",
    "Deep Tech Community",
    "Artificial Intelligence",
    "Quantum Computing",
    "Cybersecurity",
    "AI Governance",
    "Research Community",
    "Engineering Roadmaps",
    "Technical Symposia",
  ],
  authors: [{ name: "Deep Tech Community" }],
  creator: "Deep Tech Community",
  publisher: "Deep Tech Community",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Deep Tech Community — Frontier Tech Platform",
    description:
      "Connecting engineers, scientists, and founders across AI, Quantum Computing, Cybersecurity, and AI Governance.",
    url: "https://globaldeeptech.society",
    siteName: "Deep Tech Community",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Tech Community",
    description: "Practitioner community platform for AI, Quantum, Cybersecurity, and AI Governance.",
    creator: "@deeptechcommunity",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.png?v=2", type: "image/png" },
      { url: "/icon.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.png?v=2",
    apple: "/apple-icon.png?v=2",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Deep Tech Community",
  url: "https://globaldeeptech.society",
  logo: "https://globaldeeptech.society/logo.png",
  description:
    "Practitioner community platform for Artificial Intelligence, Quantum Computing, Cybersecurity, and AI Governance.",
  sameAs: [
    "https://twitter.com",
    "https://linkedin.com",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Quantum Computing",
    "Cybersecurity",
    "AI Governance",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
      </head>
      <body className="min-h-screen font-sans antialiased bg-background text-primary selection:bg-primary selection:text-background">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs focus:font-semibold focus:shadow-lg focus:bg-neutral-100 focus:text-neutral-950"
        >
          Skip to main content
        </a>
        <GlobalClickGlow />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main" className="flex-1 min-w-0" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
