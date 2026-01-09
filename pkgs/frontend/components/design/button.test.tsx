import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NeonButton } from "./button";

/**
 * Button Component Tests
 * Updated for clean SaaS design (formerly NeonButton with neon glow effects)
 */
describe("NeonButton", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<NeonButton>Button Text</NeonButton>);
      expect(screen.getByText("Button Text")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<NeonButton className="custom-class">Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button).toHaveClass("custom-class");
    });

    it("renders as a button HTML element", () => {
      render(<NeonButton>Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button.tagName).toBe("BUTTON");
    });
  });

  // Variant property tests
  describe("Variant Properties", () => {
    it("applies primary variant (default) with slate background", () => {
      render(<NeonButton variant="primary">Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button.className).toContain("bg-slate-900");
    });

    it("applies secondary variant with outline style", () => {
      render(<NeonButton variant="secondary">Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button.className).toContain("border-slate-200");
    });

    it("applies accent variant with blue background", () => {
      render(<NeonButton variant="accent">Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button.className).toContain("bg-blue-600");
    });
  });

  // Size property tests
  describe("Size Properties", () => {
    it("applies sm size", () => {
      render(<NeonButton size="sm">Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button.className).toContain("h-8");
    });

    it("applies md size (default)", () => {
      render(<NeonButton size="md">Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button.className).toContain("h-10");
    });

    it("applies lg size", () => {
      render(<NeonButton size="lg">Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button.className).toContain("h-12");
    });
  });

  // Glow effect tests (now subtle shadow)
  describe("Glow Effect (Shadow)", () => {
    it("glow=true applies stronger shadow on primary", () => {
      render(
        <NeonButton variant="primary" glow={true}>
          Button
        </NeonButton>,
      );
      const button = screen.getByText("Button");
      expect(button.className).toContain("shadow-lg");
    });

    it("glow=true applies stronger shadow on accent", () => {
      render(
        <NeonButton variant="accent" glow={true}>
          Button
        </NeonButton>,
      );
      const button = screen.getByText("Button");
      expect(button.className).toContain("shadow-lg");
    });
  });

  // Pulse animation tests (removed in clean design)
  describe("Pulse Animation (Deprecated)", () => {
    it("pulse prop is accepted without error", () => {
      expect(() => render(<NeonButton pulse={true}>Button</NeonButton>)).not.toThrow();
    });

    it("pulse=false does not add animation classes", () => {
      render(<NeonButton pulse={false}>Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button.className).not.toContain("animate-pulse");
    });
  });

  // Loading state tests
  describe("Loading State", () => {
    it("loading=true disables the button", () => {
      render(<NeonButton loading={true}>Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button).toBeDisabled();
    });

    it("loading=true sets aria-busy attribute", () => {
      render(<NeonButton loading={true}>Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("loading=true shows screen reader text", () => {
      render(<NeonButton loading={true}>Button</NeonButton>);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("loading=false maintains normal state", () => {
      render(<NeonButton loading={false}>Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "false");
    });
  });

  // Disabled state tests
  describe("Disabled State", () => {
    it("disabled=true disables the button", () => {
      render(<NeonButton disabled={true}>Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button).toBeDisabled();
    });

    it("disabled=true sets aria-disabled attribute", () => {
      render(<NeonButton disabled={true}>Button</NeonButton>);
      const button = screen.getByText("Button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });
  });

  // Event handler tests
  describe("Event Handlers", () => {
    it("handles click events correctly", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<NeonButton onClick={handleClick}>Button</NeonButton>);
      const button = screen.getByText("Button");
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disabled state does not fire click events", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <NeonButton disabled={true} onClick={handleClick}>
          Button
        </NeonButton>,
      );
      const button = screen.getByText("Button");
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("loading state does not fire click events", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <NeonButton loading={true} onClick={handleClick}>
          Button
        </NeonButton>,
      );
      const button = screen.getByText("Button");
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("sets aria-label correctly", () => {
      render(<NeonButton aria-label="Submit Button">Submit</NeonButton>);
      const button = screen.getByText("Submit");
      expect(button).toHaveAttribute("aria-label", "Submit Button");
    });

    it("is focusable", () => {
      render(<NeonButton>Button</NeonButton>);
      const button = screen.getByText("Button");
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  // prefers-reduced-motion tests
  describe("prefers-reduced-motion", () => {
    it("respects reduced motion preferences", async () => {
      const matchMediaMock = vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      window.matchMedia = matchMediaMock;

      render(<NeonButton pulse={true}>Button</NeonButton>);
      const button = screen.getByText("Button");

      await waitFor(() => {
        // With reduced motion, pulse animation should not be applied
        expect(button.className).not.toContain("animate-pulse");
      });
    });
  });
});
