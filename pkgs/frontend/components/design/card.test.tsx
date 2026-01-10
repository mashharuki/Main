import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GlassCard } from "./card";

/**
 * Card Component Tests
 * Updated for clean SaaS design (formerly GlassCard with glassmorphism)
 */
describe("GlassCard", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<GlassCard>Test Content</GlassCard>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <GlassCard className="custom-class">Content</GlassCard>,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  // Variant property tests
  describe("Variant Properties", () => {
    it("applies default variant with white background", () => {
      const { container } = render(
        <GlassCard variant="default">Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("bg-white");
    });

    it("applies primary variant", () => {
      const { container } = render(
        <GlassCard variant="primary">Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("bg-slate-50");
    });

    it("applies secondary variant", () => {
      const { container } = render(
        <GlassCard variant="secondary">Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("bg-emerald");
    });

    it("applies accent variant with subtle blue border", () => {
      const { container } = render(
        <GlassCard variant="accent">Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("border-blue-200");
    });
  });

  // Glow effect tests (now subtle shadow elevation)
  describe("Glow Effect (Shadow Elevation)", () => {
    it("glow=true applies stronger shadow", () => {
      const { container } = render(<GlassCard glow={true}>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("shadow-lg");
    });

    it("glow=false uses default shadow", () => {
      const { container } = render(<GlassCard glow={false}>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("shadow-sm");
    });
  });

  // Hover effect tests
  describe("Hover Effects", () => {
    it("hover=true applies hover classes", () => {
      const { container } = render(<GlassCard hover={true}>Content</GlassCard>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("hover:");
    });

    it("hover=false does not apply hover classes", () => {
      const { container } = render(
        <GlassCard hover={false}>Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toContain("hover:scale");
    });
  });

  // Interactive features tests
  describe("Interactive Features", () => {
    it("interactive=true sets tabIndex=0", () => {
      const { container } = render(
        <GlassCard interactive={true}>Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("tabIndex", "0");
    });

    it("interactive=false does not set tabIndex", () => {
      const { container } = render(
        <GlassCard interactive={false}>Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveAttribute("tabIndex");
    });

    it("with onClick handler sets role=button", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <GlassCard interactive={true} onClick={handleClick}>
          Content
        </GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("role", "button");
    });

    it("without onClick handler sets role=article", () => {
      const { container } = render(
        <GlassCard interactive={true}>Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("role", "article");
    });
  });

  // Event handler tests
  describe("Event Handlers", () => {
    it("handles click events correctly", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<GlassCard onClick={handleClick}>Content</GlassCard>);
      const card = screen.getByText("Content");
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("Enter key triggers click event (interactive=true)", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <GlassCard interactive={true} onClick={handleClick}>
          Content
        </GlassCard>,
      );
      const card = screen.getByText("Content");
      card.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("Space key triggers click event (interactive=true)", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <GlassCard interactive={true} onClick={handleClick}>
          Content
        </GlassCard>,
      );
      const card = screen.getByText("Content");
      card.focus();
      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("interactive=false does not trigger click on keyboard event", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <GlassCard interactive={false} onClick={handleClick}>
          Content
        </GlassCard>,
      );
      const card = screen.getByText("Content");
      card.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("sets aria-label correctly", () => {
      const { container } = render(
        <GlassCard aria-label="Test Label">Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("aria-label", "Test Label");
    });

    it("sets aria-describedby correctly", () => {
      const { container } = render(
        <GlassCard aria-describedby="description-id">Content</GlassCard>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("aria-describedby", "description-id");
    });
  });
});
