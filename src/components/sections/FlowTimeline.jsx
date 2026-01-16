import { useRef, useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { MODAL_CONTENT } from "./FlowModalContent";
import { DEMO_CAROUSEL } from "../../assets/imagens/screens/demo-carousel";
import { X } from "lucide-react";
import gsap from "gsap";

// Carrossel de demonstração customizado
// Hook simples para controlar o carrossel
function useCarousel(length) {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % length);
  const prev = () => setIdx((i) => (i - 1 + length) % length);
  const goTo = (i) => setIdx(i);
  return { idx, setIdx, next, prev, goTo };
}

const STEPS = [
  {
    title: "Cadastro rápido",
    description: "Cadastre pacientes em segundos, sem erros.",
    color: "#2b908a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <circle cx="12" cy="8" r="4" stroke="#2b908a" strokeWidth="2" />
        <path
          d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
          stroke="#2b908a"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: "Plano sem conflitos",
    description: "Defina planos e frequências com clareza.",
    color: "#f59e42",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#f59e42"
          strokeWidth="2"
        />
        <path
          d="M8 8h8M8 12h8M8 16h4"
          stroke="#f59e42"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Vinculação automática",
    description: "Vincule profissionais ao paciente com um clique.",
    color: "#e57373",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <circle cx="8" cy="8" r="3" stroke="#e57373" strokeWidth="2" />
        <circle cx="16" cy="8" r="3" stroke="#e57373" strokeWidth="2" />
        <path
          d="M4 20c0-2.2 2.7-4 6-4s6 1.8 6 4"
          stroke="#e57373"
          strokeWidth="2"
        />
        <path
          d="M20 20c0-1.2-1.5-2.2-3.5-2.6"
          stroke="#e57373"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: "Execução sem retrabalho",
    description: "Organize e acompanhe atendimentos em tempo real.",
    color: "#34d399",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#34d399"
          strokeWidth="2"
        />
        <path
          d="M8 12l2.5 2.5L16 9"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Registro seguro",
    description: "Registre evoluções com segurança e rastreabilidade.",
    color: "#6366f1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#6366f1"
          strokeWidth="2"
        />
        <path
          d="M8 8h8M8 12h6M8 16h4"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Financeiro automatizado",
    description: "Cobrança, folha e despesas integradas automaticamente.",
    color: "#f43f5e",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect
          x="4"
          y="7"
          width="16"
          height="10"
          rx="3"
          stroke="#f43f5e"
          strokeWidth="2"
        />
        <path
          d="M8 12h8M8 15h5"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function FlowTimeline() {
  const timelineRef = useRef(/** @type {HTMLDivElement | null} */(null));

  // refs do modal (pra animação premium)
  const overlayRef = useRef(/** @type {HTMLDivElement | null} */(null));
  const modalRef = useRef(/** @type {HTMLDivElement | null} */(null));

  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);

  const currentStep = useMemo(() => STEPS[modalIdx] ?? STEPS[0], [modalIdx]);
  const stepColor = currentStep.color;

  // animação dos cards (mantida)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-step",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: "power3.out",
        }
      );
    }, timelineRef);
    return () => ctx.revert();
  }, [active]);

  // modal: ESC + trava scroll + animação premium
  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    // trava scroll do body
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // animação do overlay e painel
    const tl = gsap.timeline();
    if (overlayRef.current) {
      tl.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.18, ease: "power2.out" }
      );
    }
    if (modalRef.current) {
      tl.fromTo(
        modalRef.current,
        { y: 18, scale: 0.98, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 0.26, ease: "power3.out" },
        0
      );
    }

    // foco inicial (botão fechar)
    const closeBtn = modalRef.current?.querySelector(
      "[data-close-modal='true']"
    );
    closeBtn?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      tl.kill();
    };
  }, [modalOpen]);

  const openModal = (idx) => {
    setActive(idx);
    setModalIdx(idx);
    setModalOpen(true);
  };

  return (
    <section className="pt-4 md:pt-6 pb-4 md:pb-6 bg-slate-50" aria-labelledby="flow-timeline-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="text-center mb-16">
          <h2
            id="flow-timeline-title"
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Como funciona na prática
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Um fluxo animado, seguro e totalmente controlado pela empresa.
          </p>
        </header>

        <div
          ref={timelineRef}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          {STEPS.map((step, idx) => (
            <div
              key={step.title}
              className={`timeline-step bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-2 transition will-change-transform ${active === idx ? "shadow-xl scale-105" : "shadow-sm"
                } hover:shadow-lg hover:scale-105 w-full max-w-[320px] md:w-auto md:min-w-[180px] md:max-w-[220px] p-8 md:p-[32px_18px]`}
              tabIndex={0}
              role="button"
              aria-label={`Etapa ${idx + 1}: ${step.title}`}
              onClick={() => openModal(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openModal(idx);
              }}
              style={{
                cursor: "pointer",
                borderColor: step.color,
                boxSizing: "border-box",
                display: "flex",
              }}
            >
              <div className="mb-2" style={{ color: step.color }}>
                {step.icon}
              </div>
              <h3
                className="font-semibold text-slate-900 mb-1 text-xl md:text-lg text-center"
                style={{
                  minHeight: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {step.title}
              </h3>

              <p
                className="text-base md:text-sm text-slate-600 leading-relaxed text-center"
                style={
                  active === idx
                    ? {
                      minHeight: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "auto",
                      overflow: "visible",
                      whiteSpace: "normal",
                      textOverflow: "clip",
                      maxHeight: "none",
                    }
                    : {
                      minHeight: 48,
                      maxHeight: 48,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }
                }
              >
                {step.description}
              </p>

              <div className="mt-2 w-full h-2 bg-slate-200 rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: step.color,
                    width: active === idx ? "100%" : "0%",
                    transition: "width 0.5s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ MODAL PREMIUM / RESPONSIVO */}
        {modalOpen && (
          <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-3 sm:p-6"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="flow-modal-title"
              className="relative w-full max-w-[560px] max-h-[85vh] overflow-hidden rounded-3xl sm:rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header com “cara enterprise” + cor da etapa */}
              <div className="relative px-6 pt-6 pb-4 border-b border-slate-100">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${stepColor}, rgba(255,255,255,0))`,
                  }}
                />
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: `${stepColor}1A`, // 10% aprox
                      border: `1px solid ${stepColor}33`,
                    }}
                  >
                    <span style={{ color: stepColor }}>{currentStep.icon}</span>
                  </div>

                  <div className="min-w-0">
                    <h3
                      id="flow-modal-title"
                      className="text-xl font-extrabold text-slate-900 leading-tight"
                    >
                      {MODAL_CONTENT[modalIdx].title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Detalhes da etapa no fluxo do Hausecare
                    </p>
                  </div>

                  <button
                    data-close-modal="true"
                    className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                    onClick={() => setModalOpen(false)}
                    aria-label="Fechar modal"
                  >
                    <span className="text-2xl leading-none">×</span>
                  </button>
                </div>
              </div>

              {/* Conteúdo com scroll seguro */}
              <div className="px-6 py-5 overflow-auto max-h-[calc(85vh-92px)]">
                <p
                  className="text-base text-slate-700 leading-relaxed"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {MODAL_CONTENT[modalIdx].description}
                </p>

                {/* CTA opcional (mantém premium). Se não quiser, apaga esse bloco. */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#demonstracao"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white shadow-sm transition"
                    style={{ backgroundColor: stepColor }}
                    onClick={() => setModalOpen(false)}
                  >
                    Ver na demonstração
                  </a>
                  <button
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                    onClick={() => setModalOpen(false)}
                  >
                    Entendi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Indicador de etapa ativa */}
        <div className="mt-8 flex justify-center gap-2">
          {STEPS.map((_, idx) => (
            <button
              key={idx}
              className={`w-4 h-4 rounded-full border-2 ${active === idx
                ? "bg-[#2b908a] border-[#2b908a]"
                : "bg-slate-200 border-slate-300"
                }`}
              aria-label={`Ir para etapa ${idx + 1}`}
              onClick={() => setActive(idx)}
            />
          ))}
        </div>

        {/* Carrossel de demonstração profissional */}
        <section
          id="demonstracao"
          aria-labelledby="demonstracao-title"
          className="mt-20 scroll-mt-24"
        >
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 md:px-6 py-2 rounded-full bg-gradient-to-r from-[#2b908a] to-[#6366f1] shadow-lg mb-4 animate-fade-in whitespace-nowrap">
              <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#fff" strokeWidth="2" /><path d="M7 9h10M7 13h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
              <span className="text-white font-semibold tracking-wide text-xs md:text-base">Demonstração do sistema Hausecare</span>
            </div>
            <h3
              id="demonstracao-title"
              className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2"
              style={{ letterSpacing: '-0.02em' }}>
              Veja o sistema na prática
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore as principais telas do sistema Hausecare e entenda como a plataforma organiza toda a operação de Home Care, do cadastro ao financeiro. Clique para ampliar e veja detalhes de cada etapa.
            </p>
          </header>

          <DemoCarousel />


        </section>
      </div>
    </section>
  );
}





// Carrossel de imagens com lightbox
function DemoCarousel() {
  const { idx, next, prev, goTo } = useCarousel(DEMO_CAROUSEL.length);
  const [lightbox, setLightbox] = useState(false);
  const active = DEMO_CAROUSEL[idx];
  return (
    <div className="relative mx-auto max-w-[100vw] w-full flex flex-col items-center px-0 md:px-2">
      <div className="relative w-full aspect-[16/10] bg-slate-100 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center md:min-h-[520px] min-h-[180px] p-0">
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow p-2 transition"
          onClick={prev}
          aria-label="Imagem anterior"
          style={{ boxShadow: '0 2px 8px #0001' }}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#2b908a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <img
          src={active.src}
          alt={active.title}
          className="block w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105 max-h-[60vh] md:max-h-[700px] max-w-[100vw]"
          onClick={() => setLightbox(true)}
          loading="eager"
          decoding="async"
          draggable={false}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow p-2 transition"
          onClick={next}
          aria-label="Próxima imagem"
          style={{ boxShadow: '0 2px 8px #0001' }}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#2b908a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {DEMO_CAROUSEL.map((img, i) => (
          <button
            key={img.id}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${i === idx ? 'bg-[#2b908a] border-[#2b908a] scale-110' : 'bg-slate-200 border-slate-300'}`}
            aria-label={`Ir para imagem ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <div className="mt-6 text-center max-w-2xl mx-auto">
        <h4 className="text-lg font-semibold text-slate-900 mb-1">{active.title}</h4>
        {active.description && (
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mt-2">{active.description}</p>
        )}
      </div>
      {lightbox && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightbox(false)}
        >
          {/* Botão fechar (Estilo unificado) */}
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 p-1 md:p-3 rounded-full text-white/80 hover:text-white md:bg-white/10 md:hover:bg-white/20 transition z-50 md:backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(false);
            }}
          >
            <X className="w-6 h-6 md:w-8 md:h-8 shadow-sm" />
          </button>

          <img
            src={active.src}
            alt={active.title}
            className="max-w-[96vw] max-h-[85vh] w-auto h-auto rounded-xl shadow-2xl border-0 md:max-w-[1200px] md:max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
