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
  const [activeCat, setActiveCat] = useState("tudo");
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id || null);

  const filtered = useMemo(() => {
    const qn = normalize(query);
    return FAQ_ITEMS.filter((item) => {
      const catOk = activeCat === "tudo" ? true : item.category === activeCat;
      const qOk =
        !qn ||
        normalize(item.q).includes(qn) ||
        normalize(item.a).includes(qn);
      return catOk && qOk;
    });
  }, [query, activeCat]);

  const counts = useMemo(() => {
    const map = new Map();
    for (const c of CATEGORIES) map.set(c.key, 0);
    map.set("tudo", FAQ_ITEMS.length);
    for (const item of FAQ_ITEMS) {
      map.set(item.category, (map.get(item.category) || 0) + 1);
    }
    return map;
  }, []);

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
      {/* Fundo “saúde” (diferente do resto) */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(900px 460px at 20% 25%, rgba(255,255,255,0.62), transparent 60%), radial-gradient(900px 520px at 85% 40%, rgba(255,255,255,0.36), transparent 62%), linear-gradient(120deg, #0f3550 0%, #0f6c73 45%, #1aa6a0 100%)",
        }}
      />

      {/* Glow/partículas leves */}
      <div className="hcfaq-glow pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full blur-3xl opacity-40"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 60%)" }}
      />

      {/* Pattern de cruz/plus bem sutil */}
      <div className="hcfaq-pattern pointer-events-none absolute inset-0 opacity-[0.10]" aria-hidden="true" />

      <div className="relative container mx-auto px-6 py-24 max-w-6xl">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="hcfaq-kicker inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white/90 text-sm border border-white/20 backdrop-blur">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300" />
            FAQ — Respostas que destravam decisão
          </div>

          <h2
            id="faq-title"
            className="hcfaq-title mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            Tudo o que um gestor precisa saber
            <span className="block">antes da demonstração</span>
          </h2>

          <p className="hcfaq-subtitle mt-5 text-white/85 text-lg leading-relaxed">
            Sem marketing vazio. Só o que importa para operar com{" "}
            <strong className="text-white">controle</strong>,{" "}
            <strong className="text-white">prontuário seguro</strong> e{" "}
            <strong className="text-white">financeiro previsível</strong>.
          </p>
        </div>

        {/* Conteúdo: sidebar + lista */}
        <div className="mt-14 grid lg:grid-cols-[380px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <aside className="hcfaq-panel">
            <div className="rounded-3xl bg-white/12 border border-white/20 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="p-6 border-b border-white/15">
                <p className="text-white/80 text-xs font-semibold tracking-wider">
                  FILTRAR PERGUNTAS
                </p>

                <div className="mt-3 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
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
                    className="w-full rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/55 pl-11 pr-4 py-3 outline-none focus:border-white/40 focus:bg-white/14 transition"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => {
                    const isActive = activeCat === c.key;
                    const count =
                      c.key === "tudo" ? FAQ_ITEMS.length : counts.get(c.key) || 0;

                    return (
                      <button
                        key={c.key}
                        onClick={() => setActiveCat(c.key)}
                        className={[
                          "group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border transition",
                          isActive
                            ? "bg-white text-slate-900 border-white shadow-[0_10px_25px_rgba(0,0,0,0.20)]"
                            : "bg-white/10 text-white/90 border-white/20 hover:bg-white/14 hover:border-white/30",
                        ].join(" ")}
                      >
                        <span className="font-semibold">{c.label}</span>
                        <span
                          className={[
                            "min-w-[28px] h-[22px] px-2 rounded-full text-xs inline-flex items-center justify-center",
                            isActive ? "bg-slate-900/10 text-slate-900" : "bg-white/12 text-white/80",
                          ].join(" ")}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6">
                <p className="text-white/80 text-sm leading-relaxed">
                  Resultado do filtro
                  <span className="block text-white font-semibold text-lg mt-1">
                    {filtered.length} pergunta(s)
                  </span>
                  <span className="block text-white/75 mt-1">
                    Clareza rápida, decisão mais fácil.
                  </span>
                </p>

                <div className="mt-6 grid gap-3">
                  <a
                    href="#contato"
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-white text-slate-900 font-semibold py-3 shadow-[0_18px_40px_rgba(0,0,0,0.25)] hover:translate-y-[-1px] transition"
                  >
                    Agendar demonstração
                  </a>

                  <a
                    href="/funcionalidades"
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-transparent text-white font-semibold py-3 border border-white/25 hover:bg-white/10 transition"
                  >
                    Ver funcionalidades
                  </a>
                </div>

                <div className="mt-6 rounded-2xl bg-white/10 border border-white/15 p-4">
                  <p className="text-white/85 text-sm">
                    Dica rápida
                    <span className="block text-white/70 mt-1">
                      Use a busca para achar termos como “LGPD”, “folha”, “rotas”, “senha do atendimento”.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Lista */}
          <div className="hcfaq-panel">
            <div className="rounded-3xl bg-white/12 border border-white/20 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="px-6 py-5 border-b border-white/15">
                <h3 className="text-white font-bold text-lg">Perguntas frequentes</h3>
                <p className="text-white/75 text-sm mt-1">
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
                    <p className="text-white font-semibold text-lg">
                      Nenhuma pergunta encontrada.
                    </p>
                    <p className="text-white/75 mt-2">
                      Tente remover filtros ou buscar por outro termo.
                    </p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setActiveCat("tudo");
                      }}
                      className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white text-slate-900 font-semibold px-5 py-3 hover:translate-y-[-1px] transition"
                    >
                      Limpar filtros
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-white/12">
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
                            className="w-full text-left px-6 py-6 flex items-center gap-4 hover:bg-white/06 transition"
                            aria-expanded={isOpen}
                          >
                            <div className="flex-1">
                              <p className="text-white font-semibold text-lg leading-snug">
                                {item.q}
                              </p>
                              <p className="mt-2 text-white/70 text-xs tracking-wider font-semibold">
                                CATEGORIA: {cat.toUpperCase()}
                              </p>
                            </div>

                            <span
                              data-acc-icon="true"
                              className="shrink-0 w-11 h-11 rounded-full border border-white/25 bg-white/08 inline-flex items-center justify-center text-white/90"
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
                                <div className="rounded-2xl bg-white/10 border border-white/15 p-5">
                                  <p className="text-white/85 leading-relaxed whitespace-pre-line">
                                    {item.a}
                                  </p>

                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-2 text-xs text-white/85">
                                      <span className="w-2 h-2 rounded-full bg-emerald-300" />
                                      Tempo real
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-2 text-xs text-white/85">
                                      <span className="w-2 h-2 rounded-full bg-cyan-300" />
                                      Prontuário digital
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-2 text-xs text-white/85">
                                      <span className="w-2 h-2 rounded-full bg-indigo-300" />
                                      Agenda & Rotas
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-2 text-xs text-white/85">
                                      <span className="w-2 h-2 rounded-full bg-amber-300" />
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

              <div className="px-6 py-5 border-t border-white/15 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-white/75 text-sm">
                  Quer ver isso aplicado no seu cenário? Demonstração guiada em minutos.
                </p>
                <div className="flex gap-3">
                  <a
                    href="#contato"
                    className="inline-flex items-center justify-center rounded-2xl bg-white text-slate-900 font-semibold px-4 py-2.5 hover:translate-y-[-1px] transition"
                  >
                    Solicitar demonstração
                  </a>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="inline-flex items-center justify-center rounded-2xl bg-transparent text-white font-semibold px-4 py-2.5 border border-white/25 hover:bg-white/10 transition"
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
              radial-gradient(circle at 12px 12px, rgba(255,255,255,0.20) 1.5px, transparent 1.6px),
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
            background-size: 64px 64px, 64px 64px, 64px 64px;
            background-position: 0 0, 0 0, 0 0;
            mask-image: radial-gradient(closest-side at 50% 50%, rgba(0,0,0,1), rgba(0,0,0,0) 72%);
            -webkit-mask-image: radial-gradient(closest-side at 50% 50%, rgba(0,0,0,1), rgba(0,0,0,0) 72%);
          }
          /* Scrollbar (webkit) */
          .hcfaq-panel ::-webkit-scrollbar { width: 10px; }
          .hcfaq-panel ::-webkit-scrollbar-track { background: rgba(255,255,255,0.08); }
          .hcfaq-panel ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.20); border-radius: 999px; }
          .hcfaq-panel ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.28); }
        `}</style>
      </div>
    </section>
  );
}
