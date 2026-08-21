"use client";

import type { ReactNode } from "react";
import { useReveal } from "../lib/hooks";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "section";
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
};

export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  variant = "up"
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

