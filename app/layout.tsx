import "./global.css";
import type { Metadata } from "next";
import { Source_Code_Pro, Source_Sans_3 } from "next/font/google";

import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Paul Grau",
    template: "%s - Paul Grau",
  },
  description:
    "Paul Grau, senior product engineer, writes about products, UI/UX, and working in a globalized world.",
  openGraph: {
    title: "Paul Grau",
    description:
      "Paul Grau, senior product engineer, writes about products, UI/UX, and working in a globalized world.",
    url: baseUrl,
    siteName: "Paul Grau",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

const sourceCodePro = Source_Code_Pro({
  variable: "--source-code-font",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--source-sans-font",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-foreground bg-background scroll-pt-[75px] scroll-smooth",
        sourceCodePro.variable,
        sourceSans.className,
      )}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      </head>
      <body className="antialiased max-w-2xl mx-2 sm:mx-4 mt-4 sm:mt-8 lg:mx-auto relative">
        <main className="flex-auto min-w-0 mt-2 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
