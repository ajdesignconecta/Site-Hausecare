import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

try {
  gsap.registerPlugin(ScrollTrigger);
} catch (e) { }

const PERSONAS = [
  {
    id: "clinica",
    label: "Clínicas",
    badge: "Clínicas de Home Care",
    headline: "Padronize a operação — do cadastro ao faturamento",
    pain: "Equipe cresce, processos divergem e a visibilidade do que acontece no dia some.",
    gain: "Operação centralizada em tempo real com prontuário, agenda, rotas e financeiro no mesmo fluxo.",
    bullets: [
      "Atendimentos do dia + status em andamento",
      "Prontuário digital e plano terapêutico por paciente",
      "Agenda e rotas integradas à operação",
      "Relatórios e visão financeira para decisão rápida",
    ],
  },
  {
    id: "gestor",
    label: "Operação",
    badge: "Gestor Operacional",
    headline: "Controle e previsibilidade (sem microgerenciar)",
    pain: "Fluxo espalhado em conversas, planilhas e confirmações manuais — vira retrabalho.",
    gain: "Painel de execução com gargalos, SLA e rastreabilidade. Menos ruído, mais entrega.",
    bullets: [
      "Visão por profissional / período",
      "SLA, status e tempo médio por atendimento",
      "Rotas e deslocamentos organizados por dia",
      "Padrão operacional em toda a equipe",
    ],
  },
  {
    id: "coordenacao",
    label: "Clínico",
    badge: "Coordenação Clínica",
    headline: "Qualidade clínica com rastreabilidade e padrão",
    pain: "Evoluções inconsistentes e ausência de auditoria aumentam risco clínico/jurídico.",
    gain: "Registro seguro e rastreável: prontuário, evolução e plano terapêutico com controle.",
    bullets: [
      "Histórico completo por paciente",
      "Plano terapêutico com frequência e vínculo",
      "Evolução protegida por senha do atendimento",
      "Trilha auditável para governança",
    ],
  },
  {
    id: "financeiro",
    label: "Financeiro",
    badge: "Financeiro / Administrativo",
    headline: "Feche contas com clareza — e pague certo, na hora certa",
    pain: "Receitas, despesas e pagamentos separados em planilhas e ferramentas desconectadas.",
    gain: "Relatórios financeiros e folha por profissional com visão consolidada e exportável.",
    bullets: [
      "Receitas, despesas, extrato e DRE gerencial",
      "Folha de pagamento por profissional e período",
      "Exportação CSV e relatórios para conciliação",
      "Governança financeira com previsibilidade",
    ],
  },
];

const ECOSYSTEM = [
  { name: "WhatsApp", status: "Roadmap", note: "Notificações e fluxos de atendimento" },
  { name: "Google Calendar", status: "Roadmap", note: "Sincronização de agenda" },
  { name: "Maps / Rotas", status: "Disponível", note: "Rotas e deslocamentos na operação" },
  { name: "Exportação CSV", status: "Disponível", note: "Relatórios e dados para análise" },
  { name: "API", status: "Roadmap", note: "Integrações com sistemas internos" },
  { name: "Asaas / Stripe", status: "Roadmap", note: "Cobrança e assinaturas" },
];

function StatusDot({ status }) {
  const map = {
    Disponível: "bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.12)]",
    Roadmap: "bg-indigo-400 shadow-[0_0_0_6px_rgba(129,140,248,0.12)]",
    Beta: "bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.12)]",
  };
  return <span className={`h-2.5 w-2.5 rounded-full ${map[status] || "bg-slate-400"}`} />;
}

export default function IntegrationsSection() {
  const rootRef = useRef(null);
  const dialRef = useRef(null);
  const handRef = useRef(null);
  const contentRef = useRef(null);
  const wireRef = useRef(null);
  const nodesRef = useRef([]);
  const [activeId, setActiveId] = useState(PERSONAS[0].id);

  const active = useMemo(
    () => PERSONAS.find((p) => p.id === activeId) || PERSONAS[0],
    [activeId]
  );

  // Entrada: section + wire + nodes
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(".sw-in", { autoAlpha: 0, y: 18 });
      gsap.set(".sw-panel", { autoAlpha: 0, y: 16, rotateX: 6, transformPerspective: 900 });
      gsap.set(".sw-wire", { strokeDasharray: 1200, strokeDashoffset: 1200 });
      gsap.set(".sw-node", { scale: 0.6, autoAlpha: 0 });

      gsap.to(".sw-in", {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 75%" },
      });

      gsap.to(".sw-panel", {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      gsap.to(".sw-wire", {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      gsap.to(".sw-node", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.55,
        ease: "back.out(1.8)",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 65%" },
      });

      // Dial loop bem sutil
      if (dialRef.current) {
        gsap.to(dialRef.current, {
          rotate: 360,
          duration: 26,
          ease: "none",
          repeat: -1,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Troca de persona: animação no conteúdo + “ponteiro” do dial
  useEffect(() => {
    const wrap = contentRef.current;
    if (!wrap) return;

    const idx = PERSONAS.findIndex((p) => p.id === activeId);
    const angles = [0, 90, 180, 270]; // positions “humanas” no dial
    const targetRot = angles[idx] ?? 0;

    const tl = gsap.timeline();

    // conteúdo
    tl.to(wrap, { autoAlpha: 0, y: 10, duration: 0.16, ease: "power2.out" })
      .set(wrap, { y: -10 })
      .to(wrap, { autoAlpha: 1, y: 0, duration: 0.34, ease: "power3.out" });

    // ponteiro
    if (handRef.current) {
      gsap.to(handRef.current, {
        rotate: targetRot,
        duration: 0.75,
        ease: "power3.out",
      });
    }

    // brilho nos nodes da “wire”
    if (nodesRef.current?.length) {
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { filter: "drop-shadow(0 0 0px rgba(99,102,241,0))" },
          {
            filter: "drop-shadow(0 0 18px rgba(99,102,241,0.25))",
            duration: 0.25,
            delay: i * 0.04,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          }
        );
      });
    }

    return () => tl.kill();
  }, [activeId]);

  return (
    <section
      ref={rootRef}
      id="integracoes"
      aria-labelledby="switchboard-title"
      className="relative overflow-hidden isolate bg-slate-50"
    >
      {/* Background simplificado (igual ProblemSection) */}

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
        <header className="text-center mb-12 md:mb-14">
          <div className="sw-in inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Segmentação inteligente • Control Room
          </div>

          <h2
            id="switchboard-title"
            className="sw-in mt-5 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Feito para cada área da sua operação
          </h2>

          <p className="sw-in mt-3 text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Selecione um perfil e veja onde o Hausecare elimina gargalos — com controle, rastreabilidade
            e previsibilidade.
          </p>

          <div className="sw-in mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Tempo real • Prontuário digital • Agenda & Rotas • Financeiro
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* LEFT: Dial + Persona Switch */}
          <div className="lg:col-span-5">
            <div className="sw-panel relative rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)] overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">Switchboard</p>
                <p className="mt-1 text-xs text-slate-500">
                  Clique em um perfil. O painel ao lado muda como uma central de operação.
                </p>
              </div>

              <div className="p-6">
                {/* Dial */}
                <div className="relative mx-auto w-[260px] h-[260px]">
                  <div
                    ref={dialRef}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 180deg, rgba(16,185,129,0.5), rgba(56,189,248,0.5), rgba(99,102,241,0.5), rgba(244,63,94,0.5), rgba(16,185,129,0.5))",
                      filter: "blur(0px)",
                    }}
                  />
                  <div className="absolute inset-[10px] rounded-full bg-slate-50 border border-slate-200" />
                  <div className="absolute inset-[22px] rounded-full bg-white border border-slate-200 shadow-inner" />

                  {/* ponteiro */}
                  <div
                    ref={handRef}
                    className="absolute left-1/2 top-1/2 origin-bottom"
                    style={{ width: 4, height: 104, transform: "translate(-50%, -100%) rotate(0deg)" }}
                  >
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[4px] h-[110px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(99,102,241,0.1), rgba(99,102,241,0.8))",
                        boxShadow: "0 0 12px rgba(99,102,241,0.30)",
                      }}
                    />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-600"
                      style={{ boxShadow: "0 0 15px rgba(99,102,241,0.4)" }}
                    />
                  </div>

                  {/* centro */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]" />
                  </div>

                  {/* labels em volta (sem cards) */}
                  <div className="absolute inset-0">
                    {PERSONAS.map((p, i) => {
                      const pos = [
                        { left: "50%", top: "6%" },
                        { left: "92%", top: "50%" },
                        { left: "50%", top: "92%" },
                        { left: "8%", top: "50%" },
                      ][i];

                      const isActive = p.id === activeId;

                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActiveId(p.id)}
                          className={[
                            "absolute -translate-x-1/2 -translate-y-1/2",
                            "rounded-full px-3 py-2 text-xs font-semibold",
                            "transition border",
                            isActive
                              ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                              : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-800",
                          ].join(" ")}
                          style={pos}
                          aria-pressed={isActive}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* mini-rail */}
                <div className="mt-7 text-center">
                  <p className="text-xs text-slate-500">
                    Perfil atual:{" "}
                    <span className="text-slate-900 font-semibold">{active.badge}</span>
                  </p>
                </div>

                {/* CTA compact */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/5561991519369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                  >
                    Solicitar demonstração
                  </a>
                  <a
                    href="#inicio"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 transition"
                  >
                    Voltar ao topo
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Panel + Wire/Pipeline */}
          <div className="lg:col-span-7">
            <div className="sw-panel relative rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)] overflow-hidden">
              {/* header */}
              <div className="p-6 md:p-7 border-b border-slate-100 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Console</p>
                  <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {active.badge}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 max-w-xl">
                    {active.headline}
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
                  online
                </div>
              </div>

              {/* content */}
              <div ref={contentRef} className="p-6 md:p-7">
                {/* Dor/Ganho em “painéis” (não cards clássicos) */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold text-slate-500">Dor que trava</p>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">{active.pain}</p>
                  </div>

                  <div
                    className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-5"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.1)",
                    }}
                  >
                    <p className="text-xs font-semibold text-emerald-700">Ganho com o Hausecare</p>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">{active.gain}</p>
                  </div>
                </div>

                {/* bullets */}
                <div className="mt-6">
                  <p className="text-sm font-bold text-slate-900">O que essa área vê na prática:</p>
                  <div className="mt-3 grid sm:grid-cols-2 gap-2">
                    {active.bullets.map((b) => (
                      <div
                        key={b}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 flex items-start gap-2 shadow-sm"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* pipeline wire + integrations */}
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 md:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">Integrações & ecossistema</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Roadmap honesto: o que já existe + o que está em evolução.
                      </p>
                    </div>

                    <a
                      href="https://wa.me/5561991519369"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition shadow-sm"
                    >
                      Agendar demonstração
                    </a>
                  </div>

                  {/* wire */}
                  <div className="mt-5 relative">
                    <svg
                      className="w-full h-[70px]"
                      viewBox="0 0 800 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        ref={wireRef}
                        className="sw-wire"
                        d="M20 60 C 120 10, 220 110, 320 60 S 520 10, 620 60 S 720 110, 780 60"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* nodes */}
                      {[60, 190, 320, 450, 580, 710].map((x, i) => (
                        <g
                          key={x}
                          ref={(el) => (nodesRef.current[i] = el)}
                          className="sw-node"
                        >
                          <circle cx={x} cy={60} r={7} fill="#6366f1" />
                          <circle cx={x} cy={60} r={16} fill="rgba(99,102,241,0.15)" />
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* integrations list (não cardzão — estilo “rows”) */}
                  <div className="mt-2 grid sm:grid-cols-2 gap-3">
                    {ECOSYSTEM.map((it) => (
                      <div
                        key={it.name}
                        className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800">{it.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{it.note}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusDot status={it.status} />
                          <span className="text-xs font-semibold text-slate-600">{it.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-[11px] text-slate-400">
                    *Integrações em Roadmap são planejadas e priorizadas conforme demanda do mercado.
                  </p>
                </div>
              </div>

              {/* footer */}
              <div className="px-6 md:px-7 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Demonstração guiada em minutos, com foco no seu perfil.
                </p>
                <a
                  href="#demonstracao"
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition"
                >
                  Ver na prática
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
