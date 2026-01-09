"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Modal Component
 * Clean, professional modal with subtle animations
 * Design: Stripe-inspired minimal aesthetic
 */
const modalVariants = cva(
  "relative rounded-lg border transition-all duration-200",
  {
    variants: {
      variant: {
        default: [
          "bg-white",
          "border-slate-200",
          "shadow-xl",
        ],
        primary: [
          "bg-white",
          "border-slate-200",
          "shadow-xl",
        ],
        secondary: [
          "bg-white",
          "border-slate-200",
          "shadow-xl",
        ],
        accent: [
          "bg-white",
          "border-blue-200",
          "shadow-xl",
        ],
      },
      glow: {
        true: "shadow-2xl",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      glow: false,
    },
  },
);

function GlassModal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="glass-modal" {...props} />;
}

function GlassModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="glass-modal-trigger" {...props} />;
}

function GlassModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="glass-modal-portal" {...props} />;
}

function GlassModalClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="glass-modal-close" {...props} />;
}

function GlassModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="glass-modal-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-[2px]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

export interface GlassModalContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalVariants> {
  showCloseButton?: boolean;
}

function GlassModalContent({
  className,
  variant,
  glow,
  children,
  showCloseButton = true,
  ...props
}: GlassModalContentProps) {
  return (
    <GlassModalPortal>
      <GlassModalOverlay />
      <DialogPrimitive.Content
        data-slot="glass-modal-content"
        className={cn(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 p-6 duration-200 sm:max-w-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          modalVariants({ variant, glow }),
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="glass-modal-close"
            className={cn(
              "absolute top-4 right-4 rounded-md p-1 opacity-60 transition-all duration-150",
              "hover:opacity-100 hover:bg-slate-100",
              "focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-hidden",
              "disabled:pointer-events-none",
              "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            )}
          >
            <XIcon className="text-slate-500 hover:text-slate-700" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </GlassModalPortal>
  );
}

function GlassModalHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-modal-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function GlassModalFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-modal-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function GlassModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="glass-modal-title"
      className={cn("text-lg leading-none font-semibold text-slate-900", className)}
      {...props}
    />
  );
}

function GlassModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="glass-modal-description"
      className={cn("text-sm text-slate-500", className)}
      {...props}
    />
  );
}

export {
  GlassModal,
  GlassModalClose,
  GlassModalContent,
  GlassModalDescription,
  GlassModalFooter,
  GlassModalHeader,
  GlassModalOverlay,
  GlassModalPortal,
  GlassModalTitle,
  GlassModalTrigger,
  modalVariants as glassModalVariants,
};
