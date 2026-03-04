import React from "react";
import SEO from "../components/SEO";

const plans = [
  {
    id: "free",
    name: "Free",
    badge: "Comece agora",
    professionals: "ate 3 profissionais ativos",
    price: "R$ 0,00",
    description:
      "Para autonomos e testes iniciais. Organize atendimentos, rotas e pacientes com a tecnologia da Hausecare.",
    items: [
      "Profissionais independentes",
      "Testes iniciais",
      "Primeira experiencia com gestao digital",
      "Gestao de pacientes",
      "Rotas e atendimentos",
    ],
    buttonLabel: "Cadastre-se Gratuitamente",
    buttonHref: "https://app.hausecare.com.br/auth/register/company",
    note: "Pode afetar o acesso de profissionais existentes",
  },
  {
    id: "essential",
    name: "Clinic Essential",
    badge: "Para comecar com ordem",
    professionals: "ate 10 profissionais ativos",
    price: "R$ 249,90",
    description:
      "Para clinicas pequenas que querem organizar a operacao. Rotas claras, agenda previsivel e produtividade maior.",
    items: [
      "Clinicas pequenas",
      "Operacao em crescimento",
      "Organizacao de rotas e agendas",
      "Relatorios essenciais",
      "Suporte padrao",
    ],
    buttonLabel: "Escolher Plano",
    buttonHref: "/contato",
    note: "Upgrade/downgrade quando quiser",
  },
  {
    id: "professional",
    name: "Clinic Professional",
    badge: "Melhor custo-beneficio",
    badgeSecondary: "Melhor plano",
    professionals: "ate 35 profissionais ativos",
    price: "R$ 449,90",
    description:
      "O mais vendido para quem precisa de escala. Menos erros, mais produtividade, controle financeiro e evolucao segura.",
    items: [
      "Clinicas estruturadas",
      "Equipe crescendo",
      "Eficiencia real",
      "Relatorios avancados",
      "Suporte prioritario",
    ],
    buttonLabel: "Escolher Plano",
    buttonHref: "/contato",
    note: "Upgrade/downgrade quando quiser",
  },
  {
    id: "enterprise",
    name: "Clinic Enterprise",
    badge: "Alta demanda",
    professionals: "ate 50 profissionais ativos",
    price: "R$ 979,90",
    description:
      "Para grandes estruturas com alta demanda, multiplas rotas e necessidade total de controle.",
    items: [
      "Empresas grandes",
      "Multiplas rotas",
      "Alta confiabilidade",
      "Relatorios completos",
      "Acompanhamento",
    ],
    buttonLabel: "Escolher Plano",
    buttonHref: "/contato",
    note: "Upgrade/downgrade quando quiser",
  },
  {
    id: "corporate",
    name: "Clinic Corporate",
    badge: "Escala maxima",
    professionals: "Profissionais ilimitados",
    price: "R$ 1.490,00",
    description:
      "Operacoes em larga escala. Suporte premium, performance e controle para equipes grandes.",
    items: [
      "Operacoes corporativas",
      "Multiplas regioes",
      "Personalizacao e escala",
      "Onboarding avancado",
      "Suporte premium",
    ],
    buttonLabel: "Escolher Plano",
    buttonHref: "/contato",
    note: "Upgrade/downgrade quando quiser",
  },
];

const comparisonRows = [
  { resource: "Profissionais ativos", free: "ate 3", essential: "ate 10", professional: "ate 35", enterprise: "ate 50", corporate: "ilimitados" },
  { resource: "Gestao de pacientes", free: "✓", essential: "✓", professional: "✓", enterprise: "✓", corporate: "✓" },
  { resource: "Rotas e atendimentos", free: "✓", essential: "✓", professional: "✓", enterprise: "✓", corporate: "✓" },
  { resource: "Evolucao do paciente", free: "✓", essential: "✓", professional: "✓", enterprise: "✓", corporate: "✓" },
  { resource: "Financeiro dos profissionais", free: "✓", essential: "✓", professional: "✓", enterprise: "✓", corporate: "✓" },
  { resource: "Relatorios gerenciais", free: "Basico", essential: "Essenciais", professional: "Avancados", enterprise: "Completo", corporate: "Completo" },
  { resource: "Suporte", free: "Base", essential: "Padrao", professional: "Prioridade", enterprise: "Prioridade alta", corporate: "Premium" },
  { resource: "Onboarding", free: "Autoguiado", essential: "Guiado por material", professional: "Assistido (time Hausecare)", enterprise: "Assistido + acompanhamento", corporate: "Assistido + acompanhamento" },
];

function PlanCard({ plan }) {
  const isProfessional = plan.id === "professional";

  return (
    <article
      className={`h-full w-full max-w-[360px] overflow-hidden rounded-[22px] border shadow-[0_6px_18px_rgba(15,23,42,0.06)] flex flex-col ${
        isProfessional ? "border-[#0b6e60] bg-[#d9eee9]" : "border-[#d9dee5] bg-white"
      }`}
    >
      <div
        className={`px-6 py-4 border-b ${
          isProfessional ? "bg-[#0b6e60] border-[#0b6e60]" : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-[2rem] leading-tight font-semibold ${isProfessional ? "text-white" : "text-slate-900"}`}>
            {plan.name}
          </h3>
          <div className="flex flex-wrap justify-end gap-2">
            {plan.badgeSecondary ? (
              <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold bg-[#ffedd5] text-[#ea580c] whitespace-nowrap">
                {plan.badgeSecondary}
              </span>
            ) : null}
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${
                isProfessional ? "bg-[#f97316] text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {plan.badge}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 pt-5 pb-6 flex h-full flex-col">
        <p className={`text-[1.05rem] font-medium ${isProfessional ? "text-slate-700" : "text-slate-600"}`}>
          {plan.professionals}
        </p>

        <p className="mt-3 text-[2.6rem] leading-none font-semibold text-slate-900">
          {plan.price} <span className="text-[1.05rem] font-medium text-slate-500">/mes</span>
        </p>

        <p className="mt-3 text-[0.98rem] leading-relaxed text-slate-600">{plan.description}</p>

        <a
          href={plan.buttonHref}
          className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-[1.05rem] font-semibold transition-colors ${
            isProfessional
              ? "bg-[#0b8a73] text-white hover:bg-[#0a755f]"
              : "bg-white text-slate-900 border border-slate-700 hover:bg-slate-50"
          }`}
        >
          {plan.buttonLabel}
        </a>

        <p className="mt-6 text-[1.35rem] font-semibold tracking-tight text-slate-900">Este plano inclui:</p>
        <ul className="mt-3 space-y-2.5">
          {plan.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[1rem] text-slate-700">
              <span className="mt-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#1fb79a] text-white text-[10px]">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-auto pt-4 text-center text-sm text-slate-500">{plan.note}</p>
      </div>
    </article>
  );
}

export default function Planos() {
  return (
    <main className="bg-[#f6f8fb] pt-28 pb-16 text-[#242727]">
      <SEO
        title="Planos e Precos | Hausecare"
        description="Escolha o plano ideal da Hausecare para sua clinica: Free, Clinic Essential, Clinic Professional, Clinic Enterprise e Clinic Corporate."
        path="/planos"
      />

      <section className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-slate-900">Precos e Planos</h1>
          <p className="mt-2 text-base md:text-lg text-slate-600">Transparencia para escolher o melhor plano para sua operacao.</p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr justify-items-start">
          {plans.slice(0, 3).map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr justify-items-start">
          {plans.slice(3).map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <section className="mt-8 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-6">
            <h2 className="text-3xl font-semibold tracking-[-0.01em] text-slate-900">Comparativo de recursos</h2>
            <p className="mt-1 text-base text-slate-600">Sem letra miuda. Transparencia converte.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-left">
              <thead className="bg-slate-50">
                <tr className="text-slate-700">
                  <th className="px-6 py-4 text-base font-semibold">Recurso</th>
                  <th className="px-6 py-4 text-base font-semibold">Free</th>
                  <th className="px-6 py-4 text-base font-semibold">Essential</th>
                  <th className="px-6 py-4 text-base font-semibold">Professional</th>
                  <th className="px-6 py-4 text-base font-semibold">Enterprise</th>
                  <th className="px-6 py-4 text-base font-semibold">Corporate</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.resource} className="border-t border-slate-200 text-slate-800">
                    <td className="px-6 py-4 text-[1rem] font-semibold">{row.resource}</td>
                    <td className="px-6 py-4 text-[0.98rem]">{row.free}</td>
                    <td className="px-6 py-4 text-[0.98rem]">{row.essential}</td>
                    <td className="px-6 py-4 text-[0.98rem] font-semibold text-[#ea580c]">{row.professional}</td>
                    <td className="px-6 py-4 text-[0.98rem]">{row.enterprise}</td>
                    <td className="px-6 py-4 text-[0.98rem]">{row.corporate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="border-t border-slate-200 px-6 py-4 text-[1rem] text-slate-700">
            O plano <strong>Professional</strong> e seu motor de conversao.
          </p>
        </section>
      </section>
    </main>
  );
}
