"use client";

import { NeonButton } from "./button";

/**
 * NeonButton デモコンポーネント
 *
 * NeonButtonの使用例を示すデモページ
 */
export function NeonButtonDemo() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            NeonButton Component Demo
          </h1>
          <p className="text-slate-500 text-lg">
            ネオングロー効果を持つボタンコンポーネント
          </p>
        </div>

        {/* Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <NeonButton variant="primary">Primary Button</NeonButton>
            <NeonButton variant="secondary">Secondary Button</NeonButton>
            <NeonButton variant="accent">Accent Button</NeonButton>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <NeonButton size="sm" variant="primary">
              Small
            </NeonButton>
            <NeonButton size="md" variant="primary">
              Medium
            </NeonButton>
            <NeonButton size="lg" variant="primary">
              Large
            </NeonButton>
          </div>
        </section>

        {/* Glow Effect */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Glow Effect</h2>
          <div className="flex flex-wrap gap-4">
            <NeonButton variant="primary" glow>
              Primary with Glow
            </NeonButton>
            <NeonButton variant="secondary" glow>
              Secondary with Glow
            </NeonButton>
            <NeonButton variant="accent" glow>
              Accent with Glow
            </NeonButton>
          </div>
        </section>

        {/* Pulse Animation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Pulse Animation
          </h2>
          <div className="flex flex-wrap gap-4">
            <NeonButton variant="primary" pulse>
              Pulsing Primary
            </NeonButton>
            <NeonButton variant="secondary" pulse>
              Pulsing Secondary
            </NeonButton>
            <NeonButton variant="accent" pulse>
              Pulsing Accent
            </NeonButton>
          </div>
        </section>

        {/* Combined Effects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Combined Effects (Glow + Pulse)
          </h2>
          <div className="flex flex-wrap gap-4">
            <NeonButton variant="primary" glow pulse>
              Primary CTA
            </NeonButton>
            <NeonButton variant="secondary" glow pulse>
              Secondary CTA
            </NeonButton>
            <NeonButton variant="accent" glow pulse>
              Accent CTA
            </NeonButton>
          </div>
        </section>

        {/* Disabled State */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Disabled State
          </h2>
          <div className="flex flex-wrap gap-4">
            <NeonButton variant="primary" disabled>
              Disabled Primary
            </NeonButton>
            <NeonButton variant="secondary" disabled>
              Disabled Secondary
            </NeonButton>
            <NeonButton variant="accent" disabled>
              Disabled Accent
            </NeonButton>
          </div>
        </section>

        {/* With Icons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <NeonButton variant="primary" glow>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Lightning icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Get Started
            </NeonButton>
            <NeonButton variant="secondary" glow>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Plus icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New
            </NeonButton>
            <NeonButton variant="accent" glow pulse>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Arrow right icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              Continue
            </NeonButton>
          </div>
        </section>

        {/* Usage Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Usage Example
          </h2>
          <div className="bg-slate-100 rounded-lg p-6 border border-slate-200">
            <pre className="text-sm text-slate-600 overflow-x-auto">
              <code>{`import { NeonButton } from "@/components/design/button";

// Basic usage
<NeonButton variant="primary">
  Click me
</NeonButton>

// With glow and pulse (CTA button)
<NeonButton variant="accent" glow pulse>
  Get Started
</NeonButton>

// Different sizes
<NeonButton size="sm" variant="secondary">
  Small Button
</NeonButton>

// With onClick handler
<NeonButton 
  variant="primary" 
  onClick={() => console.log("Clicked!")}
>
  Action Button
</NeonButton>`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
