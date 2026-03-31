"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Módulos", href: "#modulos" },
  { label: "Soporte", href: "#soporte" },
  { label: "Documentación", href: "#docs" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-academic-gradient text-on-primary text-xs font-bold">
            A
          </span>
          <span className="font-headline text-lg font-bold tracking-tight text-primary">
            AcademiaHub
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Iniciar Sesión
            </Button>
          </Link>
          <Button variant="primary" size="sm">
            Acceder al SIGI
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Abrir menú"
        >
          <span
            className={`block h-0.5 w-5 bg-on-surface transition-transform duration-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-on-surface transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-on-surface transition-transform duration-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 px-6 pt-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-on-surface-variant hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex flex-col gap-2 w-full pt-2">
            <Button variant="secondary" size="sm" className="w-full">
              Iniciar Sesión
            </Button>
            <Button variant="primary" size="sm" className="w-full">
              Acceder al SIGI
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
