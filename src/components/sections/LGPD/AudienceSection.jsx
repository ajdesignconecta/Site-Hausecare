// src/components/sections/AudienceSection.jsx
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

const PERSONAS = [
  {
    key: "clinicas",
    label: "Clínicas de Home Care",
    eyebrow: "Visão do negócio",
    pain: "Operação crescendo e tudo virando planilha + WhatsApp.",
    gain: "Centralize atendimentos, equipe e pacientes em um só sistema — com controle e previsibilidade.",
    bullets: [
      "Dashboard do dia + status em tempo real (em andamento / concluído).",
      "Prontuário e plano terapêutico organizados por paciente, sem retrabalho.",
    ],
    proof: "Controle total da operação, do paciente ao faturamento.",
    accent: "#2b908a",
  },
  {
    key: "operacao",
    label: "Gestão Operacional",
    eyebrow: "Execução no campo",
    pain: "Dificuldade para acompanhar o que está acontecendo agora — e agir rápido.",
    gain: "Acompanhe atendimentos em tempo real, organize agendas, rotas e produtividade da equipe.",
    bullets: [
      "Próximos atendimentos e acompanhamento de execução em tempo real.",
      "Rotas e deslocamentos organizados para reduzir atrasos e gargalos.",
    ],
    proof: "Menos ruído. Mais SLA e previsibilidade.",
    accent: "#34d399",
  },
  {
    key: "coordenacao",
    label: "Coordenação Clínica",
    eyebrow: "Qualidade e padronização",
    pain: "Evoluções clínicas inconsistentes e histórico difícil de auditar.",
    gain: "Padronize registros, garanta rastreabilidade e mantenha a qualidade clínica sob controle.",
    bullets: [
      "Evolução vinculada ao atendimento com autenticação (senha do atendimento).",
      "Histórico completo por paciente, com rastreabilidade e consistência.",
    ],
    proof: "Registro seguro e auditável, pronto para governança clínica.",
    accent: "#6366f1",
  },
  {
    key: "financeiro",
    label: "Financeiro & Administrativo",
    eyebrow: "Controle e fechamento",
    pain: "Conferência manual, pagamentos confusos e falta de visão real do caixa.",
    gain: "Automatize relatórios e saiba exatamente quanto pagar (e quando) para cada profissional.",
    bullets: [
      "Receitas, despesas, extratos e DRE em relatórios claros e exportáveis.",
      "Folha por profissional com retenções e total líquido calculado.",
    ],
    proof: "Fechamento mais rápido, menos erro e mais governança.",
    accent: "#f43f5e",
  },
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// Garante 1 frame para o DOM “pintar” antes de medir/selecionar elementos
function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

export default function AudienceSection() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef(null);
  const listWrapRef = useRef(null);
  const indicatorRef = useRef(null);
  const panelRef = useRef(null);
  const itemRefs = useRef([]);

  // Cache do GSAP (evita reimportar a cada clique)
  const gsapRef = useRef(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const activePersona = PERSONAS[active];

  const moveIndicatorTo = (index, gsap) => {
    const wrap = listWrapRef.current;
    const indicator = indicatorRef.current;
    const el = itemRefs.current[index];

    if (!wrap || !indicator || !el || !gsap) return;

    const wrapRect = wrap.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const top = elRect.top - wrapRect.top;
    const height = elRect.height;

    gsap.to(indicator, {
      y: top,
      height,
      duration: prefersReducedMotion ? 0 : 0.35,
      ease: "power3.out",
    });
  };

  const animatePanelSwap = async (nextIndex) => {
    if (nextIndex === active) return;
    if (isAnimating) return;

    if (prefersReducedMotion) {
      setActive(nextIndex);
      return;
    }

    setIsAnimating(true);

    // Usa GSAP cacheado
    let gsap = gsapRef.current;
    if (!gsap) {
      const gsapModule = await import("gsap");
      gsap = gsapModule.gsap || gsapModule.default;
      gsapRef.current = gsap;
    }

    const panel = panelRef.current;
    if (!panel) {
      setActive(nextIndex);
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => setIsAnimating(false),
    });

    tl.to(panel, { autoAlpha: 0, y: 10, duration: 0.18, ease: "power2.in" })
      .add(() => setActive(nextIndex))
      // Garante que o React renderizou o conteúdo novo antes do querySelectorAll
      .add(async () => {
        await nextFrame();
      })
      .to(panel, { autoAlpha: 1, y: 0, duration: 0.26 })
      .add(
        () => {
          const nodes = panel.querySelectorAll(".psw-anim");
          gsap.fromTo(
            nodes,
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.28,
              stagger: 0.06,
              ease: "power2.out",
            }
          );
        },
        "<"
      );

    moveIndicatorTo(nextIndex, gsap);
  };

  useLayoutEffect(() => {
    let ctx;
    let cleanup = () => {};

    (async () => {
      // Carrega GSAP só uma vez
      let gsap = gsapRef.current;
      if (!gsap) {
        const gsapModule = await import("gsap");
        gsap = gsapModule.gsap || gsapModule.default;
        gsapRef.current = gsap;
      }

      const stModule = await import("gsap/ScrollTrigger");
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const root = sectionRef.current;
      if (!root) return;

      ctx = gsap.context(() => {
        if (prefersReducedMotion) return;

        gsap.fromTo(
          root.querySelectorAll(".psw-enter"),
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              once: true,
            },
          }
        );

        const glow = root.querySelector(".psw-glow");
        if (glow) {
          gsap.fromTo(
            glow,
            { autoAlpha: 0, scale: 0.98 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: root,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      }, sectionRef);

      // posiciona indicador inicial de forma mais confiável (após 1 frame)
      await nextFrame();
      moveIndicatorTo(active, gsap);

      const onResize = () => moveIndicatorTo(active, gsap);
      window.addEventListener("resize", onResize);

      cleanup = () => window.removeEventListener("resize", onResize);
    })();

    return () => {
      cleanup();
      if (ctx) ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDownItem = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      animatePanelSwap(idx);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = clamp(idx + 1, 0, PERSONAS.length - 1);
      itemRefs.current[next]?.focus?.();
      animatePanelSwap(next);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = clamp(idx - 1, 0, PERSONAS.length - 1);
      itemRefs.current[prev]?.focus?.();
      animatePanelSwap(prev);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-6 md:py-24 bg-white"
      aria-labelledby="audience-title"
    >
      {/* glow premium */}
      <div
        className="psw-glow pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(900px 360px at 18% 20%, rgba(43,144,138,0.12), transparent 58%), radial-gradient(800px 380px at 85% 55%, rgba(99,102,241,0.10), transparent 62%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative">
        <header id="para-quem-e" className="text-center mb-14 scroll-mt-28">
          <div className="psw-enter inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Segmentação inteligente
          </div>
          <h2
            id="audience-title"
            className="psw-enter text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Central de controle da operação — em tempo real
          </h2>
          <p className="psw-enter text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed mt-4">
            Visualize atendimentos, agenda, equipe e financeiro em um único
            painel. Menos improviso, mais rastreabilidade e decisões rápidas.
          </p>
        </header>

        {/* Switchboard */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-10 items-start">
          {/* Lista (não card) */}
          <div className="psw-enter">
            <div className="relative">
              {/* “trilho” do indicador */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px bg-slate-200"
                aria-hidden="true"
              />
              <div
                ref={indicatorRef}
                className="absolute left-0 top-0 w-[3px] rounded-full"
                aria-hidden="true"
                style={{
                  background: activePersona.accent,
                  height: 44,
                  transform: "translateY(0px)",
                  boxShadow: `0 10px 30px ${activePersona.accent}35`,
                }}
              />

              <div
                ref={listWrapRef}
                className="pl-5 flex flex-col gap-2"
                role="listbox"
                aria-label="Selecione um perfil"
              >
                {PERSONAS.map((p, idx) => {
                  const isActive = idx === active;
                  return (
                    <button
                      key={p.key}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onKeyDown={(e) => onKeyDownItem(e, idx)}
                      onClick={() => animatePanelSwap(idx)}
                      className={[
                        "group w-full text-left rounded-xl px-4 py-3 transition",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
                        isActive
                          ? "bg-slate-900 text-white shadow-lg shadow-black/10"
                          : "bg-white hover:bg-slate-50 text-slate-900",
                      ].join(" ")}
                      style={
                        isActive
                          ? { border: `1px solid ${p.accent}40` }
                          : { border: "1px solid rgba(148,163,184,0.25)" }
                      }
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p
                            className={[
                              "text-[13px] font-semibold uppercase tracking-wide",
                              isActive ? "text-white/70" : "text-slate-500",
                            ].join(" ")}
                          >
                            {p.eyebrow}
                          </p>
                          <p className="text-base font-semibold leading-snug">
                            {p.label}
                          </p>
                        </div>

                        <span
                          className={[
                            "h-2.5 w-2.5 rounded-full shrink-0",
                            isActive ? "opacity-100" : "opacity-60",
                          ].join(" ")}
                          style={{ background: p.accent }}
                          aria-hidden="true"
                        />
                      </div>

                      <div
                        className={[
                          "mt-3 h-[2px] w-full rounded-full overflow-hidden",
                          isActive ? "bg-white/10" : "bg-slate-100",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        <span
                          className="block h-full rounded-full transition-all duration-500"
                          style={{
                            width: isActive ? "100%" : "0%",
                            background: p.accent,
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA pequeno (sem poluir) */}
            <div className="mt-6 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                Quer ver isso rodando no seu cenário?
              </span>{" "}
              <a
                href="#contato"
                className="font-semibold underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900"
              >
                Solicitar demonstração
              </a>
            </div>
          </div>

          {/* Painel de conteúdo (1 painel premium, sem card grid) */}
          <div className="psw-enter">
            <div
              className="relative rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.10)] overflow-hidden"
              style={{
                boxShadow: `0 30px 90px rgba(15,23,42,0.10), 0 0 0 1px ${activePersona.accent}22 inset`,
              }}
            >
              {/* topo com “linha” e tags */}
              <div
                className="h-[6px] w-full"
                aria-hidden="true"
                style={{
                  background: `linear-gradient(90deg, ${activePersona.accent}, rgba(15,23,42,0.0))`,
                }}
              />

              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: `${activePersona.accent}14`,
                      color: activePersona.accent,
                      border: `1px solid ${activePersona.accent}2A`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: activePersona.accent }}
                    />
                    {activePersona.label}
                  </span>

                  <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                    Tempo real
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                    Prontuário digital
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                    Agenda & Rotas
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                    Financeiro
                  </span>
                </div>

                <div ref={panelRef}>
                  <h3 className="psw-anim text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activePersona.gain}
                  </h3>

                  <p className="psw-anim text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                    <span className="font-semibold text-slate-900">
                      Dor comum:
                    </span>{" "}
                    {activePersona.pain}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {activePersona.bullets.map((b) => (
                      <li
                        key={b}
                        className="psw-anim flex items-start gap-3 text-slate-700"
                      >
                        <span
                          className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full"
                          style={{
                            background: `${activePersona.accent}14`,
                            border: `1px solid ${activePersona.accent}2A`,
                          }}
                          aria-hidden="true"
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: activePersona.accent }}
                          />
                        </span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="psw-anim mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    style={{
                      boxShadow: `0 0 0 1px ${activePersona.accent}12 inset`,
                    }}
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      Resultado esperado
                    </p>
                    <p className="text-slate-600 leading-relaxed mt-1">
                      {activePersona.proof}
                    </p>
                  </div>

                  <div className="psw-anim mt-8 flex flex-col sm:flex-row gap-3">
                    <a
                      href="#contato"
                      className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110"
                      style={{ background: activePersona.accent }}
                    >
                      Solicitar demonstração
                    </a>
                    <a
                      href="#planos"
                      className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 transition"
                    >
                      Ver planos
                    </a>
                  </div>
                </div>
              </div>

              {/* detalhe “tech” discreto */}
              <div
                className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl opacity-30"
                aria-hidden="true"
                style={{
                  background: `radial-gradient(circle, ${activePersona.accent} 0%, transparent 60%)`,
                }}
              />
            </div>

            {/* hint de acessibilidade */}
            <p className="mt-4 text-xs text-slate-500">
              Dica: use ↑ ↓ e Enter para alternar os perfis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
