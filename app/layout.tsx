import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Quantum Concepts Interactive Demo",
  description:
    "Sequential quantum concepts walkthrough with Grover's algorithm visualization and quizzes."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

