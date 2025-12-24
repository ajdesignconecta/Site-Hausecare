import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DIFFERENTIALS = [
  {
    title: "Evolução clínica com autoria garantida",
    description:
      "As evoluções são registradas exclusivamente pelo profissional responsável, com rastreabilidade completa e impossibilidade de edição posterior, garantindo segurança clínica e jurídica.",
  },
  {
    title: "Gestão orientada por operação real",
    description:
      "A Hausecare não é um sistema de cadastro. Ela organiza pacientes, profissionais, planos terapêuticos, rotas e atendimentos de forma integrada ao dia a dia da operação.",
  },
  {
    title: "Financeiro conectado à produção",
    description:
      "Receitas, despesas, cobranças, folha de pagamento e DRE são alimentados automaticamente pela produção real dos atendimentos.",
  },
  {
    title: "Controle total da organização",
    description:
      "A empresa tem visão completa de profissionais, pacientes, produtividade, materiais, insumos e indicadores financeiros em um único ambiente.",
  },
  {
    title: "Rotas e agenda inteligentes",
    description:
      "Criação de rotas por cidade e região, otimizando deslocamentos e garantindo eficiência no atendimento domiciliar.",
  },
  {
    title: "Sistema pensado para escalar",
    description:
      "Arquitetura preparada para crescimento, múltiplas equipes, unidades e aumento de volume sem perda de controle.",
  },
];

  const sectionRef = useRef(null);
  const differentials = useMemo(() => DIFFERENTIALS, []);
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
      const cards = gsap.utils.toArray(".diff-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
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
      className="py-28 bg-white"
      aria-labelledby="hausecare-differentials-title"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="text-center mb-20">
          <h2
            id="hausecare-differentials-title"
            className="text-3xl font-bold text-slate-900 mb-4"
          >
            Por que a Hausecare é diferente
          </h2>

          <p className="text-slate-600 max-w-4xl mx-auto">
            A Hausecare foi construída para resolver problemas reais da operação
            de home care, indo além do básico e entregando controle, segurança e
            inteligência para a gestão.
          </p>
        </header>

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          aria-label="Diferenciais do sistema Hausecare"
        >
          {differentials.map((item) => (
            <li
              key={item.title}
              className="diff-card bg-slate-50 border border-slate-200 rounded-2xl p-6 transition will-change-transform
                         hover:shadow-lg hover:-translate-y-0.5"
            >
              <h3 className="font-semibold text-slate-900 mb-3">
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
