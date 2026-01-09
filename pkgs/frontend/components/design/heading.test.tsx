import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GradientText } from "./heading";

/**
 * HeadingText Component Tests
 * Updated for clean SaaS design (formerly GradientText with gradient effects)
 * Now uses solid colors instead of animated gradients
 */
describe("GradientText", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<GradientText>Heading Text</GradientText>);
      expect(screen.getByText("Heading Text")).toBeInTheDocument();
    });

    it("renders as span by default", () => {
      render(<GradientText>Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.tagName).toBe("SPAN");
    });

    it("applies custom className", () => {
      render(<GradientText className="custom-class">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element).toHaveClass("custom-class");
    });
  });

  // as property tests
  describe("as Property", () => {
    it("renders as h1", () => {
      render(<GradientText as="h1">Heading 1</GradientText>);
      const element = screen.getByText("Heading 1");
      expect(element.tagName).toBe("H1");
    });

    it("renders as h2", () => {
      render(<GradientText as="h2">Heading 2</GradientText>);
      const element = screen.getByText("Heading 2");
      expect(element.tagName).toBe("H2");
    });

    it("renders as h3", () => {
      render(<GradientText as="h3">Heading 3</GradientText>);
      const element = screen.getByText("Heading 3");
      expect(element.tagName).toBe("H3");
    });

    it("renders as p", () => {
      render(<GradientText as="p">Paragraph</GradientText>);
      const element = screen.getByText("Paragraph");
      expect(element.tagName).toBe("P");
    });
  });

  // Variant tests (clean solid colors)
  describe("Variant Properties", () => {
    it("applies default variant with slate text", () => {
      render(<GradientText variant="default">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("text-slate-900");
    });

    it("applies primary variant", () => {
      render(<GradientText variant="primary">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("text-slate-900");
    });

    it("applies secondary variant", () => {
      render(<GradientText variant="secondary">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("text-slate-700");
    });

    it("applies accent variant with blue text", () => {
      render(<GradientText variant="accent">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("text-blue-600");
    });

    it("applies muted variant", () => {
      render(<GradientText variant="muted">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("text-slate-500");
    });
  });

  // Legacy gradient prop compatibility
  describe("Legacy Gradient Prop", () => {
    it("accepts gradient prop without error", () => {
      expect(() => render(<GradientText gradient="default">Text</GradientText>)).not.toThrow();
    });

    it("accepts gradient prop with any value", () => {
      expect(() => render(<GradientText gradient="rainbow">Text</GradientText>)).not.toThrow();
    });
  });

  // Animation tests (animate prop is kept for compatibility but ignored)
  describe("Animation (Deprecated)", () => {
    it("animate prop is accepted without error", () => {
      expect(() => render(<GradientText animate={true}>Text</GradientText>)).not.toThrow();
    });

    it("animate=false does not add animation classes", () => {
      render(<GradientText animate={false}>Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).not.toContain("animate-gradient");
    });
  });

  // Base style tests (clean typography)
  describe("Base Styles", () => {
    it("has font-semibold class", () => {
      render(<GradientText>Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("font-semibold");
    });

    it("has tracking-tight class", () => {
      render(<GradientText>Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("tracking-tight");
    });
  });

  // Weight property tests
  describe("Weight Property", () => {
    it("applies normal weight", () => {
      render(<GradientText weight="normal">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("font-normal");
    });

    it("applies medium weight", () => {
      render(<GradientText weight="medium">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("font-medium");
    });

    it("applies semibold weight (default)", () => {
      render(<GradientText weight="semibold">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("font-semibold");
    });

    it("applies bold weight", () => {
      render(<GradientText weight="bold">Text</GradientText>);
      const element = screen.getByText("Text");
      expect(element.className).toContain("font-bold");
    });
  });

  // HTML attributes tests
  describe("HTML Attributes", () => {
    it("passes custom HTML attributes", () => {
      render(
        <GradientText data-testid="heading-text" id="test-id">
          Text
        </GradientText>,
      );
      const element = screen.getByText("Text");
      expect(element).toHaveAttribute("data-testid", "heading-text");
      expect(element).toHaveAttribute("id", "test-id");
    });
  });

  // React.memo tests
  describe("Memoization", () => {
    it("does not re-render with same props", () => {
      const { rerender } = render(
        <GradientText variant="primary">Text</GradientText>,
      );

      const element = screen.getByText("Text");
      const firstRender = element;

      rerender(<GradientText variant="primary">Text</GradientText>);

      const secondRender = screen.getByText("Text");
      expect(firstRender).toBe(secondRender);
    });
  });
});
