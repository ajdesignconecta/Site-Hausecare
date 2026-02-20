// src/components/sections/FAQSection.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const CATEGORIES = [
  { key: "tudo", label: "Tudo" },
  { key: "implantacao", label: "Implantação" },
  { key: "operacao", label: "Operação" },
  { key: "prontuario", label: "Prontuário" },
  { key: "financeiro", label: "Financeiro" },
  { key: "seguranca", label: "Segurança / LGPD" },
  { key: "equipe", label: "Equipe" },
  { key: "integracoes", label: "Integrações" },
  { key: "planos", label: "Planos" },
];

const FAQ_ITEMS = [
  // IMPLANTAÇÃO
  {
    id: "impl-1",
    category: "implantacao",
    q: "Em quanto tempo consigo implantar o Hausecare na clínica?",
    a: `Na prática, dá para começar em minutos com o básico (cadastros e agenda).
Para implantação completa (rotas, financeiro e relatórios), o tempo depende do volume de profissionais/pacientes — mas o fluxo é guiado e dá para evoluir por etapas sem travar a operação.`,
  },
  {
    id: "impl-2",
    category: "implantacao",
    q: "Tem suporte e treinamento inclusos?",
    a: `Sim. Você consegue operar sozinho, mas o melhor cenário é começar com uma demonstração guiada para configurar a operação com o “jeito da sua clínica”.
O foco é reduzir curva de aprendizagem e evitar setup errado (que vira retrabalho depois).`,
  },

  // OPERAÇÃO
  {
    id: "op-1",
    category: "operacao",
    q: "Consigo acompanhar atendimentos em tempo real?",
    a: `Sim. Você acompanha atendimentos do dia, status (agendado/em andamento/concluído/cancelado), e consegue ver o que está acontecendo sem depender de WhatsApp e planilhas paralelas.`,
  },
  {
    id: "op-2",
    category: "operacao",
    q: "O sistema tem agenda e rotas para deslocamentos?",
    a: `Sim. A agenda organiza atendimentos e, junto das rotas, você ganha previsibilidade operacional (quem vai aonde, quando e com qual carga).
Isso reduz atrasos, choque de horários e “apagões” de operação.`,
  },
  {
    id: "op-3",
    category: "operacao",
    q: "Como funciona o controle de pacientes e plano terapêutico?",
    a: `Você cadastra pacientes e associa planos terapêuticos por período, frequência e profissional.
A gestão fica padronizada por paciente (sem improviso), com visão clara do que está ativo, histórico e próximas ações.`,
  },

  // PRONTUÁRIO
  {
    id: "pr-1",
    category: "prontuario",
    q: "Como funciona o prontuário digital e a evolução do paciente?",
    a: `O prontuário organiza registros e evoluções por paciente, com rastreabilidade.
Você deixa de ter “texto solto” e passa a ter histórico consistente para auditoria interna e tomada de decisão.`,
  },
  {
    id: "pr-2",
    category: "prontuario",
    q: "O profissional pode registrar evolução sem validação?",
    a: `Não — e isso é proposital.
A evolução pode exigir validação (ex.: senha do atendimento) para garantir integridade do registro e reduzir risco de fraude, divergência e questionamento futuro.`,
  },

  // FINANCEIRO
  {
    id: "fin-1",
    category: "financeiro",
    q: "O financeiro é integrado ou vou precisar planilhar por fora?",
    a: `O objetivo é justamente parar de planilhar.
Você acompanha receitas, despesas, relatórios (ex.: DRE / extratos) e tem visão de caixa/resultado para decisão rápida.`,
  },
  {
    id: "fin-2",
    category: "financeiro",
    q: "Como funciona a folha de pagamento dos profissionais?",
    a: `Você tem relatórios que consolidam valores por profissional (receita, custos, impostos/retenções e total líquido).
Isso reduz erro de repasse e dá previsibilidade do “quanto pagar, para quem, e quando”.`,
  },

  // SEGURANÇA / LGPD
  {
    id: "sec-1",
    category: "seguranca",
    q: "Tem LGPD e controle de acesso por permissões?",
    a: `Sim. O sistema é pensado para operação em saúde: acesso por perfis/permissões, separação por papéis e redução de exposição de dados.
A lógica é simples: cada área enxerga o que precisa — e só.`,
  },
  {
    id: "sec-2",
    category: "seguranca",
    q: "Existe rastreabilidade (logs) de ações e auditoria?",
    a: `O foco do Hausecare é “quem fez o quê” não virar adivinhação.
Registros operacionais e validações ajudam a manter governança sem burocratizar o dia a dia.`,
  },

  // EQUIPE
  {
    id: "eq-1",
    category: "equipe",
    q: "Posso convidar e gerenciar profissionais da minha organização?",
    a: `Sim. Você convida profissionais, acompanha status e mantém dados padronizados.
Isso evita cadastros duplicados e bagunça de “cada um trabalhando do seu jeito”.`,
  },
  {
    id: "eq-2",
    category: "equipe",
    q: "Consigo limitar acesso por função (coordenação, financeiro, etc.)?",
    a: `Sim. A operação fica mais segura quando cada área tem o nível de acesso adequado.
Você reduz risco, ruído e retrabalho (principalmente em saúde).`,
  },

  // INTEGRAÇÕES
  {
    id: "int-1",
    category: "integracoes",
    q: "Quais integrações existem e o que está no roadmap?",
    a: `Rotas e operação já fazem parte do core. Outras integrações podem evoluir conforme demanda:
WhatsApp (notificações), Google Calendar, exportação CSV e integrações via API (ex.: Asaas/Stripe).
O ponto é ser honesto: o ecossistema cresce junto com o uso real.`,
  },

  // PLANOS
  {
    id: "pl-1",
    category: "planos",
    q: "Serve para quantos profissionais?",
    a: `Depende do plano — e isso é bom, porque sua clínica não precisa pagar por “tamanho enterprise” se ainda está crescendo.
Na demonstração a gente recomenda o melhor encaixe por volume de equipe e operação.`,
  },
  {
    id: "pl-2",
    category: "planos",
    q: "Preciso ver preço antes de falar com alguém. Como funciona?",
    a: `Você pode começar pelo acesso gratuito e evoluir quando fizer sentido.
Para planos avançados, a demonstração serve para alinhar volume, módulos e o que realmente te dá ROI (retorno sobre investimento) na operação.`,
  },
];

function normalize(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export default function FAQSection() {
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id || null);

  const filtered = useMemo(() => {
    const qn = normalize(query);
    const results = FAQ_ITEMS.filter((item) => {
      const qOk =
        !qn ||
        normalize(item.q).includes(qn) ||
        normalize(item.a).includes(qn);
      return qOk;
    });

    // Priorizar match no Título (q) sobre match no Corpo (a)
    if (!qn) return results;

    return results.sort((a, b) => {
      const aTitle = normalize(a.q).includes(qn);
      const bTitle = normalize(b.q).includes(qn);

      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0; // mantem ordem original se ambos ou nenhum der match no titulo
    });
  }, [query]);

  // GSAP: entrada + micro animações
  useEffect(() => {
    let ctx;
    (async () => {
      const mod = await import("gsap");
      const gsap = mod.gsap || mod.default;

      const root = rootRef.current;
      if (!root) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".hcfaq-kicker",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );

        gsap.fromTo(
          ".hcfaq-title",
          { opacity: 0, y: 18, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", delay: 0.05 }
        );

        gsap.fromTo(
          ".hcfaq-subtitle",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.15 }
        );

        gsap.fromTo(
          ".hcfaq-panel",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.2 }
        );

        // “respiração” suave no glow
        gsap.to(".hcfaq-glow", {
          opacity: 0.55,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }, rootRef);
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  // Accordion animation (altura real)
  useEffect(() => {
    let ctx;
    (async () => {
      const mod = await import("gsap");
      const gsap = mod.gsap || mod.default;

      const root = rootRef.current;
      if (!root) return;

      ctx = gsap.context(() => {
        const rows = Array.from(root.querySelectorAll("[data-acc-row='true']"));
        rows.forEach((row) => {
          const body = row.querySelector("[data-acc-body='true']");
          const icon = row.querySelector("[data-acc-icon='true']");
          const isOpen = row.getAttribute("data-open") === "true";

          gsap.set(body, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
          gsap.set(icon, { rotate: isOpen ? 45 : 0 });
        });
      }, rootRef);
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [filtered, openId]);

  const toggle = async (id) => {
    const mod = await import("gsap");
    const gsap = mod.gsap || mod.default;

    const root = rootRef.current;
    if (!root) return;

    const current = openId;
    const next = current === id ? null : id;
    setOpenId(next);

    const closeRow = current
      ? root.querySelector(`[data-acc-id='${current}']`)
      : null;
    const openRow = next ? root.querySelector(`[data-acc-id='${next}']`) : null;

    const animateClose = (row) => {
      if (!row) return;
      const body = row.querySelector("[data-acc-body='true']");
      const icon = row.querySelector("[data-acc-icon='true']");
      row.setAttribute("data-open", "false");
      gsap.to(icon, { rotate: 0, duration: 0.18, ease: "power2.out" });
      gsap.to(body, { height: 0, opacity: 0, duration: 0.22, ease: "power2.out" });
    };

    const animateOpen = (row) => {
      if (!row) return;
      const body = row.querySelector("[data-acc-body='true']");
      const icon = row.querySelector("[data-acc-icon='true']");
      row.setAttribute("data-open", "true");

      // precisa medir a altura
      gsap.set(body, { height: "auto", opacity: 1 });
      const target = body.getBoundingClientRect().height;
      gsap.set(body, { height: 0, opacity: 0 });

      gsap.to(icon, { rotate: 45, duration: 0.18, ease: "power2.out" });
      gsap.to(body, {
        height: target,
        opacity: 1,
        duration: 0.28,
        ease: "power3.out",
        onComplete: () => gsap.set(body, { height: "auto" }),
      });

      // scroll suave para a pergunta aberta (quando lista for grande)
      const container = listRef.current;
      if (container) {
        const top = row.getBoundingClientRect().top - container.getBoundingClientRect().top;
        if (top > container.clientHeight * 0.55) {
          container.scrollTo({ top: container.scrollTop + top - 140, behavior: "smooth" });
        }
      }
    };

    if (closeRow && closeRow !== openRow) animateClose(closeRow);
    if (openRow) animateOpen(openRow);
  };

  return (
    <section
      ref={rootRef}
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden"
    >
      {/* Fundo claro profissional */}
      <div
        className="absolute inset-0 bg-white"
        aria-hidden="true"
      />

      {/* Gradiente sutil de profundidade */}
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(43, 144, 138, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)",
        }}
      />

      {/* Glow sutil */}
      <div
        className="hcfaq-glow pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] blur-3xl opacity-[0.08]"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse, rgba(43, 144, 138, 0.3), transparent 60%)"
        }}
      />

      {/* Grid pattern minimalista */}
      <div
        className="hcfaq-pattern pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-6 py-24 max-w-6xl">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="hcfaq-kicker inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 border border-emerald-200 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            FAQ • Respostas que destravam decisão
          </div>

          <h2
            id="faq-title"
            className="hcfaq-title mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            style={{ letterSpacing: "-0.03em" }}
          >
            Tudo o que um gestor precisa<br />saber antes da demonstração
          </h2>

          <p className="hcfaq-subtitle mt-5 text-slate-700 text-lg leading-relaxed">
            Sem marketing vazio. Só o que importa para operar com{" "}
            <strong className="text-slate-900">controle</strong>,{" "}
            <strong className="text-slate-900">prontuário seguro</strong> e{" "}
            <strong className="text-slate-900">financeiro previsível</strong>.
          </p>
        </div>

        {/* Conteúdo: sidebar + lista */}
        <div className="mt-14 grid lg:grid-cols-[380px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <aside className="hcfaq-panel">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <p className="text-slate-700 text-xs font-semibold tracking-wider">
                  FILTRAR PERGUNTAS
                </p>

                <div className="mt-3 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar (ex: prontuário, folha, LGPD...)"
                    className="w-full rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 pl-11 pr-4 py-3.5 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 transition"
                  />
                </div>
              </div>

              <div className="p-6">
                <p className="text-slate-700 text-sm leading-relaxed">
                  {query ? "Resultados da busca" : "Total de perguntas"}
                  <span className="block text-slate-900 font-semibold text-lg mt-1">
                    {filtered.length} pergunta(s)
                  </span>
                  <span className="block text-slate-600 mt-1">
                    {query ? "Use a busca para encontrar mais respostas." : "Explore todas as perguntas ou use a busca acima."}
                  </span>
                </p>

                <div className="mt-6 grid gap-3">
                  <a
                    href="https://wa.me/5561992064157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold py-3.5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:translate-y-[-2px] transition-all duration-200"
                  >
                    Agendar demonstração
                  </a>

                  <a
                    href="/funcionalidades"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-slate-100 text-slate-900 font-semibold py-3.5 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-all duration-200"
                  >
                    Ver funcionalidades
                  </a>
                </div>

                <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                  <p className="text-slate-700 text-sm">
                    Dica rápida
                    <span className="block text-slate-600 mt-1">
                      Use a busca para achar termos como "LGPD", "folha", "rotas", "senha do atendimento".
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Lista */}
          <div className="hcfaq-panel">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200">
                <h3 className="text-slate-900 font-bold text-lg">Perguntas frequentes</h3>
                <p className="text-slate-600 text-sm mt-1">
                  Clique para abrir. Respostas objetivas — do jeito que gestor gosta.
                </p>
              </div>

              <div
                ref={listRef}
                className="max-h-[640px] overflow-auto"
                style={{ scrollbarWidth: "thin" }}
              >
                {filtered.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-slate-700 font-semibold text-lg">
                      Nenhuma pergunta encontrada.
                    </p>
                    <p className="text-slate-600 mt-2">
                      Tente buscar por outro termo ou limpe a busca.
                    </p>
                    <button
                      onClick={() => setQuery("")}
                      className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold px-6 py-3.5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:translate-y-[-2px] transition-all duration-200"
                    >
                      Limpar busca
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-200">
                    {filtered.map((item) => {
                      const isOpen = openId === item.id;
                      const cat = CATEGORIES.find((c) => c.key === item.category)?.label || "Categoria";
                      return (
                        <li
                          key={item.id}
                          data-acc-row="true"
                          data-acc-id={item.id}
                          data-open={isOpen ? "true" : "false"}
                          className="group"
                        >
                          <button
                            onClick={() => toggle(item.id)}
                            className="w-full text-left px-6 py-5 flex items-center gap-4 hover:bg-slate-50 transition-all duration-200"
                            aria-expanded={isOpen}
                          >
                            <div className="flex-1">
                              <p className="text-slate-900 font-semibold text-base leading-snug">
                                {item.q}
                              </p>
                              <p className="mt-2 text-slate-500 text-xs tracking-wider font-semibold uppercase">
                                {cat}
                              </p>
                            </div>

                            <span
                              data-acc-icon="true"
                              className="shrink-0 w-10 h-10 rounded-full border border-slate-300 bg-slate-100 inline-flex items-center justify-center text-slate-600"
                              aria-hidden="true"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M12 5v14M5 12h14"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                          </button>

                          <div className="px-6 pb-6">
                            <div
                              data-acc-body="true"
                              className="overflow-hidden"
                            >
                              <div className="pt-2">
                                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                                  <p className="text-slate-700 text-[15px] leading-relaxed whitespace-pre-line">
                                    {item.a}
                                  </p>

                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-700">
                                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                      Tempo real
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-2 text-xs text-cyan-700">
                                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                      Prontuário digital
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-2 text-xs text-indigo-700">
                                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                                      Agenda & Rotas
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
                                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                                      Financeiro
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="px-6 py-5 border-t border-slate-200 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-slate-600 text-sm">
                  Quer ver isso aplicado no seu cenário? Demonstração guiada em minutos.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/5561992064157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold px-5 py-3 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:translate-y-[-2px] transition-all duration-200"
                  >
                    Solicitar demonstração
                  </a>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-100 text-slate-900 font-semibold px-5 py-3 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-all duration-200"
                  >
                    Voltar ao topo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS do pattern (bem sutil e exclusivo do FAQ) */}
        <style>{`
          .hcfaq-pattern{
            background-image:
              radial-gradient(circle at 16px 16px, rgba(148, 163, 184, 0.04) 1px, transparent 1px);
            background-size: 32px 32px;
            background-position: 0 0;
            mask-image: radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.8), transparent 70%);
            -webkit-mask-image: radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.8), transparent 70%);
          }
          /* Scrollbar (webkit) */
          .hcfaq-panel ::-webkit-scrollbar { width: 8px; }
          .hcfaq-panel ::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.3); border-radius: 4px; }
          .hcfaq-panel ::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.4); border-radius: 4px; }
          .hcfaq-panel ::-webkit-scrollbar-thumb:hover { background: rgba(100, 116, 139, 0.6); }
        `}</style>
      </div>
    </section>
  );
}
