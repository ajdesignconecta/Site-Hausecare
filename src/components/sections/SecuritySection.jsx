import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ITEMS = [
  {
    title: "Evolução com autenticação do profissional",
    description:
      "Cada evolução é registrada com login individual e confirmação por senha, garantindo que apenas o profissional responsável possa lançar o atendimento.",
  },
  {
    title: "Registros não editáveis",
    description:
      "Após registrada, a evolução clínica não pode ser alterada, assegurando integridade, valor jurídico e confiabilidade das informações.",
  },
  {
    title: "Histórico completo e auditável",
    description:
      "Todas as ações ficam registradas no sistema, permitindo auditorias internas, controle gerencial e rastreabilidade total.",
  },
  {
    title: "Rotas por cidade e região",
    description:
      "A empresa define rotas de atendimento por cidade ou região, organizando deslocamentos dos profissionais com mais eficiência e previsibilidade.",
  },
  {
    title: "Controle total da organização",
    description:
      "A empresa define permissões, acessos, vínculos, rotas e regras operacionais para profissionais e pacientes.",
  },
  {
    title: "Segurança de dados e acesso",
    description:
      "Acesso protegido, dados centralizados e estrutura preparada para operação profissional em larga escala.",
  },
];

export default function SecuritySection() {
  const sectionRef = useRef(null);
  const items = useMemo(() => ITEMS, []);

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
      const cards = gsap.utils.toArray(".security-item");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
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
      className="py-24 bg-white"
      aria-labelledby="security-title"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="text-center mb-16">
          <h2
            id="security-title"
            className="text-3xl font-bold text-slate-900 mb-4"
          >
            Segurança, auditoria e confiabilidade
          </h2>

          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A Hausecare garante controle total da operação, da rota do profissional
            ao registro clínico e ao impacto financeiro.
          </p>

          {/* Selo “compliance-ready” (discreto, sem prometer certificações) */}
          <div className="mt-5 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              <span
                className="inline-flex h-2 w-2 rounded-full bg-[#174c77]"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-slate-700">
                Trilha de auditoria e autoria garantida
              </span>
              <span className="text-xs text-slate-500">
                (para processos e fiscalização)
              </span>
            </div>
          </div>
        </header>

        <ul
          className="grid md:grid-cols-2 gap-8"
          aria-label="Recursos de segurança e auditoria"
        >
          {items.map((item) => (
            <li
              key={item.title}
              className="security-item border border-slate-200 rounded-xl p-6 transition will-change-transform
                         hover:shadow-md hover:-translate-y-0.5"
            >
              <h3 className="font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
