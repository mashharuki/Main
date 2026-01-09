"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Database,
  FlaskConical,
  Lock,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Card } from "@/components/design/card";
import { Heading } from "@/components/design/heading";
import { Button } from "@/components/design/button";
import { ParticleBackground } from "@/components/design/background";
import { Badge } from "@/components/ui/badge";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = React.memo(function LandingPage({
  onGetStarted,
}: LandingPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const observerOptions = React.useMemo(() => ({ threshold: 0.1 }), []);

  const handleIntersection = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate-in",
            "fade-in",
            "slide-in-from-bottom-4",
            "duration-500",
          );
        }
      });
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    const refs = [heroRef, featuresRef, techRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [handleIntersection, observerOptions]);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle gradient background */}
      <ParticleBackground />

      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Clean Header */}
      <header
        className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-sm"
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="NextMed Logo"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="text-xl font-semibold text-slate-900 tracking-tight">
              NextMed
            </span>
          </div>
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="sm"
            className="sm:hidden"
            aria-label="Get started with NextMed platform"
          >
            Start
          </Button>
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="md"
            className="hidden sm:inline-flex"
            aria-label="Get started with NextMed platform"
          >
            Get Started
            <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </header>

      <main
        id="main-content"
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 max-w-5xl"
        role="main"
      >
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="text-center mb-20 sm:mb-24 space-y-6 opacity-0"
          aria-labelledby="hero-heading"
        >
          <Badge
            variant="secondary"
            className="mb-4"
            role="status"
          >
            Powered by Midnight ZK Technology
          </Badge>
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight text-balance leading-[1.1]"
          >
            Medical Data Platform
            <br />
            <span className="text-slate-500">Without Compromising Privacy</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            NextMed uses zero-knowledge proofs to enable medical research while
            keeping patient data completely confidential. Patients earn rewards,
            researchers gain insights, institutions contribute data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              variant="primary"
              glow
              className="w-full sm:w-auto"
              aria-label="Launch NextMed platform"
            >
              Launch Platform
              <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section
          ref={featuresRef}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 sm:mb-24 opacity-0"
          aria-labelledby="features-heading"
        >
          <h2 id="features-heading" className="sr-only">
            Platform Features
          </h2>

          <Card
            variant="primary"
            hover
            className="p-6"
            aria-labelledby="patient-feature-heading"
          >
            <div
              className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4"
              aria-hidden="true"
            >
              <Users className="h-5 w-5 text-slate-700" />
            </div>
            <h3
              id="patient-feature-heading"
              className="text-lg font-semibold mb-2 text-slate-900"
            >
              For Patients
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Control your data and earn rewards
            </p>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  Manage consent for data usage
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  Earn tokens when data is used
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  Full audit trail of data access
                </span>
              </li>
            </ul>
          </Card>

          <Card
            variant="secondary"
            hover
            className="p-6"
            aria-labelledby="researcher-feature-heading"
          >
            <div
              className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4"
              aria-hidden="true"
            >
              <FlaskConical className="h-5 w-5 text-emerald-700" />
            </div>
            <h3
              id="researcher-feature-heading"
              className="text-lg font-semibold mb-2 text-slate-900"
            >
              For Researchers
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Analyze data without seeing PII
            </p>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  Query anonymized medical records
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  AI-powered analysis tools
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  SQL and natural language queries
                </span>
              </li>
            </ul>
          </Card>

          <Card
            variant="accent"
            hover
            className="p-6"
            aria-labelledby="company-feature-heading"
          >
            <div
              className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4"
              aria-hidden="true"
            >
              <Building2 className="h-5 w-5 text-blue-700" />
            </div>
            <h3
              id="company-feature-heading"
              className="text-lg font-semibold mb-2 text-slate-900"
            >
              For Companies
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Contribute data securely
            </p>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  Upload encrypted medical records
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  Earn points for contributions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-600">
                  Seamless EHR integration
                </span>
              </li>
            </ul>
          </Card>
        </section>

        {/* Technology Section */}
        <section
          ref={techRef}
          className="opacity-0"
          aria-labelledby="technology-heading"
        >
          <Card
            variant="default"
            className="p-8 lg:p-10 mb-20 sm:mb-24"
          >
            <div className="text-center mb-10">
              <h2
                id="technology-heading"
                className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
              >
                Zero-Knowledge Privacy Protection
              </h2>
              <p className="text-slate-600">
                Built on Midnight's cutting-edge ZK technology
              </p>
            </div>
            <div
              className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              role="list"
            >
              <article className="text-center space-y-3">
                <div
                  className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto"
                  aria-hidden="true"
                >
                  <Lock className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900">
                  Encrypted Storage
                </h3>
                <p className="text-sm text-slate-600">
                  All data encrypted at rest and in transit
                </p>
              </article>

              <article className="text-center space-y-3">
                <div
                  className="h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto"
                  aria-hidden="true"
                >
                  <Shield className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-slate-900">
                  ZK Proofs
                </h3>
                <p className="text-sm text-slate-600">
                  Verify data without revealing content
                </p>
              </article>

              <article className="text-center space-y-3">
                <div
                  className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto"
                  aria-hidden="true"
                >
                  <Database className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-semibold text-slate-900">
                  Confidential Computing
                </h3>
                <p className="text-sm text-slate-600">
                  Analysis in secure enclaves
                </p>
              </article>

              <article className="text-center space-y-3">
                <div
                  className="h-14 w-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto"
                  aria-hidden="true"
                >
                  <Zap className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-900">
                  Fast & Scalable
                </h3>
                <p className="text-sm text-slate-600">
                  Real-time queries on millions of records
                </p>
              </article>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="text-center space-y-6 py-12 opacity-0"
          aria-labelledby="cta-heading"
        >
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
          >
            Ready to Transform Medical Research?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join NextMed today and be part of the privacy-preserving medical
            data revolution.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            variant="accent"
            glow
            className="w-full sm:w-auto"
            aria-label="Access NextMed platform"
          >
            Access Platform
            <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
          </Button>
        </section>
      </main>

      <footer
        className="relative z-10 border-t border-slate-200 py-8 mt-16 bg-slate-50"
        role="contentinfo"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>© 2025 NextMed. Powered by Midnight ZK Technology.</p>
        </div>
      </footer>
    </div>
  );
});
