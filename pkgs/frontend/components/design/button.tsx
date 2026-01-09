"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Button Component
 * Clean, professional button with subtle interactions
 * Design: Stripe-inspired minimal aesthetic
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: [
          "bg-slate-900",
          "text-white",
          "border border-slate-900",
          "shadow-sm",
          "hover:bg-slate-800",
          "active:bg-slate-950",
        ],
        secondary: [
          "bg-white",
          "text-slate-900",
          "border border-slate-200",
          "shadow-sm",
          "hover:bg-slate-50",
          "hover:border-slate-300",
          "active:bg-slate-100",
        ],
        accent: [
          "bg-blue-600",
          "text-white",
          "border border-blue-600",
          "shadow-sm",
          "hover:bg-blue-700",
          "active:bg-blue-800",
        ],
        ghost: [
          "bg-transparent",
          "text-slate-700",
          "border border-transparent",
          "hover:bg-slate-100",
          "active:bg-slate-200",
        ],
        destructive: [
          "bg-red-600",
          "text-white",
          "border border-red-600",
          "shadow-sm",
          "hover:bg-red-700",
          "active:bg-red-800",
        ],
        success: [
          "bg-emerald-600",
          "text-white",
          "border border-emerald-600",
          "shadow-sm",
          "hover:bg-emerald-700",
          "active:bg-emerald-800",
        ],
        link: [
          "bg-transparent",
          "text-slate-900",
          "underline-offset-4",
          "hover:underline",
          "hover:text-slate-700",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
      glow: {
        true: "shadow-md",
        false: "",
      },
      pulse: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        glow: true,
        className: "shadow-lg shadow-slate-900/10",
      },
      {
        variant: "accent",
        glow: true,
        className: "shadow-lg shadow-blue-600/20",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      glow: false,
      pulse: false,
    },
  },
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  asChild?: boolean;
  loading?: boolean;
  "aria-label"?: string;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      pulse,
      children,
      disabled,
      loading = false,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, glow, pulse }),
          loading && "cursor-wait",
          className,
        )}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <>
            <span className="sr-only">Loading...</span>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </>
        )}
        {children}
      </button>
    );
  },
);

NeonButton.displayName = "NeonButton";

export { NeonButton, NeonButton as Button, buttonVariants as neonButtonVariants };
