import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    title: "Cadastro do paciente",
    description:
      "A empresa registra o paciente com todos os dados clínicos e administrativos necessários.",
  },
  {
    title: "Plano terapêutico",
    description:
      "A organização define o plano de cuidados, frequência, especialidades e metas clínicas.",
  },
  {
    title: "Vinculação do profissional",
    description:
      "O profissional adequado é vinculado ao paciente conforme o plano terapêutico.",
  },
  {
    title: "Execução do atendimento",
    description:
      "O profissional realiza o atendimento conforme agenda e diretrizes definidas.",
  },
  {
    title: "Registro da evolução",
    description:
      "A evolução é registrada com senha do profissional e não pode ser alterada.",
  },
  {
    title: "Financeiro automatizado",
    description:
      "Atendimentos impactam automaticamente cobrança, folha, despesas e DRE.",
  },
];

export default function FlowSection() {
  const sectionRef = useRef(null);
  const steps = useMemo(() => STEPS, []);
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
      const items = gsap.utils.toArray(".flow-step");
      gsap.fromTo(
        items,
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
      className="py-24 bg-slate-50"
      aria-labelledby="flow-section-title"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="text-center mb-16">
          <h2
            id="flow-section-title"
            className="text-3xl font-bold text-slate-900 mb-4"
          >
            Como funciona na prática
          </h2>

          <p className="text-slate-600 max-w-3xl mx-auto">
            Um fluxo simples, seguro e totalmente controlado pela empresa, do
            cadastro do paciente ao fechamento financeiro.
          </p>
        </header>

        <ol className="grid gap-6" aria-label="Fluxo de operação da Hausecare">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flow-step bg-white rounded-xl p-6 border border-slate-200 flex gap-4 items-start
                         transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full bg-[#174c77] text-white flex items-center justify-center font-bold"
                aria-hidden="true"
              >
                {index + 1}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
