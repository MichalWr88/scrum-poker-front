import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/src/components/shared/navbar";
import { Footer } from "@/src/components/shared/footer";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scrum Poker App with Jira Integration",
  description: "A collaborative planning poker tool for agile teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
    >
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
