import type { Metadata } from "next";
import { Montserrat, Poiret_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/ui/JsonLd";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poiretOne = Poiret_One({
  variable: "--font-poiret",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const BASE_URL = "https://www.badaisamoedra.com/";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Badai Samoedra — Software Architect & Engineer",
    template: "%s | Badai Samoedra",
  },
  description:
    "Badai Samoedra is a Software Architect and Principal Engineer based in Jakarta, Indonesia. 13+ years building scalable systems, APIs, and cloud infrastructure for enterprise and freelance clients.",
  keywords: [
    "software architect",
    "software engineer",
    "backend engineer",
    "fullstack developer",
    "jakarta",
    "indonesia",
    "freelance engineer",
    "system design",
    "API design",
    "cloud infrastructure",
    "Next.js",
    "TypeScript",
    "Go",
    "Node.js",
  ],
  authors: [{ name: "Badai Samoedra", url: BASE_URL }],
  creator: "Badai Samoedra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Badai Samoedra",
    title: "Badai Samoedra — Software Architect & Engineer",
    description:
      "Badai Samoedra is a Software Architect and Principal Engineer based in Jakarta, Indonesia. 13+ years building scalable systems, APIs, and cloud infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Badai Samoedra — Software Architect & Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badai Samoedra — Software Architect & Engineer",
    description:
      "13+ years building scalable systems, APIs, and cloud infrastructure. Based in Jakarta, Indonesia.",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poiretOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0B0B0B]">
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
