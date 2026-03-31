import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

/* ── Certification badge icons ── */
const ShieldIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ComplianceIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
    <path d="m18 6-2-2H8L6 6" />
    <path d="M12 2v4" />
    <rect x="2" y="6" width="20" height="4" rx="1" />
    <path d="M4 10v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M12 10v10" />
  </svg>
);

const CloudSyncIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    <path d="m14 14-2-2-2 2" />
    <path d="M12 12v6" />
  </svg>
);

export default function LoginPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-10 overflow-auto"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #eff3f8 0%, #f7f9fc 50%, #ffffff 100%)",
      }}
    >
      <div className="w-full max-w-md flex flex-col items-center">
        {/* ── Brand ── */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            {/* Graduation shield icon */}
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] bg-[#0a1b3f] shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5" />
              </svg>
            </div>
            <h1 className="text-[32px] font-bold tracking-tight text-[#0a1b3f] mt-1">
              AcademiaHub
            </h1>
          </Link>
          <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-gray-500 font-medium">
            Institutional Management System
          </p>
        </div>

        {/* ── Center: login card ── */}
        <div className="w-full rounded-[20px] bg-white px-7 py-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:px-10 sm:py-10">
          <LoginForm />
        </div>

        {/* ── Bottom: certifications + footer ── */}
        <footer className="w-full mt-12 flex flex-col items-center">
          {/* Certifications */}
          <div className="flex items-center justify-center gap-8 sm:gap-14">
            <div className="flex flex-col items-center gap-2 text-gray-500">
              {ShieldIcon}
              <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                Secure Access
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-gray-500">
              {ComplianceIcon}
              <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                Compliance
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-gray-500">
              {CloudSyncIcon}
              <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                Cloud Sync
              </span>
            </div>
          </div>

          {/* Legal links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Help Desk</a>
          </div>

          {/* Copyright */}
          <div className="mt-5 text-center flex flex-col items-center text-gray-400 text-[9px] font-bold uppercase tracking-wider">
            <p className="text-[#0a1b3f] font-bold capitalize text-sm mb-1 tracking-normal">AcademiaHub</p>
            <p className="tracking-[0.08em]">
              AcademiaHub v2.4.0 • Institutional Management System
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
