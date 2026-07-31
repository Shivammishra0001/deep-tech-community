import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarNav, Footer } from "@/components/chrome";
import { GlobalClickGlow } from "@/components/glow";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://globaldeeptech.society"),
  title: {
    default: "Deep Tech Community — AI · Quantum · Cybersecurity · Space",
    template: "%s | Deep Tech Community",
  },
  description:
    "An enterprise-grade professional community platform connecting 12,400+ researchers, engineers, founders, and leaders across Artificial Intelligence, Quantum Computing, Cybersecurity, and Space Technology.",
  keywords: [
    "Deep Tech",
    "Deep Tech Community",
    "Artificial Intelligence",
    "Quantum Computing",
    "Cybersecurity",
    "Space Technology",
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
    title: "Deep Tech Community — Enterprise Deep Tech Platform",
    description:
      "Connecting engineers, scientists, and founders across AI, Quantum Computing, Cybersecurity, and Space Tech.",
    url: "https://globaldeeptech.society",
    siteName: "Deep Tech Community",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Tech Community",
    description: "Enterprise community platform for AI, Quantum, Cybersecurity, and Space Tech.",
    creator: "@deeptechcommunity",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Deep Tech Community",
  url: "https://globaldeeptech.society",
  logo: "https://globaldeeptech.society/logo.png",
  description:
    "Enterprise-grade professional community platform for Artificial Intelligence, Quantum Computing, Cybersecurity, and Space Technology.",
  sameAs: [
    "https://twitter.com",
    "https://linkedin.com",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Quantum Computing",
    "Cybersecurity",
    "Space Technology",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50 selection:bg-neutral-900 selection:text-neutral-50 dark:selection:bg-neutral-100 dark:selection:text-neutral-950">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-neutral-900 focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs focus:font-semibold focus:text-neutral-50 focus:shadow-lg dark:focus:bg-neutral-100 dark:focus:text-neutral-950"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <GlobalClickGlow />
          <div className="flex min-h-screen flex-col xl:flex-row">
            {/* Sticky Left-Side Vertical Navigation */}
            <SidebarNav />

            {/* Main Content Workspace */}
            <div className="flex flex-1 flex-col min-w-0">
              <main id="main" className="flex-1 min-w-0" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
