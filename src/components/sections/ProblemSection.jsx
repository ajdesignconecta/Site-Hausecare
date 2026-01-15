import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ICONS = {
  operational: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="#fff7e6" />
      <path d="M4 6h16M7 10h10M7 14h6M4 18h16" stroke="#f59e42" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="#f59e42" strokeWidth="1.8" />
    </svg>
  ),
  shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="#ffeaea" />
      <path d="M12 3l8 4v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4Z" stroke="#e57373" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L15.5 9.6" stroke="#e57373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  finance: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="#fff3e0" />
      <path d="M4 7h16M4 17h16" stroke="#ff7043" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="#ff7043" strokeWidth="1.8" />
      <path d="M8 12h8M8 14.8h5" stroke="#ff7043" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

const PROBLEMS = [
  {
    key: "operational",
    eyebrow: "Operação",
    title: "Falta de controle operacional",
    description:
      "Agendas desconectadas, atendimentos perdidos, produtividade difícil de medir e retrabalho constante. Exemplo: 74% das empresas relatam perda de produtividade por falta de integração dos processos.",
    stat: "74% das empresas relatam perda de produtividade por falta de integração dos processos."
  },
  {
    key: "shield",
    eyebrow: "Segurança",
    title: "Risco clínico e jurídico",
    description:
      "Evoluções alteráveis, registros sem autoria clara e ausência de rastreabilidade comprometem auditorias e confiança. Exemplo: 63% dos gestores já enfrentaram problemas jurídicos por falhas em registros clínicos.",
    stat: "63% dos gestores já enfrentaram problemas jurídicos por falhas em registros clínicos."
  },
  {
    key: "finance",
    eyebrow: "Financeiro",
    title: "Financeiro fragmentado",
    description:
      "Cobrança, despesas, folha e receitas separados dificultam visão real do lucro e tomada de decisão. Exemplo: 87% das clínicas perdem receitas por falta de visibilidade do fluxo de caixa.",
    stat: "87% das clínicas perdem receitas por falta de visibilidade do fluxo de caixa."
  },
];

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const items = useMemo(() => PROBLEMS, []);

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
      const header = el.querySelector(".problems-header");
      const cards = gsap.utils.toArray(".problem-card");

      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 38, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
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
      aria-labelledby="problem-title"
      className="relative py-12 md:py-24 bg-slate-50 overflow-hidden"
    >
      {/* Brilho suave (enterprise, não carnaval) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 380px at 18% 15%, rgba(23,76,119,0.10), transparent 58%), radial-gradient(700px 320px at 85% 60%, rgba(43,144,138,0.08), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-6 max-w-7xl">
        <header className="problems-header text-center mb-14">
          <p className="text-sm font-semibold tracking-wide text-[#174c77]">
            O que trava o crescimento
          </p>

          <h2
            id="problem-title"
            className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            A gestão de Home Care costuma falhar em pontos críticos
          </h2>

          <p className="mt-4 text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Empresas crescem, atendimentos aumentam, profissionais se multiplicam —
            mas o controle continua manual, descentralizado e vulnerável.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-3" aria-label="Principais dores do mercado">
          {items.map((p) => {
            const Icon = ICONS[p.key];

            return (
              <li
                key={p.title}
                className="problem-card group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm
                           transition hover:shadow-lg hover:-translate-y-0.5 will-change-transform"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 rounded-2xl border p-3 transition group-hover:bg-white problem-icon-bg problem-icon-bg--${p.key}`}
                  >
                    <Icon className="h-6 w-6 problem-icon" aria-hidden="true" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-wide text-slate-500">
                      {p.eyebrow}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {p.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {p.description}
                    </p>
                    <p className="mt-2 text-xs font-medium text-slate-500 problem-stat">
                      {p.stat}
                    </p>
                  </div>
                </div>

                {/* Barra sutil (assinatura premium) */}
                <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-[#174c77]/40 to-[#2b908a]/40 opacity-0 transition group-hover:opacity-100" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
