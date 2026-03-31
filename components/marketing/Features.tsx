import { Card, CardIcon, CardTitle, CardDescription } from "@/components/ui/Card";

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Seguridad RLS",
    description:
      "Privacidad total a nivel de registro, garantizando que cada usuario acceda solo a lo que le corresponde mediante políticas de Row Level Security.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </svg>
    ),
    title: "Automatización SQL",
    description:
      "Optimice tiempos mediante triggers inteligentes y orquestación de datos sin intervención manual, reduciendo errores operativos.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
    ),
    title: "Escalabilidad Serverless",
    description:
      "Infraestructura elástica que crece con su institución, adaptándose sin fricciones desde 100 hasta 1,000,000 de estudiantes concurrentes.",
  },
];

export function Features() {
  return (
    <section id="modulos" className="relative py-28 lg:py-36">
      {/* Tonal background shift for section boundary (no borders per design system) */}
      <div className="absolute inset-0 bg-surface-container-low" />

      <div className="relative mx-auto max-w-6xl px-8 sm:px-12">
        {/* Section header — asymmetric balance with generous spacing */}
        <div className="mb-20 max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Módulos Principales
          </p>
          <h2 className="font-headline text-3xl font-bold text-on-surface sm:text-4xl">
            Arquitectura de Grado Industrial
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-on-surface-variant">
            Potenciada por las tecnologías más robustas del mercado actual.
          </p>
        </div>

        {/* Feature grid — wider gaps between cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} hover>
              <CardIcon>{feature.icon}</CardIcon>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
