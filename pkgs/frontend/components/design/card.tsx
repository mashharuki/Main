"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card Component
 * Clean, professional card with subtle elevation on hover
 * Design: Notion/Stripe-inspired minimal aesthetic
 */
const cardVariants = cva(
  "relative rounded-lg border transition-all duration-200",
  {
    variants: {
      variant: {
        default: [
          "bg-white",
          "border-slate-200",
          "shadow-sm",
          "hover:shadow-md",
          "hover:border-slate-300",
        ],
        primary: [
          "bg-slate-50",
          "border-slate-200",
          "shadow-sm",
          "hover:shadow-md",
          "hover:border-slate-300",
        ],
        secondary: [
          "bg-emerald-50/50",
          "border-emerald-200",
          "shadow-sm",
          "hover:shadow-md",
          "hover:border-emerald-300",
        ],
        accent: [
          "bg-blue-50/50",
          "border-blue-200",
          "shadow-sm",
          "hover:shadow-md",
          "hover:border-blue-300",
        ],
        muted: [
          "bg-slate-50",
          "border-transparent",
          "hover:bg-slate-100",
        ],
        outline: [
          "bg-white",
          "border-slate-200",
          "hover:bg-slate-50",
        ],
      },
      glow: {
        true: "shadow-md",
        false: "",
      },
      hover: {
        true: "hover:shadow-lg cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      glow: false,
      hover: true,
    },
  },
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  interactive?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const GlassCard = React.memo(
  React.forwardRef<HTMLDivElement, GlassCardProps>(
    (
      {
        className,
        variant,
        glow,
        hover,
        children,
        interactive = false,
        onClick,
        onKeyDown,
        ...props
      },
      ref,
    ) => {
      const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (interactive && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
          onKeyDown?.(e);
        },
        [interactive, onClick, onKeyDown],
      );

      const interactiveProps = React.useMemo(
        () =>
          interactive
            ? {
                tabIndex: 0,
                role: onClick ? "button" : "article",
              }
            : {},
        [interactive, onClick],
      );

      return (
        <div
          ref={ref}
          className={cn(cardVariants({ variant, glow, hover }), className)}
          {...interactiveProps}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      );
    },
  ),
);

GlassCard.displayName = "GlassCard";

// Export both old name for compatibility and new semantic name
export { GlassCard, cardVariants as glassCardVariants };
