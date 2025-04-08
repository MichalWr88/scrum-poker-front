import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { initConnectMongo } from "../services/mongodb/service";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await initConnectMongo();
  return (
    <html lang="en" className=" h-fit">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
