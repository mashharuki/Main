/**
 * Design System Components
 * Clean, minimal, professional SaaS design system
 * Inspired by Notion, Stripe, and Dune Analytics
 */

// Chart component
export { CyberChart, type CyberChartProps } from "./chart";
// Alias for clean naming
export { CyberChart as Chart } from "./chart";

// Card component
export {
  GlassCard,
  type GlassCardProps,
  glassCardVariants,
} from "./card";
// Alias for clean naming
export { GlassCard as Card, glassCardVariants as cardVariants } from "./card";

// Modal component
export {
  GlassModal,
  GlassModalClose,
  GlassModalContent,
  type GlassModalContentProps,
  GlassModalDescription,
  GlassModalFooter,
  GlassModalHeader,
  GlassModalOverlay,
  GlassModalPortal,
  GlassModalTitle,
  GlassModalTrigger,
  glassModalVariants,
} from "./modal";
// Aliases for clean naming
export {
  GlassModal as Modal,
  GlassModalClose as ModalClose,
  GlassModalContent as ModalContent,
  GlassModalDescription as ModalDescription,
  GlassModalFooter as ModalFooter,
  GlassModalHeader as ModalHeader,
  GlassModalOverlay as ModalOverlay,
  GlassModalPortal as ModalPortal,
  GlassModalTitle as ModalTitle,
  GlassModalTrigger as ModalTrigger,
  glassModalVariants as modalVariants,
} from "./modal";

// Heading/Text component
export {
  GradientText,
  type GradientTextProps,
  gradientTextVariants,
} from "./heading";
// Alias for clean naming
export { GradientText as Heading, gradientTextVariants as headingVariants } from "./heading";

// Button component
export {
  NeonButton,
  type NeonButtonProps,
  neonButtonVariants,
} from "./button";
// Alias for clean naming
export { NeonButton as PrimaryButton, neonButtonVariants as buttonVariants } from "./button";

// Background component
export {
  ParticleBackground,
  type ParticleBackgroundProps,
} from "./background";
// Alias for clean naming
export { ParticleBackground as SubtleBackground } from "./background";
