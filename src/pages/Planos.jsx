import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X } from "lucide-react";
import FinalCTA from "../components/sections/FinalCTA";

try {
  gsap.registerPlugin(ScrollTrigger);
} catch (e) { }

const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Comece com controle básico",
    price: "Grátis",
    period: "para sempre",
    highlight: false,
    cta: { label: "Criar conta grátis", href: "https://app.hausecare.com.br/auth/register" },
    features: [],
  },
  {
    id: "essencial",
    name: "Clinic Essential",
    tagline: "Operação organizada e rastreável",
    price: "Sob consulta",
    period: "",
    highlight: false,
    cta: { label: "Agendar Demonstração", href: "#contato" },
    features: [
      "Até 10 profissionais ativos",
      "Pacientes, Financeiro, DRE, Folha de pagamento, Agenda, rotas e Estoque tudo ilimitado",
    ],
  },
  {
    id: "pro",
    name: "Clinic Professional",
    tagline: "Performance + relatórios avançados",
    price: "Sob consulta",
    period: "",
    highlight: true,
    cta: { label: "Agendar Demonstração", href: "#contato" },
    features: [
      "Até 35 profissionais ativos",
      "Pacientes, Financeiro, DRE, Folha de pagamento, Agenda, rotas e Estoque tudo ilimitado",
    ],
  },
  {
    id: "enterprise",
    name: "Clinic Enterprise",
    tagline: "Governança, permissões e escala",
    price: "Sob consulta",
    period: "",
    highlight: false,
    cta: { label: "Agendar Demonstração", href: "#contato" },
    features: [
      "Até 50 profissionais ativos",
      "Pacientes, Financeiro, DRE, Folha de pagamento, Agenda, rotas e Estoque tudo ilimitado",
    ],
  },
];

const FEATURES = [
  {
    category: "Operação",
    items: [
      { name: "Agenda, atendimentos e status em tempo real", free: true, essencial: true, pro: true, enterprise: true },
      { name: "Rotas e deslocamentos (visão por dia e profissional)", free: true, essencial: true, pro: true, enterprise: true },
    ]
  },
  {
    category: "Clínico",
    items: [
      { name: "Prontuário digital e plano terapêutico por paciente", free: true, essencial: true, pro: true, enterprise: true },
      { name: "Evolução protegida por senha do atendimento", free: true, essencial: true, pro: true, enterprise: true },
    ]
  },
  {
    category: "Financeiro",
    items: [
      { name: "Receitas, despesas, extrato e visão consolidada", free: false, essencial: true, pro: true, enterprise: true },
      { name: "DRE gerencial e centros de custos", free: false, essencial: true, pro: true, enterprise: true },
      { name: "Folha de pagamento por profissional / período", free: false, essencial: true, pro: true, enterprise: true },
      { name: "Exportação CSV para conciliação e análise", free: true, essencial: true, pro: true, enterprise: true },
    ]
  },
  {
    category: "Gestão",
    items: [
      { name: "Gestão de equipe e convites de profissionais", free: true, essencial: true, pro: true, enterprise: true },
      { name: "Relatórios avançados (produtividade, SLA, qualidade)", free: false, essencial: true, pro: true, enterprise: true },
    ]
  },
  {
    category: "Segurança & Governança",
    items: [
      { name: "Acesso a evolução do paciente assinada pelo profissional", free: true, essencial: true, pro: true, enterprise: true },
    ]
  },
  {
    category: "Suporte",
    items: [
      { name: "Onboarding e suporte para implantação", free: false, essencial: true, pro: true, enterprise: true },
    ]
  },
];

export default function PlansSection() {
  const rootRef = useRef(null);
  const [viewMode, setViewMode] = useState("cards"); // "cards" ou "table"

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(".pl-in", { autoAlpha: 0, y: 20 });
      gsap.set(".pl-card", { autoAlpha: 0, y: 30 });

      gsap.to(".pl-in", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 75%" },
      });

      gsap.to(".pl-card", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section
        ref={rootRef}
        id="planos"
        aria-labelledby="plans-title"
        className="py-20 md:py-28 bg-slate-50"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-16 md:mb-20">
            <div className="pl-in inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 border border-emerald-200 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Planos e Preços
            </div>

            <h2
              id="plans-title"
              className="pl-in text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Escolha o plano ideal para sua operação
            </h2>

            <p className="pl-in text-slate-600 max-w-2xl mx-auto">
              Do profissional autônomo à grande clínica. Compare recursos e evolua conforme sua equipe cresce.
            </p>
          </header>

          {/* Cards de Planos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`pl-card relative rounded-3xl p-6 md:p-8 transition-all duration-300 ${plan.highlight
                  ? "bg-slate-900 border-2 border-slate-800 shadow-2xl scale-100 md:scale-105 lg:scale-110 z-10 mt-6 md:mt-0 max-w-[90%] mx-auto md:max-w-none"
                  : "bg-white border-2 border-slate-200 hover:border-emerald-300 hover:shadow-xl"
                  }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
                    Recomendado
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlight ? "text-slate-400" : "text-slate-600"}`}>
                    {plan.tagline}
                  </p>
                </div>

                <div className="mb-8">
                  <div className={`text-4xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </div>
                  {plan.period && (
                    <div className={`text-sm ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>
                      {plan.period}
                    </div>
                  )}
                </div>

                {/* Features list */}
                {plan.features && plan.features.length > 0 && (
                  <ul className="mb-8 space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={plan.cta.href}
                  className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${plan.highlight
                    ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                >
                  {plan.cta.label}
                </a>
              </div>
            ))}
          </div>

          {/* Comparação Detalhada - Hidden on mobile, visible on tablet+ */}
          <div className="pl-in max-md:hidden bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
            <div className="px-6 md:px-10 py-8 border-b-2 border-slate-200 bg-slate-50">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Comparação detalhada de recursos
              </h3>
              <p className="text-slate-600">
                Veja exatamente o que cada plano oferece para sua operação
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Desktop: Header da tabela */}
                <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 md:px-10 py-6 bg-slate-50 border-b-2 border-slate-200">
                  <div className="font-bold text-slate-900 text-lg">Recursos</div>
                  {PLANS.map((plan) => (
                    <div key={plan.id} className="text-center">
                      <div className="font-bold text-slate-900 text-lg">{plan.name}</div>
                    </div>
                  ))}
                </div>

                {/* Features por categoria */}
                {FEATURES.map((category, catIdx) => (
                  <div key={category.category}>
                    {/* Categoria Header */}
                    <div className="px-6 md:px-10 py-4 bg-slate-100 border-b border-slate-200">
                      <h4 className="font-bold text-slate-900 text-base md:text-lg">{category.category}</h4>
                    </div>

                    {/* Items da categoria */}
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 md:px-10 py-5 border-b border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        {/* Nome do recurso */}
                        <div className="md:col-span-1">
                          <p className="text-slate-900 font-medium text-sm md:text-base leading-relaxed">
                            {item.name}
                          </p>
                        </div>

                        {/* Checks / X para cada plano - Desktop */}
                        <div className="hidden md:contents">
                          {PLANS.map((plan) => (
                            <div key={plan.id} className="flex items-center justify-center">
                              {item[plan.id] ? (
                                <Check className="w-6 h-6 text-emerald-500" strokeWidth={3} />
                              ) : (
                                <X className="w-6 h-6 text-slate-300" strokeWidth={2} />
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Mobile: Lista de planos */}
                        <div className="md:hidden grid grid-cols-4 gap-2 mt-3">
                          {PLANS.map((plan) => (
                            <div key={plan.id} className="text-center">
                              <div className="text-xs font-semibold text-slate-600 mb-1">{plan.name}</div>
                              {item[plan.id] ? (
                                <Check className="w-5 h-5 text-emerald-500 mx-auto" strokeWidth={3} />
                              ) : (
                                <X className="w-5 h-5 text-slate-300 mx-auto" strokeWidth={2} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA - Always visible */}
          <div className="pl-in bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden mt-8">
            <div className="px-6 md:px-10 py-8 bg-slate-50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-slate-600 text-sm md:text-base">
                    Tem dúvidas sobre qual plano escolher?
                  </p>
                  <p className="text-slate-900 font-bold text-base md:text-lg mt-1">
                    Nossa equipe pode ajudar você a decidir
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <a
                    href="#contato"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-8 py-4 text-base font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Falar com Consultor
                  </a>
                  <a
                    href="#inicio"
                    className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 text-base font-bold hover:bg-slate-50 transition-all"
                  >
                    Voltar ao Topo
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trust line */}
          <div className="pl-in mt-8 text-center text-sm text-slate-500">
            <p>Tempo real • Prontuário digital • Agenda & Rotas • Financeiro integrado</p>
          </div>
        </div>
      </section>

      <div className="mt-0">
        <FinalCTA />
      </div>
    </main>
  );
}
