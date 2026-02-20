import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

try {
  gsap.registerPlugin(ScrollTrigger);
} catch (e) {}

const PERSONAS = [
  {
    id: "clinica",
    label: "Clinicas",
    badge: "Clinicas de Home Care",
    headline: "Padronize a operacao - do cadastro ao faturamento",
    pain: "Equipe cresce, processos divergem e a visibilidade do que acontece no dia some.",
    gain: "Operacao centralizada em tempo real com prontuario, agenda, rotas e financeiro no mesmo fluxo.",
    bullets: [
      "Atendimentos do dia + status em andamento",
      "Prontuario digital e plano terapeutico por paciente",
      "Agenda e rotas integradas a operacao",
      "Relatorios e visao financeira para decisao rapida",
    ],
  },
  {
    id: "gestor",
    label: "Operacao",
    badge: "Gestor Operacional",
    headline: "Controle e previsibilidade (sem microgerenciar)",
    pain: "Fluxo espalhado em conversas, planilhas e confirmacoes manuais - vira retrabalho.",
    gain: "Painel de execucao com gargalos, SLA e rastreabilidade. Menos ruido, mais entrega.",
    bullets: [
      "Visao por profissional / periodo",
      "SLA, status e tempo medio por atendimento",
      "Rotas e deslocamentos organizados por dia",
      "Padrao operacional em toda a equipe",
    ],
  },
  {
    id: "coordenacao",
    label: "Clinico",
    badge: "Coordenacao Clinica",
    headline: "Qualidade clinica com rastreabilidade e padrao",
    pain: "Evolucoes inconsistentes e ausencia de auditoria aumentam risco clinico/juridico.",
    gain: "Registro seguro e rastreavel: prontuario, evolucao e plano terapeutico com controle.",
    bullets: [
      "Historico completo por paciente",
      "Plano terapeutico com frequencia e vinculo",
      "Evolucao protegida por senha do atendimento",
      "Trilha auditavel para governanca",
    ],
  },
  {
    id: "financeiro",
    label: "Financeiro",
    badge: "Financeiro / Administrativo",
    headline: "Feche contas com clareza - e pague certo, na hora certa",
    pain: "Receitas, despesas e pagamentos separados em planilhas e ferramentas desconectadas.",
    gain: "Relatorios financeiros e folha por profissional com visao consolidada e exportavel.",
    bullets: [
      "Receitas, despesas, extrato e DRE gerencial",
      "Folha de pagamento por profissional e periodo",
      "Exportacao CSV e relatorios para conciliacao",
      "Governanca financeira com previsibilidade",
    ],
  },
];

const ECOSYSTEM = [
  { name: "WhatsApp", status: "Roadmap", note: "Notificacoes e fluxos de atendimento" },
  { name: "Google Calendar", status: "Roadmap", note: "Sincronizacao de agenda" },
  { name: "Maps / Rotas", status: "Disponivel", note: "Rotas e deslocamentos na operacao" },
  { name: "Exportacao CSV", status: "Disponivel", note: "Relatorios e dados para analise" },
  { name: "API", status: "Roadmap", note: "Integracoes com sistemas internos" },
  { name: "Asaas / Stripe", status: "Roadmap", note: "Cobranca e assinaturas" },
];

function StatusDot({ status }) {
  const map = {
    Disponivel: "bg-emerald-400 shadow-[0_0_0_6px_rgba(74,222,128,0.14)]",
    Roadmap: "bg-cyan-400 shadow-[0_0_0_6px_rgba(34,211,238,0.14)]",
    Beta: "bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.14)]",
  };
  return <span className={`h-2.5 w-2.5 rounded-full ${map[status] || "bg-slate-400"}`} />;
}

export default function IntegrationsSection() {
  const rootRef = useRef(null);
  const dialRef = useRef(null);
  const handRef = useRef(null);
  const contentRef = useRef(null);
  const nodesRef = useRef([]);
  const [activeId, setActiveId] = useState(PERSONAS[0].id);

  const active = useMemo(() => PERSONAS.find((p) => p.id === activeId) || PERSONAS[0], [activeId]);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(".sw-kicker, .sw-title, .sw-subtitle", { autoAlpha: 0, y: 28, filter: "blur(8px)" });
      gsap.set(".sw-glass", {
        autoAlpha: 0,
        y: 34,
        scale: 0.985,
        rotateX: 6,
        transformPerspective: 1200,
        transformOrigin: "50% 0%",
      });
      gsap.set(".sw-wire, .sw-wire-glow", { strokeDasharray: 1200, strokeDashoffset: 1200 });
      gsap.set(".sw-node", { scale: 0.6, autoAlpha: 0 });
      gsap.set(".sw-glow-orb", { autoAlpha: 0, scale: 0.84 });
      gsap.set(".sw-chip", { autoAlpha: 0, y: 18 });

      const revealTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: el, start: "top 76%", once: true },
      });

      revealTl
        .to(".sw-glow-orb", { autoAlpha: 1, scale: 1, duration: 1.2, stagger: 0.15 })
        .to(
          ".sw-kicker, .sw-title, .sw-subtitle",
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.95, stagger: 0.08 },
          "-=1"
        )
        .to(".sw-glass", { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 1.05, stagger: 0.1 }, "-=0.7")
        .to(".sw-chip", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, "-=0.75")
        .to(".sw-wire", { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" }, "-=0.5")
        .to(".sw-wire-glow", { strokeDashoffset: 0, duration: 1.35, ease: "power2.out" }, "<")
        .to(".sw-node", { autoAlpha: 1, scale: 1, duration: 0.55, ease: "back.out(1.8)", stagger: 0.06 }, "-=0.85");

      if (dialRef.current) {
        gsap.to(dialRef.current, {
          rotate: 360,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
      }

      gsap.to(".sw-hand-glow", {
        opacity: 1,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Avoid wheel jitter with scrub + backdrop blur by keeping cards off scroll-scrub.
      gsap.to(".sw-panel-left", {
        y: -8,
        duration: 6.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".sw-panel-right", {
        y: 8,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".sw-bg-parallax", {
        yPercent: -6,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          fastScrollEnd: true,
        },
      });

      gsap.to(".sw-scan-line", {
        xPercent: 220,
        duration: 3.8,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".sw-wire-glow", {
        stroke: "rgba(56,189,248,0.95)",
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const wrap = contentRef.current;
    if (!wrap) return;

    const idx = PERSONAS.findIndex((p) => p.id === activeId);
    const angles = [0, 90, 180, 270];
    const targetRot = angles[idx] ?? 0;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (handRef.current) gsap.set(handRef.current, { rotate: targetRot });
      return;
    }

    const tl = gsap.timeline();

    tl.to(wrap, { autoAlpha: 0, y: 14, duration: 0.17, ease: "power2.out" })
      .set(wrap, { y: -12 })
      .to(wrap, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out" });

    if (handRef.current) {
      gsap.to(handRef.current, {
        rotate: targetRot,
        duration: 0.78,
        ease: "power4.out",
      });
    }

    const btn = rootRef.current?.querySelector(`[data-persona='${activeId}']`);
    if (btn) {
      gsap.fromTo(btn, { scale: 0.96 }, { scale: 1, duration: 0.35, ease: "back.out(2)" });
    }

    if (nodesRef.current?.length) {
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { filter: "drop-shadow(0 0 0px rgba(56,189,248,0))" },
          {
            filter: "drop-shadow(0 0 18px rgba(56,189,248,0.35))",
            duration: 0.28,
            delay: i * 0.03,
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
      className="relative isolate overflow-hidden bg-[#040f1f]"
    >
      <div className="sw-bg-parallax pointer-events-none absolute inset-0 opacity-90">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-500/30 blur-[120px]" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
      </div>

      <div className="sw-glow-orb pointer-events-none absolute -top-20 left-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-[140px]" />
      <div className="sw-glow-orb pointer-events-none absolute -right-20 top-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
        <header className="text-center">
          <div className="sw-kicker inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-cyan-100 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Intelligent Switchboard
          </div>

          <h2
            id="switchboard-title"
            className="sw-title mt-6 text-3xl font-black tracking-[-0.03em] text-white md:text-5xl"
          >
            Uma experiencia SaaS com
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              foco total em operacao
            </span>
          </h2>

          <p className="sw-subtitle mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
            Escolha um perfil e veja o painel mudar em tempo real com profundidade, luz, feedback e clareza
            de decisao.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {["Real-time UX", "Clinical-grade", "Ops + Finance", "Enterprise visual"].map((chip) => (
              <span
                key={chip}
                className="sw-chip rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
              >
                {chip}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-12">
          <div className="sw-panel-left lg:col-span-5">
            <div className="sw-glass relative overflow-hidden rounded-[30px] border border-white/15 bg-white/[0.06] shadow-[0_30px_90px_rgba(2,8,23,0.65)] backdrop-blur-2xl">
              <div className="sw-scan-line pointer-events-none absolute left-[-40%] top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />

              <div className="border-b border-white/10 p-6">
                <p className="text-sm font-bold text-cyan-100">Control Matrix</p>
                <p className="mt-1 text-xs text-slate-300">Interaja com um perfil e observe o impacto no painel.</p>
              </div>

              <div className="p-6">
                <div className="relative mx-auto h-[280px] w-[280px]">
                  <div
                    ref={dialRef}
                    className="sw-dial-ring absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(34,211,238,0.75), rgba(56,189,248,0.28), rgba(99,102,241,0.7), rgba(16,185,129,0.55), rgba(34,211,238,0.75))",
                      filter: "drop-shadow(0 0 26px rgba(56,189,248,0.32))",
                    }}
                  />
                  <div className="absolute inset-[11px] rounded-full border border-cyan-200/20 bg-[#061326]/85" />
                  <div className="absolute inset-[24px] rounded-full border border-white/10 bg-[#07182f]/90 shadow-inner shadow-cyan-900/30" />

                  <div
                    ref={handRef}
                    className="absolute left-1/2 top-1/2 origin-bottom"
                    style={{ width: 4, height: 114, transform: "translate(-50%, -100%) rotate(0deg)" }}
                  >
                    <div
                      className="sw-hand-glow absolute -bottom-6 left-1/2 h-[120px] w-[4px] -translate-x-1/2 rounded-full"
                      style={{
                        background: "linear-gradient(180deg, rgba(103,232,249,0.1), rgba(56,189,248,0.95))",
                        boxShadow: "0 0 16px rgba(56,189,248,0.6)",
                        opacity: 0.58,
                      }}
                    />
                    <div
                      className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300"
                      style={{ boxShadow: "0 0 18px rgba(34,211,238,0.7)" }}
                    />
                  </div>

                  <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200/20 bg-[#031023]">
                    <div className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_0_8px_rgba(16,185,129,0.18)]" />
                  </div>

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
                          data-persona={p.id}
                          className={[
                            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-semibold transition-all duration-300 border",
                            isActive
                              ? "border-cyan-200/50 bg-cyan-300/20 text-cyan-50 shadow-[0_10px_30px_rgba(56,189,248,0.35)]"
                              : "border-white/15 bg-white/5 text-slate-300 hover:border-cyan-200/30 hover:text-white",
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

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Perfil ativo</p>
                  <p className="mt-1 text-sm font-semibold text-white">{active.badge}</p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://wa.me/5561992064157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-cyan-200/50 bg-gradient-to-r from-cyan-400 to-sky-400 px-4 py-3 text-sm font-bold text-slate-900 transition hover:brightness-110"
                  >
                    Solicitar demo
                  </a>
                  <a
                    href="#inicio"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Voltar ao topo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="sw-panel-right lg:col-span-7">
            <div className="sw-glass relative overflow-hidden rounded-[30px] border border-white/15 bg-white/[0.07] shadow-[0_30px_90px_rgba(2,8,23,0.7)] backdrop-blur-2xl">
              <div className="border-b border-white/10 p-6 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">Live Console</p>
                    <h3 className="mt-1 text-2xl font-black tracking-tight text-white md:text-3xl">{active.badge}</h3>
                    <p className="mt-2 max-w-xl text-sm text-slate-300 md:text-[15px]">{active.headline}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100">
                    System online
                  </div>
                </div>
              </div>

              <div ref={contentRef} className="p-6 md:p-7">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-rose-300/20 bg-rose-300/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-200">Dor que trava</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">{active.pain}</p>
                  </div>

                  <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">Ganho com o Hausecare</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-100">{active.gain}</p>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-sm font-bold text-white">O que essa area ve na pratica:</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {active.bullets.map((b) => (
                      <div
                        key={b}
                        className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 shadow-[0_10px_25px_rgba(2,8,23,0.25)]"
                      >
                        <div className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span className="leading-relaxed">{b}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-white/15 bg-[#051427]/70 p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-white">Integracoes e ecossistema</p>
                      <p className="mt-1 text-xs text-slate-300">Roadmap honesto: o que ja existe + o que esta em evolucao.</p>
                    </div>
                    <a
                      href="https://wa.me/5561992064157"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
                    >
                      Agendar demo
                    </a>
                  </div>

                  <div className="mt-5">
                    <svg className="w-full h-[74px]" viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="swWireGradient" x1="20" y1="60" x2="780" y2="60" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="50%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                      <path
                        className="sw-wire"
                        d="M20 60 C 120 10, 220 110, 320 60 S 520 10, 620 60 S 720 110, 780 60"
                        stroke="rgba(148,163,184,0.4)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        className="sw-wire-glow"
                        d="M20 60 C 120 10, 220 110, 320 60 S 520 10, 620 60 S 720 110, 780 60"
                        stroke="url(#swWireGradient)"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 12px rgba(56,189,248,0.4))" }}
                      />
                      {[60, 190, 320, 450, 580, 710].map((x, i) => (
                        <g key={x} ref={(el) => (nodesRef.current[i] = el)} className="sw-node">
                          <circle cx={x} cy={60} r={7} fill="#38bdf8" />
                          <circle cx={x} cy={60} r={16} fill="rgba(56,189,248,0.16)" />
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {ECOSYSTEM.map((it) => (
                      <div
                        key={it.name}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-cyan-200/30 hover:bg-white/[0.08]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-100">{it.name}</p>
                            <p className="mt-0.5 text-xs text-slate-300">{it.note}</p>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2">
                            <StatusDot status={it.status} />
                            <span className="text-xs font-semibold text-slate-200">{it.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-[11px] text-slate-400">
                    *Integracoes em Roadmap sao planejadas e priorizadas conforme demanda do mercado.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.03] px-6 py-4 md:px-7">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <p className="text-sm text-slate-300">Demonstracao guiada em minutos, com foco no seu perfil.</p>
                  <a
                    href="#demonstracao"
                    className="inline-flex items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
                  >
                    Ver na pratica
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #integracoes {
          background-image:
            radial-gradient(1200px 420px at 50% -10%, rgba(56, 189, 248, 0.12), transparent 60%),
            linear-gradient(180deg, #040f1f 0%, #031225 52%, #05162b 100%);
        }

        #integracoes::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at 50% 35%, black, transparent 80%);
          opacity: 0.22;
        }
      `}</style>
    </section>
  );
}
