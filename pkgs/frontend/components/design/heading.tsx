"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * HeadingText Component
 * Clean, professional text styling with emphasis options
 * Design: Notion-inspired typography without gradient effects
 */
const headingTextVariants = cva(
  "inline-block font-semibold tracking-tight",
  {
    variants: {
      variant: {
        default: "text-slate-900",
        primary: "text-slate-900",
        secondary: "text-slate-700",
        accent: "text-blue-600",
        muted: "text-slate-500",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      animate: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      weight: "semibold",
      animate: false,
    },
  },
);

export interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "ref">,
    VariantProps<typeof headingTextVariants> {
  children: React.ReactNode;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  /** @deprecated Use variant instead - gradient prop kept for backwards compatibility */
  gradient?: string;
}

function GradientTextInner({
  className,
  variant,
  weight,
  animate,
  children,
  as: Component = "span",
  gradient, // Ignored but kept for backwards compatibility
  ...props
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        headingTextVariants({ variant, weight, animate }),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

const GradientText = React.memo(GradientTextInner);
GradientText.displayName = "GradientText";

// Export both old and new names for compatibility
export { GradientText, headingTextVariants as gradientTextVariants };
