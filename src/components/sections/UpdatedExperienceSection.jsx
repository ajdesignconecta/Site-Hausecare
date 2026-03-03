import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Agenda e operação em tempo real",
    description: "Controle atendimentos do dia com status atualizado e visão gerencial imediata.",
    image: "/imagens/atualizado/agenda-confirmacao.webp",
  },
  {
    title: "Prontuário e segurança clínica",
    description: "Histórico completo, rastreabilidade e proteção jurídica para a rotina da clínica.",
    image: "/imagens/atualizado/sbis-prontuario.webp",
  },
  {
    title: "Financeiro com previsibilidade",
    description: "DRE, fluxo de caixa e produtividade por profissional para crescer com margem.",
    image: "/imagens/atualizado/faturamento-graficos.webp",
  },
  {
    title: "Relatórios para decisão rápida",
    description: "Dados consolidados para gestão de equipe, contratos e desempenho operacional.",
    image: "/imagens/atualizado/relatorios.webp",
  },
];

export default function UpdatedExperienceSection() {
  return (
    <section className="hc-updated-gradient py-16 md:py-24" aria-label="Experiência atualizada da plataforma">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center rounded-full bg-[#dff9f2] px-4 py-1.5 text-xs font-semibold tracking-wide text-[#0b4b3f]">
              Plataforma atualizada
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight text-[#242727]">
              Um novo padrão visual para uma gestão de Home Care mais estratégica
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-[#565f5f]">
              Evoluímos o design para uma experiência mais clara, rápida e profissional.
              O foco continua no que realmente importa para sua clínica: operação sob controle, dados confiáveis e rentabilidade.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="hc-soft-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#667070]">Resultado esperado</p>
                <p className="mt-2 text-lg font-semibold text-[#242727]">Gestão sem improviso</p>
                <p className="mt-1 text-sm text-[#565f5f]">Menos falhas da equipe e mais controle da clínica.</p>
              </div>
              <div className="hc-soft-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#667070]">Impacto direto</p>
                <p className="mt-2 text-lg font-semibold text-[#242727]">Decisão baseada em dados</p>
                <p className="mt-1 text-sm text-[#565f5f]">Painéis, indicadores e acompanhamento em tempo real.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/funcionalidades"
                className="inline-flex items-center gap-2 rounded-full bg-[#00c3a5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#02b196]"
              >
                Ver funcionalidades <ArrowRight size={16} />
              </Link>
              <Link
                to="/planos"
                className="inline-flex items-center rounded-full border border-[#242727]/30 bg-white px-6 py-3 text-sm font-semibold text-[#242727] transition hover:bg-[#f7f2ed]"
              >
                Comparar planos
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <article key={item.title} className="hc-soft-card overflow-hidden">
                <div className="aspect-square bg-[#eef8f5]">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-[#242727]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#565f5f]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
