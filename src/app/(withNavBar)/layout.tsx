import type { Metadata } from "next";
import { Navbar } from "@/src/components/shared/navbar";
import { Footer } from "@/src/components/shared/footer";

import "../globals.css";


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
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
