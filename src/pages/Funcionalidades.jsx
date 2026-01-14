import React, { useEffect, useMemo, useRef, useState } from "react";

// ========= IMAGENS (conforme seu print) =========
import agendaHausecare from "../assets/imagens/screens/agenda-hausecare.webp";
import rotasImg from "../assets/imagens/screens/rotas.webp";
import prontuarioImg from "../assets/imagens/screens/prontuario.webp";
import evolucaoPacienteImg from "../assets/imagens/screens/Evolucao-paciente.webp";

import resumoFinanceiroImg from "../assets/imagens/screens/resumo-financeiro.webp";
import dreImg from "../assets/imagens/screens/DRE.webp";
import financeiroAutomatizadoImg from "../assets/imagens/screens/finaneiro-automaziado.webp";

import profissionaisImg from "../assets/imagens/screens/profissionais.png";
import conviteProfissionalImg from "../assets/imagens/screens/convite-profissional.webp";

import produtividadeImg from "../assets/imagens/screens/produtividade.webp";
import relatoriosAtendimentoImg from "../assets/imagens/screens/relatorios-atendimento.png";
import relatoriosPacientesImg from "../assets/imagens/screens/relatorios-pacientes.png";

import registroSeguroImg from "../assets/imagens/screens/registro-seguro.webp";
import execucaoSemRetrabalhoImg from "../assets/imagens/screens/execucao-sem-retrabalho.webp";

// ==============================================

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function Funcionalidades() {
  const rootRef = useRef(null);
  const sectionsRef = useRef({}); // id -> element
  const [activeId, setActiveId] = useState("agenda");
  const [activeImage, setActiveImage] = useState(null);
  const [fadeKey, setFadeKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (src) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const modules = useMemo(
    () => [
      {
        id: "agenda",
        label: "Agenda & Rotas",
        kicker: "Operação em campo",
        headline: "Organize a rotina e elimine atrasos com controle em tempo real",
        desc:
          "Visualize atendimentos do dia, status, agenda por profissional e rotas otimizadas. Menos improviso, mais previsibilidade.",
        bullets: [
          "Agenda do dia + próximos atendimentos",
          "Status por atendimento (agendado / em andamento / concluído)",
          "Rotas e deslocamentos com visão geográfica",
          "Menos faltas e menos tempo perdido no campo",
        ],
        proof: "Ideal para quem precisa reduzir atrasos e ganhar eficiência operacional.",
        images: [
          { src: agendaHausecare, label: "Agenda do dia" },
          { src: rotasImg, label: "Rotas e deslocamentos" },
        ],
      },
      {
        id: "prontuario",
        label: "Prontuário digital",
        kicker: "Qualidade clínica",
        headline: "Evolução segura do paciente, com rastreabilidade e padrão",
        desc:
          "Centralize prontuário, plano terapêutico e histórico. O profissional registra a evolução com validação — elevando segurança e confiança.",
        bullets: [
          "Prontuário por paciente com histórico completo",
          "Plano terapêutico integrado (frequência, sessões e responsáveis)",
          "Evolução com validação por senha do atendimento",
          "Auditoria e padrão de registro para reduzir risco clínico/jurídico",
        ],
        proof: "Perfeito para coordenação clínica e auditoria.",
        images: [
          { src: prontuarioImg, label: "Prontuário do paciente" },
          { src: evolucaoPacienteImg, label: "Evolução com validação" },
        ],
      },
      {
        id: "financeiro",
        label: "Financeiro",
        kicker: "Gestão e lucratividade",
        headline: "Receitas, custos, impostos e folha — tudo no mesmo painel",
        desc:
          "Tome decisões com visão real do caixa. Relatórios e folha por profissional deixam claro quanto pagar, quando pagar e por quê.",
        bullets: [
          "Resumo financeiro com visão rápida do período",
          "DRE / extrato com leitura gerencial",
          "Folha por profissional com impostos/retenções",
          "Mais clareza, menos retrabalho e menos risco de erro",
        ],
        proof: "Feito para o financeiro ganhar velocidade sem perder controle.",
        images: [
          { src: resumoFinanceiroImg, label: "Resumo financeiro" },
          { src: dreImg, label: "DRE / extrato" },
          { src: financeiroAutomatizadoImg, label: "Folha por profissional" },
        ],
      },
      {
        id: "equipe",
        label: "Equipe",
        kicker: "Gestão de profissionais",
        headline: "Convide, organize e padronize a equipe por status e especialidade",
        desc:
          "Controle profissionais vinculados à operação e convide novos colaboradores com governança. Menos bagunça, mais escala.",
        bullets: [
          "Gerenciamento por status e especialidade",
          "Filtros rápidos para operação do dia a dia",
          "Convite de profissionais para trabalhar na organização",
          "Padronização da operação sem microgerenciamento",
        ],
        proof: "Perfeito para gestores operacionais e donos de clínica.",
        images: [
          { src: profissionaisImg, label: "Gestão de profissionais" },
          { src: conviteProfissionalImg, label: "Convite de profissional" },
        ],
      },
      {
        id: "relatorios",
        label: "Relatórios",
        kicker: "Indicadores e performance",
        headline: "Métricas para reduzir gargalos e provar resultado",
        desc:
          "Acompanhe produtividade, SLAs e desempenho. Relatórios transformam operação em decisões com dados — e não achismo.",
        bullets: [
          "Produtividade da equipe e distribuição por status",
          "Relatórios de atendimentos e evolução",
          "Visão de pacientes e histórico operacional",
          "Decisão mais rápida com dados confiáveis",
        ],
        proof: "Quando a clínica cresce, relatório deixa de ser luxo e vira sobrevivência.",
        images: [
          { src: produtividadeImg, label: "Produtividade" },
          { src: relatoriosAtendimentoImg, label: "Relatórios de atendimentos" },
          { src: relatoriosPacientesImg, label: "Relatórios de pacientes" },
        ],
      },
      {
        id: "seguranca",
        label: "Segurança & Auditoria",
        kicker: "Governança e conformidade",
        headline: "Controle de acesso, validações e rastreabilidade para saúde",
        desc:
          "Em saúde, não basta funcionar — precisa ser confiável. O Hausecare adiciona camadas de validação e registro para reduzir risco.",
        bullets: [
          "Registro seguro e padronizado",
          "Validações operacionais (ex.: senha de atendimento)",
          "Trilha de responsabilidade (quem fez, quando fez)",
          "Base para LGPD, auditoria e governança enterprise",
        ],
        proof: "Confiança operacional e clínica, sem burocracia.",
        images: [
          { src: registroSeguroImg, label: "Registro seguro" },
          { src: execucaoSemRetrabalhoImg, label: "Execução sem retrabalho" },
          { src: evolucaoPacienteImg, label: "Validação por senha" },
        ],
      },
    ],
    []
  );

  // Primeira imagem padrão
  useEffect(() => {
    const first = modules.find((m) => m.id === activeId) || modules[0];
    setActiveImage(first?.images?.[0]?.src || null);
  }, [modules]); // eslint-disable-line

  // Scroll Spy (troca módulo ativo conforme rola)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        // pega o mais visível
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (!visible) return;

        const id = visible.target.getAttribute("data-module-id");
        if (!id) return;

        setActiveId((prev) => (prev === id ? prev : id));
      },
      {
        root: null,
        threshold: prefersReduced ? 0.35 : [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    modules.forEach((m) => {
      const el = sectionsRef.current[m.id];
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [modules]);

  // Troca “preview” quando muda o módulo ativo (crossfade)
  useEffect(() => {
    const mod = modules.find((m) => m.id === activeId);
    if (!mod) return;

    // sempre mostra a primeira imagem do módulo ao trocar
    const next = mod.images?.[0]?.src || null;

    setFadeKey((k) => k + 1);
    setActiveImage(next);
  }, [activeId, modules]);

  const activeModule = modules.find((m) => m.id === activeId) || modules[0];
  const thumbs = activeModule?.images || [];

  const scrollToModule = (id) => {
    const el = sectionsRef.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectPreview = (src) => {
    setFadeKey((k) => k + 1);
    setActiveImage(src);
  };

  return (
    <main ref={rootRef} aria-label="Funcionalidades da Hausecare" className="bg-white">
      {/* HERO DA PÁGINA (leve, premium) */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 500px at 15% 15%, rgba(43,144,138,0.15), transparent 60%), radial-gradient(700px 420px at 85% 20%, rgba(99,102,241,0.12), transparent 60%), linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 60%)",
          }}
        />
        <div className="relative container-hc mx-auto px-6 pt-14 pb-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2b908a]" />
              Catálogo de módulos
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Funcionalidades da Hausecare
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Uma visão completa dos módulos — com prova visual. Escolha a área e veja o que
              muda na prática: operação, clínica, financeiro e governança.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contato"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
                style={{
                  background: "linear-gradient(90deg, #2b908a, #36C293)",
                }}
              >
                Solicitar demonstração
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50"
              >
                Voltar ao site
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL: rail + sticky preview + sections */}
      <section className="relative">
        {/* Background sutil (grid + glow) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 500px at 30% 0%, rgba(43,144,138,0.10), transparent 55%), radial-gradient(700px 420px at 80% 30%, rgba(99,102,241,0.08), transparent 55%)",
          }}
        />
        <div className="relative container-hc mx-auto px-6 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-10 items-start">
            {/* RAIL / MENU */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
                  Módulos
                </p>

                <nav className="mt-3 space-y-2" aria-label="Navegação de módulos">
                  {modules.map((m, idx) => {
                    const active = m.id === activeId;
                    return (
                      <button
                        key={m.id}
                        onClick={() => scrollToModule(m.id)}
                        className={`w-full text-left rounded-xl px-3 py-2.5 transition flex items-center gap-3 ${active
                          ? "bg-slate-900 text-white shadow"
                          : "hover:bg-slate-50 text-slate-800"
                          }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${active ? "bg-[#36C293]" : "bg-slate-300"
                            }`}
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate">{m.label}</div>
                          <div
                            className={`text-xs truncate ${active ? "text-white/70" : "text-slate-500"
                              }`}
                          >
                            {m.kicker}
                          </div>
                        </div>
                        <span
                          className={`ml-auto text-xs font-semibold ${active ? "text-white/70" : "text-slate-400"
                            }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-xs font-semibold text-slate-700">Dica</p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Role a página. O preview do print troca automaticamente conforme o módulo
                    entra em foco.
                  </p>
                </div>
              </div>
            </aside>

            {/* COLUNA DIREITA */}
            <div className="grid xl:grid-cols-[1fr_460px] gap-8 items-start">
              {/* SEÇÕES (texto) */}
              <div className="space-y-10">
                {modules.map((m) => (
                  <article
                    key={m.id}
                    data-module-id={m.id}
                    ref={(el) => (sectionsRef.current[m.id] = el)}
                    className="scroll-mt-28"
                  >
                    <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7 md:p-8 shadow-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold">
                          {m.label}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">
                          {m.kicker}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                        {m.headline}
                      </h2>
                      <p className="mt-3 text-slate-600 leading-relaxed text-base md:text-lg">
                        {m.desc}
                      </p>

                      <div className="mt-6 grid md:grid-cols-2 gap-3">
                        {m.bullets.map((b) => (
                          <div
                            key={b}
                            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                          >
                            <span className="mt-1 h-2 w-2 rounded-full bg-[#2b908a]" />
                            <p className="text-sm text-slate-700 leading-relaxed">{b}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-sm text-slate-600">
                          <span className="font-semibold text-slate-800">Prova:</span>{" "}
                          {m.proof}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(m.images?.[0]?.src || "")}
                            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-slate-900 text-white hover:opacity-95"
                          >
                            Ver print
                          </button>
                          <a
                            href="#contato"
                            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold border border-slate-200 bg-white hover:bg-slate-50"
                          >
                            Agendar demo
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}

                {/* CTA final */}
                <div id="contato" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Quer ver a sua operação rodando assim?
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Demonstração guiada em minutos. A gente te mostra os módulos com base no seu cenário
                    (e sem enrolação).
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="/#contato"
                      className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
                      style={{
                        background: "linear-gradient(90deg, #2b908a, #36C293)",
                      }}
                    >
                      Solicitar demonstração
                    </a>
                    <a
                      href="/#inicio"
                      className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold bg-white border border-slate-200 hover:bg-slate-50"
                    >
                      Voltar ao topo
                    </a>
                  </div>
                </div>
              </div>

              {/* PREVIEW STICKY (diferencial) */}
              <aside className="xl:sticky xl:top-24">
                <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
                  {/* Cabeçalho do preview */}
                  <div className="p-5 border-b border-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Preview do sistema
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {activeModule.label}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {activeModule.kicker}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        em destaque
                      </span>
                    </div>
                  </div>

                  {/* Área da imagem com crossfade */}
                  <div className="p-5">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900/5 border border-slate-200">
                      {/* “frame” leve */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(600px 320px at 30% 20%, rgba(43,144,138,0.18), transparent 55%), radial-gradient(560px 320px at 70% 70%, rgba(99,102,241,0.12), transparent 55%)",
                        }}
                      />

                      <img
                        key={fadeKey}
                        src={activeImage || thumbs?.[0]?.src}
                        alt={`Print do módulo ${activeModule.label}`}
                        className="relative w-full h-auto select-none"
                        loading="eager"
                        decoding="async"
                        style={{
                          transform: "translateZ(0)",
                          animation: "hcFade 420ms ease-out",
                        }}
                      />
                    </div>

                    {/* Thumbs (troca manual) */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {thumbs.map((t) => {
                        const isActive = t.src === activeImage;
                        return (
                          <button
                            key={t.label}
                            onClick={() => selectPreview(t.src)}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition ${isActive
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                              }`}
                            aria-label={`Ver print: ${t.label}`}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                      * Prints ilustrativos do sistema. Layout e dados podem variar conforme a configuração
                      da clínica e permissões de acesso.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* keyframes locais (sem mexer no CSS global) */}
        <style>{`
          @keyframes hcFade {
            from { opacity: 0; transform: translateY(6px) scale(0.995); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </section>

      {/* MODAL / LIGHTBOX */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={modalImage}
              alt="Ampliado"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
}
