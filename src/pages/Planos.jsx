import React from "react";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "Grátis",
    period: "/ para sempre",
    description: "Para profissionais autônomos ou pequenas validações.",
    features: [
      "Até 2 pacientes ativos",
      "Agenda básica",
      "Prontuário digital simplificado",
      "Acesso via App e Web"
    ],
    cta: "Começar Grátis",
    highlight: false,
    buttonStyle: "bg-slate-100 text-slate-900 hover:bg-slate-200"
  },
  {
    name: "Clinic Enterprise",
    price: "Sob Consulta",
    period: "",
    description: "Para clínicas e empresas que precisam de governança total.",
    features: [
      "Pacientes ilimitados",
      "Múltiplos usuários e perfis",
      "Gestão de Filiais/Multi-tenant",
      "Financeiro completo (DRE, Repasses)",
      "Gestão de Rotas e Escalas",
      "Personalização do ambiente",
      "Suporte prioritário e Onboarding",
      "Agente de IA Integrado"
    ],
    cta: "Falar com Consultor",
    highlight: true,
    buttonStyle: "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25"
  }
];

export default function Planos() {
  return (
    <main className="bg-white min-h-screen py-24 px-6">
      <div className="container-hc mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Escolha o plano ideal para sua operação
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Do profissional autônomo à grande clínica de Home Care.
            O Hausecare cresce junto com você.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 md:p-10 border transition-all duration-300 ${plan.highlight
                  ? "bg-slate-900 border-slate-800 shadow-2xl scale-105 z-10 ring-1 ring-white/10"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg"
                }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Recomendado
                </div>
              )}

              <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-4">
                <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.period}
                </span>
              </div>

              <p className={`mb-8 ${plan.highlight ? "text-slate-400" : "text-slate-600"}`}>
                {plan.description}
              </p>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? "text-emerald-400" : "text-emerald-600"}`} />
                    <span className={`text-sm ${plan.highlight ? "text-slate-300" : "text-slate-700"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="/contato"
                className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${plan.buttonStyle}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Precisa de uma solução customizada?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Para redes de franquias, grandes hospitais ou operações com necessidades específicas de integração,
            temos um time de engenharia pronto para ajudar.
          </p>
          <a href="/contato" className="text-emerald-600 font-bold hover:text-emerald-700 underline underline-offset-4">
            Entre em contato com nosso time corporativo &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
