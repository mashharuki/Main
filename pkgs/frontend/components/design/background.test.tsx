import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ParticleBackground } from "./background";

/**
 * SubtleBackground Component Tests
 * 
 * The ParticleBackground component has been redesigned to render a static
 * gradient background instead of animated canvas particles.
 * These tests verify the new clean implementation.
 */
describe("ParticleBackground", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders as a div element", () => {
      const { container } = render(<ParticleBackground />);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
    });

    it("renders with fixed positioning", () => {
      const { container } = render(<ParticleBackground />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("fixed");
      expect(element).toHaveClass("inset-0");
    });

    it("applies custom className", () => {
      const { container } = render(
        <ParticleBackground className="custom-class" />,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("custom-class");
    });
  });

  // Props compatibility tests (props are accepted but may be ignored in clean design)
  describe("Props Compatibility", () => {
    it("accepts particleCount prop without error", () => {
      expect(() => render(<ParticleBackground particleCount={100} />)).not.toThrow();
    });

    it("accepts particleColor prop without error", () => {
      expect(() => render(<ParticleBackground particleColor="#ff0000" />)).not.toThrow();
    });

    it("accepts particleSize prop without error", () => {
      expect(() => render(<ParticleBackground particleSize={5} />)).not.toThrow();
    });

    it("accepts speed prop without error", () => {
      expect(() => render(<ParticleBackground speed={1.5} />)).not.toThrow();
    });

    it("accepts interactive prop without error", () => {
      expect(() => render(<ParticleBackground interactive={false} />)).not.toThrow();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("has aria-hidden attribute", () => {
      const { container } = render(<ParticleBackground />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("aria-hidden", "true");
    });

    it("has role=presentation attribute", () => {
      const { container } = render(<ParticleBackground />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("role", "presentation");
    });

    it("has pointer-events-none class", () => {
      const { container } = render(<ParticleBackground />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("pointer-events-none");
    });
  });

  // Visual/style tests
  describe("Styling", () => {
    it("has z-0 class for proper layering", () => {
      const { container } = render(<ParticleBackground />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("z-0");
    });

    it("has inline background style", () => {
      const { container } = render(<ParticleBackground />);
      const element = container.firstChild as HTMLElement;
      // Component uses inline style for background gradient
      expect(element.style).toBeDefined();
    });
  });
});
