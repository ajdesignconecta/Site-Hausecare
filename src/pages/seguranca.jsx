import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

const TABS = [
  { id: "permissoes", label: "Permissões" },
  { id: "auditoria", label: "Auditoria" },
  { id: "lgpd", label: "LGPD" },
  { id: "retencao", label: "Backups & Retenção" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ShieldIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M7 11V8a5 5 0 0110 0v3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="6"
        y="11"
        width="12"
        height="10"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function LogIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M6 4h12v16H6z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DatabaseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="2" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" stroke="currentColor" strokeWidth="2" />
      <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function MiniBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
      {children}
    </span>
  );
}

function FeatureBullet({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-2 w-2 rounded-full bg-[#2b908a]" aria-hidden="true" />
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </li>
  );
}

function AuditLine({ label, meta, tone = "emerald" }) {
  const toneMap = {
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-700",
    rose: "bg-rose-500/10 border-rose-500/20 text-rose-700",
    slate: "bg-slate-500/10 border-slate-500/20 text-slate-700",
  };
  return (
    <div className="flex items-start gap-3">
      <div className={cx("mt-1.5 h-2.5 w-2.5 rounded-full border", toneMap[tone])} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate">{label}</p>
        <p className="text-xs text-slate-500">{meta}</p>
      </div>
    </div>
  );
}

export default function SecurityEnterpriseSection() {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState("auditoria");

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const content = useMemo(
    () => ({
      permissoes: {
        icon: LockIcon,
        kicker: "Controle de acesso inteligente",
        title: "Permissões por perfil — sem “terra de ninguém”",
        subtitle:
          "Cada pessoa vê apenas o que precisa. Você reduz risco, melhora governança e evita erros operacionais.",
        bullets: [
          "Perfis por função (gestor, coordenação, financeiro, profissional).",
          "Acesso segmentado por módulo, paciente e operação.",
          "Menos retrabalho: fluxo de trabalho fica padronizado.",
          "Base para crescimento sem perder controle.",
        ],
        proofTitle: "O que isso evita na prática",
        proofBullets: [
          "Edição indevida de informações clínicas.",
          "Acesso a dados sensíveis fora do necessário.",
          "Processos “paralelos” fora do sistema.",
        ],
        audit: [
          { label: "Permissão atualizada: Financeiro → leitura", meta: "Usuário: Gestor • Hoje • 09:12", tone: "indigo" },
          { label: "Perfil atribuído: Coordenação Clínica", meta: "Usuário: Admin • Hoje • 09:10", tone: "emerald" },
          { label: "Acesso negado: módulo restrito", meta: "Usuário: Profissional • Hoje • 09:08", tone: "slate" },
        ],
      },
      auditoria: {
        icon: LogIcon,
        kicker: "Rastreabilidade e conformidade",
        title: "Auditoria operacional que fecha a conta do “quem fez o quê”",
        subtitle:
          "Em saúde, confiança não é discurso — é registro. O Hausecare reforça rastreabilidade para reduzir risco clínico e jurídico.",
        bullets: [
          "Trilha de ações: alterações, registros, finalizações e validações.",
          "Registro de contexto (usuário, data/hora, ação).",
          "Validações operacionais (ex.: senha do atendimento para evoluir).",
          "Pronto para auditoria interna e padronização de qualidade.",
        ],
        proofTitle: "Por que gestor gosta disso",
        proofBullets: [
          "Menos contestação de atendimento e divergência de registro.",
          "Evidência clara em revisões e auditorias.",
          "Mais controle sem virar microgestão.",
        ],
        audit: [
          { label: "Evolução registrada com validação", meta: "Profissional • Atendimento #A219 • 14:37", tone: "emerald" },
          { label: "Atendimento finalizado", meta: "Status: concluído • 14:35", tone: "indigo" },
          { label: "Plano terapêutico atualizado", meta: "Coordenação • 10:18", tone: "slate" },
          { label: "Tentativa bloqueada: senha inválida", meta: "Segurança • 10:12", tone: "rose" },
        ],
      },
      lgpd: {
        icon: ShieldIcon,
        kicker: "Privacidade por design",
        title: "LGPD: menos exposição, mais responsabilidade",
        subtitle:
          "Você precisa operar com dados sensíveis sem virar refém do risco. A abordagem aqui é: acesso mínimo necessário + rastreabilidade + transparência.",
        bullets: [
          "Minimização de acesso: cada perfil vê o necessário.",
          "Gestão de consentimento/processos internos (base para políticas).",
          "Rastreabilidade para apuração de incidentes.",
          "Documentação e alinhamento com boas práticas de segurança.",
        ],
        proofTitle: "Objeções que isso resolve",
        proofBullets: [
          "“Quem acessou esse prontuário?”",
          "“Como eu provo que foi registrado corretamente?”",
          "“Consigo padronizar sem travar a operação?”",
        ],
        audit: [
          { label: "Acesso registrado: prontuário consultado", meta: "Coordenação • 08:44", tone: "indigo" },
          { label: "Exportação gerada: relatório operacional", meta: "Gestor • 08:40", tone: "slate" },
          { label: "Acesso bloqueado: perfil sem permissão", meta: "Profissional • 08:36", tone: "emerald" },
        ],
      },
      retencao: {
        icon: DatabaseIcon,
        kicker: "Resiliência operacional",
        title: "Backups e retenção: operação que não para",
        subtitle:
          "Saúde não pode depender de “sorte”. Estruture a rotina de segurança para preservar integridade e continuidade do serviço.",
        bullets: [
          "Rotinas operacionais de backup e retenção (camada de resiliência).",
          "Planejamento de restauração (quando precisa, precisa rápido).",
          "Visibilidade de dados críticos e relatórios exportáveis.",
          "Base para governança enterprise e compliance.",
        ],
        proofTitle: "O que isso protege",
        proofBullets: [
          "Histórico clínico e evolução do paciente.",
          "Registros financeiros e folha.",
          "Evidências para auditoria e gestão.",
        ],
        audit: [
          { label: "Backup operacional concluído", meta: "Rotina automática • 03:00", tone: "emerald" },
          { label: "Retenção aplicada: logs de ações", meta: "Governança • 02:45", tone: "indigo" },
          { label: "Exportação: relatório DRE", meta: "Financeiro • 17:22", tone: "slate" },
        ],
      },
    }),
    []
  );

  const current = content[activeTab];
  const CurrentIcon = current.icon;

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    let ctx;
    (async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;

      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch (e) {}

      const root = rootRef.current;
      if (!root) return;

      ctx = gsap.context(() => {
        gsap.set(".sec-enter", { autoAlpha: 0, y: 14 });

        gsap.to(".sec-enter", {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root, start: "top 72%" },
        });

        gsap.fromTo(
          ".sec-orb",
          { autoAlpha: 0.18, scale: 0.96 },
          {
            autoAlpha: 0.32,
            scale: 1.04,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }
        );
      }, rootRef);
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [prefersReducedMotion]);

  // Anima a troca do painel (tab switch)
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    let killed = false;
    (async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap || gsapModule.default;
      const el = panelRef.current;
      if (!el || killed) return;

      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 8, filter: "blur(4px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.42, ease: "power3.out" }
      );
    })();

    return () => {
      killed = true;
    };
  }, [activeTab, prefersReducedMotion]);

  return (
    <section
      ref={rootRef}
      id="seguranca"
      aria-labelledby="security-title"
      className="relative overflow-hidden py-20 md:py-24 bg-white"
    >
      {/* Background premium (saúde: claro, mas vivo) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 15% 20%, rgba(43,144,138,0.12), transparent 60%), radial-gradient(820px 520px at 85% 35%, rgba(99,102,241,0.10), transparent 60%), linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 60%)",
        }}
      />
      <div aria-hidden="true" className="sec-orb pointer-events-none absolute -top-24 left-10 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(54,194,147,0.35), transparent 65%)" }}
      />
      <div aria-hidden="true" className="sec-orb pointer-events-none absolute top-28 right-[-80px] h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), transparent 65%)" }}
      />

      <div className="relative container-hc mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="sec-enter flex items-center justify-center gap-2">
            <MiniBadge>Saúde exige governança</MiniBadge>
            <MiniBadge>Auditoria</MiniBadge>
            <MiniBadge>LGPD</MiniBadge>
          </div>

          <h2
            id="security-title"
            className="sec-enter mt-5 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            style={{ letterSpacing: "-0.02em" }}
          >
            Segurança e conformidade sem travar a operação
          </h2>

          <p className="sec-enter mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            “Seguro” não é frase bonita — é processo. O Hausecare foi desenhado para dar controle,
            rastreabilidade e previsibilidade (sem burocratizar o dia a dia da clínica).
          </p>
        </div>

        {/* Console */}
        <div className="mt-12 grid lg:grid-cols-[360px_1fr] gap-8 items-start">
          {/* Left: console tabs */}
          <aside className="sec-enter lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Governance Console
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Troque de área e veja como a governança funciona na prática.
                </p>
              </div>

              <div className="p-4 space-y-2">
                {TABS.map((t) => {
                  const active = t.id === activeTab;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id)}
                      className={cx(
                        "w-full text-left rounded-2xl px-4 py-3 border transition flex items-center justify-between gap-3",
                        active
                          ? "bg-slate-900 text-white border-slate-900 shadow"
                          : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                      )}
                      aria-pressed={active}
                    >
                      <span className="font-semibold">{t.label}</span>
                      <span
                        className={cx(
                          "text-xs font-semibold rounded-full px-2 py-1 border",
                          active
                            ? "border-white/20 text-white/80 bg-white/10"
                            : "border-slate-200 text-slate-500 bg-slate-50"
                        )}
                      >
                        ver detalhes
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-5 border-t border-slate-200 bg-slate-50">
                <p className="text-xs font-semibold text-slate-700">Mensagem para gestor</p>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Cresceu equipe? Cresceu risco. A governança certa te dá escala com controle — sem virar refém de planilhas.
                </p>
              </div>
            </div>
          </aside>

          {/* Right: active panel */}
          <div className="sec-enter">
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
              <div className="p-6 md:p-7 border-b border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl border border-slate-200 bg-white flex items-center justify-center">
                    <CurrentIcon className="h-6 w-6 text-slate-900" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {current.kicker}
                    </p>
                    <h3 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      {current.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div ref={panelRef} className="p-6 md:p-7">
                <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                  {/* bullets */}
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      O que entra no “modo enterprise”
                    </p>
                    <ul className="mt-4 space-y-3">
                      {current.bullets.map((b) => (
                        <FeatureBullet key={b}>{b}</FeatureBullet>
                      ))}
                    </ul>

                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-extrabold text-slate-900">{current.proofTitle}</p>
                      <ul className="mt-3 space-y-2">
                        {current.proofBullets.map((b) => (
                          <li key={b} className="text-sm text-slate-700 leading-relaxed">
                            <span className="font-semibold text-slate-900">•</span> {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a
                        href="#contato"
                        className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
                        style={{ background: "linear-gradient(90deg, #2b908a, #36C293)" }}
                      >
                        Agendar demonstração
                      </a>
                      <a
                        href="/planos"
                        className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-800"
                      >
                        Ver planos
                      </a>
                    </div>
                  </div>

                  {/* audit timeline */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-extrabold text-slate-900">Trilha de auditoria</p>
                      <span className="text-xs font-semibold text-slate-500">
                        exemplos ilustrativos
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {current.audit.map((x) => (
                        <AuditLine
                          key={x.label}
                          label={x.label}
                          meta={x.meta}
                          tone={x.tone}
                        />
                      ))}
                    </div>

                    <div className="mt-5 pt-5 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-700">
                        Observação importante
                      </p>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        A implementação e detalhamento de políticas (ex.: retenção/logs) pode variar por plano e
                        configuração da clínica. O foco é manter governança forte sem travar a operação.
                      </p>
                    </div>
                  </div>
                </div>

                {/* micro FAQ (anti-objeção) */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-extrabold text-slate-900">Serve para quantos usuários?</p>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Escala por plano. O importante: permissões e rastreabilidade continuam consistentes conforme a equipe cresce.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-extrabold text-slate-900">Consigo exportar dados?</p>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Sim. Relatórios e exportações ajudam auditoria, conciliação financeira e revisões internas.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-extrabold text-slate-900">Implantação é rápida?</p>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      O onboarding foca no essencial: equipe, agenda, pacientes e financeiro. Você começa com controle e evolui por camadas.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* trust line pequena */}
            <div className="mt-4 text-center text-xs text-slate-500">
              Controle por perfis • Auditoria de ações • Validações operacionais • Base para LGPD
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
