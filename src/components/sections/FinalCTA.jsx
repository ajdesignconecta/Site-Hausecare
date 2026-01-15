import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FinalCTA() {
  const sectionRef = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    if (!el) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden py-28 text-white bg-gradient-hc"
    >
      {/* Brilho premium (sutil, saúde-tech) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 400px at 20% 20%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(700px 350px at 80% 60%, rgba(255,255,255,0.14), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Grid discreta (textura enterprise) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden="true"
      />

      <div className="relative container-hc max-w-5xl text-center">
        <header className="mb-10">
          <h2 id="final-cta-title" className="text-3xl font-bold mb-4">
            Leve mais controle, segurança e eficiência para sua operação
          </h2>

          <p className="text-white/90 max-w-3xl mx-auto leading-relaxed">
            Conheça na prática como a Hausecare pode organizar sua operação de
            home care, garantir rastreabilidade clínica e transformar dados em
            decisões seguras para o crescimento da sua empresa.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/5561991519369"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hc btn-hc-primary"
            aria-label="Solicitar demonstração da Hausecare pelo WhatsApp"
          >
            Solicitar demonstração
          </a>

          <a
            href="/funcionalidades"
            className="btn-hc btn-hc-ghost"
            aria-label="Ver funcionalidades da Hausecare"
          >
            Ver funcionalidades
          </a>
        </div>
      </div>
    </section>
  );
}
