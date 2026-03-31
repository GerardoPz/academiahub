import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { CTA } from "@/components/marketing/CTA";

/**
 * Renders the marketing landing page composed of the Hero, Features, and CTA sections.
 *
 * @returns A JSX element containing the landing page layout
 */
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <CTA />
    </>
  );
}
