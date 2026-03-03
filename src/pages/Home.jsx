import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const stats = [
  { label: "Clínicas em crescimento", value: "150+" },
  { label: "Profissionais ativos", value: "+180" },
  { label: "Especialidades atendidas", value: "+90" },
  { label: "Recursos operacionais", value: "+200" },
];

const featureRows = [
  {
    title: "Agenda e operação em tempo real",
    text: "Visualize atendimentos do dia, status por profissional e alertas automáticos de atraso para agir rápido.",
    bullets: [
      "Status de atendimento atualizado em tempo real",
      "Alertas automáticos para atrasos e pendências",
      "Visão gerencial clara logo no início do dia",
    ],
    image: "/imagens/atualizado/agenda-confirmacao.webp",
  },
  {
    title: "Evolução clínica com controle rigoroso",
    text: "Registro digital com histórico completo do paciente e bloqueio de evolução após 24h sem envio.",
    bullets: [
      "Histórico clínico centralizado e rastreável",
      "Bloqueio automático e liberação apenas pela clínica",
      "Mais segurança jurídica e menos falhas operacionais",
    ],
    image: "/imagens/atualizado/sbis-prontuario.webp",
  },
  {
    title: "Financeiro estratégico para crescer com margem",
    text: "Do extrato à DRE automática, você entende onde ganha dinheiro e onde precisa ajustar.",
    bullets: [
      "Controle de receitas, despesas e fluxo de caixa",
      "DRE automática e centro de custos por setor",
      "Produtividade por profissional e por contrato",
    ],
    image: "/imagens/atualizado/faturamento-graficos.webp",
  },
  {
    title: "Equipe e governança sem improviso",
    text: "Convide profissionais, defina permissões por nível e audite tudo o que foi alterado no sistema.",
    bullets: [
      "Cadastro completo e convite digital de profissionais",
      "Permissões por perfil para reduzir risco",
      "Auditoria completa: quem alterou, quando e o que",
    ],
    image: "/imagens/atualizado/relatorios.webp",
  },
];

const extraResources = [
  "Dashboard estratégico em tempo real",
  "Gestão de funcionários e profissionais",
  "Segurança operacional e LGPD",
  "Relatórios de produtividade",
  "Controle financeiro avançado",
  "Trilha de auditoria completa",
];

const faqItems = [
  {
    q: "O Hausecare é indicado para qual perfil de clínica?",
    a: "Para clínicas de Home Care que precisam crescer com controle operacional, previsibilidade financeira e governança.",
  },
  {
    q: "O sistema ajuda a reduzir falhas da equipe?",
    a: "Sim. Com status em tempo real, bloqueios operacionais, auditoria e processos padronizados, a equipe trabalha com menos retrabalho.",
  },
  {
    q: "Consigo acompanhar resultado financeiro com clareza?",
    a: "Sim. O módulo financeiro traz extratos, DRE, fluxo de caixa, centro de custos e produtividade por profissional.",
  },
  {
    q: "Tem suporte para conformidade e proteção de dados?",
    a: "Sim. O Hausecare oferece rastreabilidade, controle de acessos e estrutura para operação segura e aderente à LGPD.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main aria-label="Página inicial da Hausecare" className="bg-[#f7f2ed] text-[#242727]">
      <SEO
        title="Hausecare | Sistema completo para clínicas de Home Care"
        description="Software de gestão para Home Care com dashboard em tempo real, controle clínico, financeiro estratégico, auditoria e segurança operacional."
        path="/"
      />

      <section className="pt-28 pb-14 hc-updated-gradient">
        <div className="hc-section-shell">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <p className="inline-flex rounded-full bg-[#dff9f2] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0b4b3f]">
                Sistema para Home Care
              </p>
              <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[1.05]">
                Gestão profissional para clínicas que querem crescer com controle
              </h1>
              <p className="mt-5 max-w-2xl text-base md:text-xl text-[#565f5f] leading-relaxed">
                O Hausecare centraliza operação clínica, equipe e financeiro para reduzir falhas,
                aumentar rentabilidade e dar previsibilidade para a sua gestão.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://app.hausecare.com.br/auth/register/company" className="hc-cta hc-cta-primary px-6 py-3 text-sm">
                  Teste grátis
                </a>
                <Link to="/funcionalidades" className="hc-cta hc-cta-secondary px-6 py-3 text-sm hover:bg-[#efebe6]">
                  Ver recursos
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] bg-[#00c3a5] p-4 md:p-6 shadow-[0_24px_48px_rgba(36,39,39,0.18)]">
              <div className="overflow-hidden rounded-2xl bg-white">
                <img src="/imagens/atualizado/imagem-dashboard-2026.png" alt="Dashboard estratégico da Hausecare" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <article key={item.label} className="hc-card p-5">
                <p className="text-3xl font-semibold text-[#242727]">{item.value}</p>
                <p className="mt-1 text-sm text-[#565f5f]">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="hc-section-shell">
          <h2 className="text-center text-3xl md:text-5xl font-semibold">Recursos que entregam gestão completa</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[#565f5f]">
            Cada módulo foi pensado para resolver gargalos reais de clínicas de Home Care,
            com foco em controle operacional, segurança e resultado financeiro.
          </p>

          <div className="mt-14 space-y-14">
            {featureRows.map((row, idx) => (
              <article key={row.title} className={`grid gap-8 items-center ${idx % 2 === 0 ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
                <div className={idx % 2 === 0 ? "order-2 lg:order-1" : "order-2"}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#0b4b3f]">Módulo estratégico</p>
                  <h3 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight">{row.title}</h3>
                  <p className="mt-3 text-base md:text-lg text-[#565f5f]">{row.text}</p>
                  <ul className="mt-5 space-y-2">
                    {row.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm md:text-base text-[#3f4848]">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-[#00c3a5]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={idx % 2 === 0 ? "order-1 lg:order-2" : "order-1"}>
                  <div className="overflow-hidden rounded-[24px] border border-[#242727]/10 bg-[#eef8f5] p-2 shadow-[0_16px_30px_rgba(36,39,39,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(36,39,39,0.18)]">
                    <img src={row.image} alt={row.title} className="w-full rounded-[18px] object-cover transition duration-300 hover:scale-[1.015]" loading="lazy" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="hc-section-shell">
          <h2 className="text-center text-2xl md:text-4xl font-semibold">Impulsione sua operação com recursos adicionais</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {extraResources.map((item) => (
              <div key={item} className="hc-card px-5 py-4 text-[#3f4848]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="hc-section-shell">
          <div className="rounded-[28px] bg-[#dff9f2] p-4 md:p-8 grid gap-6 lg:grid-cols-[320px_1fr] items-center">
            <img src="/imagens/atualizado/telemedicina.webp" alt="Equipe conectada ao paciente" className="w-full rounded-2xl object-cover" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0b4b3f]">Depoimento de cliente</p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold">"Saímos do achismo e passamos a gerir com dados reais"</h3>
              <p className="mt-3 text-[#565f5f]">
                Com o Hausecare, a operação ficou previsível, o financeiro ganhou clareza e a equipe passou a trabalhar com mais padrão e responsabilidade.
              </p>
              <Link to="/funcionalidades" className="mt-5 hc-cta hc-cta-primary px-5 py-2.5 text-sm">
                Conhecer a plataforma
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-4xl font-semibold">Perguntas frequentes</h2>
          <div className="mt-8 space-y-3">
            {faqItems.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <article key={item.q} className="overflow-hidden rounded-2xl border border-[#242727]/12 bg-white">
                  <button
                    type="button"
                    className="w-full px-5 py-4 text-left text-sm md:text-base font-semibold text-[#242727] transition hover:text-[#0b4b3f]"
                    onClick={() => setOpenFaq(open ? -1 : idx)}
                  >
                    {item.q}
                  </button>
                  {open && <p className="px-5 pb-5 text-sm md:text-base text-[#565f5f]">{item.a}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0b4b3f] py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-4 md:px-6">
          <div className="rounded-[24px] bg-white p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.22)]">
            <h3 className="text-2xl md:text-3xl font-semibold">Vamos transformar a gestão da sua clínica?</h3>
            <p className="mt-2 text-[#565f5f]">Peça uma demonstração e veja como o Hausecare reduz falhas e aumenta sua margem.</p>
            <form className="mt-6 grid gap-3 md:grid-cols-2">
              <input className="rounded-xl border border-[#242727]/20 px-4 py-3" placeholder="Nome" />
              <input className="rounded-xl border border-[#242727]/20 px-4 py-3" placeholder="Email" />
              <input className="rounded-xl border border-[#242727]/20 px-4 py-3 md:col-span-2" placeholder="Nome da clínica" />
              <button type="button" className="md:col-span-2 hc-cta hc-cta-primary px-6 py-3 text-sm">
                Solicitar demonstração
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}



