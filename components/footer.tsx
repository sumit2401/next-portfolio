"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-8 font-mono text-[9px] text-white/20 uppercase tracking-[0.5em] flex flex-col items-center gap-8 bg-transparent">

      {/* Visual Divider */}
      <div className="w-20 h-[1px] bg-white/5" />

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com"
            target="_blank"
            className="hover:text-[#7c3aed] transition-colors duration-300"
          >
            GitHub
          </Link>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-[#7c3aed] transition-colors duration-300"
          >
            LinkedIn
          </Link>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <Link
            href="mailto:sp4440793@gmail.com"
            className="hover:text-[#7c3aed] transition-colors duration-300"
          >
            Email
          </Link>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="font-black italic opacity-60">
            Crafted in India / Digital Artifact v1.0
          </p>
          <p className="opacity-30">
            © {currentYear} Sumit Patel — Secure Connection Established
          </p>
        </div>
      </div>
    </footer>
  );
}
