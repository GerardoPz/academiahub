import { Button } from "@/components/ui/Button";

const portada_url =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80";

/**
 * Hero section for the marketing page displaying a centered eyebrow, headline, subtitle, and call-to-action buttons over a faint background image.
 *
 * @returns A JSX element containing the hero section with eyebrow text, a two-line headline, a descriptive subtitle, and two CTA buttons ("Ver Demo" and "Ver Documentación").
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex items-center bg-surface-container-lowest"
    >
      {/* Very faint background image — no dark overlays, no solid blocks */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{ backgroundImage: `url(${portada_url})` }}
        />
      </div>

      {/* Content — fully centered, generous spacing to clear navbar */}
      <div className="relative mx-auto w-full max-w-3xl px-8 sm:px-12 pt-44 pb-32 lg:pt-56 lg:pb-40 text-center">
        {/* Eyebrow */}
        <p className="mb-6 animate-fade-in text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Sistema Integrado de Gestión Institucional
        </p>

        {/* Heading — fully legible, centered, no obstructions */}
        <h1 className="animate-fade-in-up font-headline text-4xl font-extrabold leading-[1.15] text-on-surface sm:text-5xl lg:text-[3.25rem]">
          La Nueva Era de la
          <br />
          Gestión Académica
        </h1>

        {/* Subtitle — centered with clear gap from heading */}
        <p
          className="mx-auto mt-8 max-w-lg text-base leading-[1.75] text-on-surface-variant animate-fade-in-up"
          style={{ animationDelay: "150ms" }}
        >
          Optimice procesos, asegure datos y empodere a su institución con
          nuestra infraestructura inteligente de última generación.
        </p>

        {/* Buttons — centered with clear gap from subtitle */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-5 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button variant="primary" size="lg">
            Ver Demo
          </Button>
          <Button variant="secondary" size="lg">
            Ver Documentación
          </Button>
        </div>
      </div>
    </section>
  );
}
