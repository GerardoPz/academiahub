import { Button } from "@/components/ui/Button";

/**
 * Renders a centered, responsive call-to-action section in Spanish promoting SIGI.
 *
 * @returns The CTA section as a JSX element containing a headline, supporting paragraph, decorative gradient orbs, and two action buttons ("Comenzar Ahora" and "Contactar Ventas").
 */
export function CTA() {
  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-8 sm:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-academic-gradient px-10 py-20 text-center sm:px-20 lg:py-24">
          {/* Decorative orbs */}
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-on-primary/5 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-on-primary/5 blur-2xl" />

          <div className="relative z-10">
            <h2 className="font-headline text-2xl font-bold text-on-primary sm:text-3xl">
              ¿Listo para transformar su institución?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-[1.75] text-on-primary/80">
              Únase a las academias que ya están definiendo el futuro de la
              educación digital con SIGI.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Button
                variant="primary"
                size="lg"
                className="bg-on-primary text-primary hover:bg-on-primary/90 bg-none"
              >
                Comenzar Ahora
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="border-on-primary/30 text-on-primary hover:bg-on-primary/10"
              >
                Contactar Ventas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
