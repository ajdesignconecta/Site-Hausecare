import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BLOCKS = [
  {
    title: "Agenda inteligente de atendimentos",
    description:
      "Visualize e gerencie atendimentos por dia, mês e ano. Organize profissionais por agenda, rota e disponibilidade.",
  },
  {
    title: "Gestão de pacientes e planos terapêuticos",
    description:
      "Cadastre pacientes, crie planos terapêuticos personalizados e vincule profissionais com controle total da execução.",
  },
  {
    title: "Controle de profissionais",
    description:
      "Gerencie acessos, vínculos, produtividade, rotas, permissões e histórico de atendimentos dos profissionais.",
  },
  {
    title: "Rotas e deslocamentos",
    description:
      "Crie rotas por cidade e região, organize deslocamentos e aumente a eficiência operacional da equipe em campo.",
  },
  {
    title: "Financeiro integrado",
    description:
      "Controle receitas, despesas, cobranças, extratos e fluxo de caixa em um único painel.",
  },
  {
    title: "DRE e centro de custos",
    description:
      "Acompanhe DRE, centros de custos e desempenho financeiro com visão clara e estratégica do negócio.",
  },
  {
    title: "Folha de pagamento e produtividade",
    description:
      "Relacione atendimentos realizados com produtividade, pagamentos e indicadores de performance.",
  },
  {
    title: "Materiais e insumos",
    description:
      "Gerencie materiais e insumos vinculados aos planos terapêuticos e aos atendimentos realizados.",
  },
];

export default function ManagementSection() {
  const sectionRef = useRef(null);
  const blocks = useMemo(() => BLOCKS, []);

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
      const cards = gsap.utils.toArray(".management-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.10,
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
      className="py-28 bg-slate-50"
      aria-labelledby="management-title"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="text-center mb-20">
          <h2
            id="management-title"
            className="text-3xl font-bold text-slate-900 mb-4"
          >
            Gestão completa em um único lugar
          </h2>

          <p className="text-slate-600 max-w-4xl mx-auto">
            Da criação do paciente ao faturamento final, a Hausecare centraliza
            toda a operação do home care com controle, segurança e inteligência.
          </p>
          <div className="mt-8">
            <a
              href="/funcionalidades"
              className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Ver módulos
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        </header>

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          aria-label="Módulos de gestão da Hausecare"
        >
          {blocks.map((item) => (
            <li
              key={item.title}
              className="management-card group relative bg-white border border-slate-200 rounded-2xl p-6 transition will-change-transform
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
