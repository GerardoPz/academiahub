import Link from "next/link";

const footerLinks = [
  { label: "Privacidad", href: "#" },
  { label: "Términos", href: "#" },
  { label: "Contacto Soporte", href: "#" },
];

/**
 * Renders the site footer containing brand information, a list of navigation links, and a system status row.
 *
 * @returns The rendered footer element as JSX.
 */
export function Footer() {
  return (
    <footer className="bg-surface-container-low py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-academic-gradient text-on-primary text-xs font-bold">
                A
              </span>
              <span className="font-headline text-base font-bold text-primary">
                AcademiaHub
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-on-surface-variant">
              Sistema Integrado de Gestión Institucional.
              <br />
              Excelencia en Gestión Académica.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-on-surface-variant transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-outline">
            © {new Date().getFullYear()} Sistema Integrado de Gestión
            Institucional.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-outline">
              Estado del Sistema: Operativo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
