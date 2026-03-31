"use client";

import { login } from '@/lib/supabase/login-action'
import { useSearchParams } from 'next/navigation'

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const roles = ["Estudiante", "Profesor", "Administrador"] as const;
type Role = (typeof roles)[number];

/* ── Inline SVG icons ── */
const UserIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowRightIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeRole, setActiveRole] = useState<Role>("Estudiante");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsLoading(true);

  console.log("1. Iniciando proceso de login...");

  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    console.log("2. Enviando datos a la Server Action:", email);

    // Llamamos a la acción
    const response = await login(formData);

    // Si modificaste el login-action para retornar un objeto (paso anterior):
    console.log("3. Respuesta recibida del servidor:", response);

    if (response?.success) {
      console.log("4. Éxito total. Redirigiendo manualmente...");
      window.location.href = '/dashboard';
    } else {
      console.error("4. El servidor respondió con error:", response?.message);
      alert("Error: " + response?.message);
      setIsLoading(false);
    }

  } catch (error) {
    console.error("❌ ERROR CRÍTICO EN EL CLIENTE:", error);
    setIsLoading(false);
  }
}

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* ── Role tabs ── */}
      <div className="mb-6 flex rounded-xl bg-surface-container-high/50 p-1">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setActiveRole(role)}
            className={`flex-1 rounded-lg py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              activeRole === role
                ? "bg-surface-container-lowest text-on-surface shadow-sm"
                : "text-outline hover:text-on-surface-variant"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          id="email"
          type="email"
          label="EMAIL O ID INSTITUCIONAL"
          placeholder="p. ej. estudiante@academia.edu"
          iconLeft={UserIcon}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          id="password"
          type="password"
          label="CONTRASEÑA"
          placeholder="•••••••••••••"
          iconLeft={LockIcon}
          togglePassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="mt-2 w-full flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? "INGRESANDO..." : "INICIAR SESIÓN"}
          {!isLoading && ArrowRightIcon}
        </Button>

        {/* Forgot password */}
        <div className="text-center mt-2">
          <a
            href="#"
            className="text-[10px] font-bold uppercase tracking-wide text-primary/80 hover:text-primary transition-colors"
          >
            ¿OLVIDASTE TU CONTRASEÑA?
          </a>
        </div>
      </form>

      {/* Divider */}
      <div className="flex justify-center mt-6 mb-6">
         <div className="h-px w-10 bg-outline-variant/30" />
      </div>

      {/* ── Secondary link ── */}
      <p className="text-center text-[11px] font-medium text-on-surface-variant">
        ¿Eres nuevo?{" "}
        <a
          href="#"
          className="font-bold text-primary hover:text-primary-container transition-colors"
        >
          Contacta a Registro
        </a>
      </p>
    </div>
  );
}

