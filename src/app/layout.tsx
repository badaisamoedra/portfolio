import type { Metadata } from "next";
import { Montserrat, Poiret_One } from "next/font/google";
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

export const metadata: Metadata = {
  title: "I build systems that actually work. — Engineer. Architect.",
  description:
    "Personal portfolio of Badai Samoedra — software engineer specializing in web development, architecture, and digital products.",
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
        {children}
      </body>
    </html>
  );
}
