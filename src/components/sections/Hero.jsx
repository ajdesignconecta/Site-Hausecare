import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Imagens
import monitorImage from "../../assets/imagens/screens/dasboard-hausecare.webp";
import heroTabletImage from "../../assets/imagens/screens/dasboard-hero.webp";

const HERO_HIGHLIGHTS = [
  { value: "+120", label: "empresas ativas" },
  { value: "9k+", label: "profissionais conectados" },
  { value: "98 NPS", label: "satisfação dos clientes" },
];

// Hook para preload de imagens
function useImagePreloader(imageSources) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = imageSources.length;

    const promises = imageSources.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setProgress(Math.round((loaded / total) * 100));
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(promises)
      .then(() => {
        // Micro delay para evitar flash
        setTimeout(() => {
          setIsLoaded(true);
        }, 250);
      })
      .catch((err) => {
        console.error("Error preloading images:", err);
        setIsLoaded(true); // Liberar mesmo com erro
      });
  }, [imageSources]);

  return { progress, isLoaded };
}

export default function Hero() {
  const { progress, isLoaded } = useImagePreloader([
    monitorImage,
    heroTabletImage,
  ]);

  const wrapperRef = useRef(null);
  const introRef = useRef(null);
  const heroRef = useRef(null);
  const progressBarRef = useRef(null);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let ctx;

    (async () => {
      const gsapModule = await import("gsap");
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      const gsap = gsapModule.gsap || gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const intro = introRef.current;
      const hero = heroRef.current;

      if (!wrapper || !intro || !hero) return;

      ctx = gsap.context(() => {
        // Aguardar um frame para garantir que DOM está pronto
        requestAnimationFrame(() => {
          // Verificar elementos antes de animar
          const scanline = intro.querySelector(".scanline");
          const heroTextChildren = hero.querySelectorAll(".hero-text > *");
          const heroTablet = hero.querySelector(".hero-tablet");

          // Estados iniciais seguros
          gsap.set(hero, {
            opacity: 0,
            filter: "blur(8px)",
            y: 50,
          });

          if (heroTextChildren.length > 0) {
            gsap.set(heroTextChildren, {
              opacity: 0,
              y: 20,
            });
          }

          if (heroTablet) {
            gsap.set(heroTablet, {
              opacity: 0,
              y: 40,
              scale: 0.95,
            });
          }

          // Detectar mobile/tablet
          const isMobile = window.innerWidth < 1024;
          const scrollDistance = isMobile ? "+=120%" : "+=180%";

          // Timeline principal
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: scrollDistance,
              scrub: 1.5,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                // Atualizar progress bar diretamente via GSAP (sem re-render)
                if (progressBarRef.current) {
                  gsap.to(progressBarRef.current, {
                    width: `${self.progress * 100}%`,
                    duration: 0.1,
                    ease: "none",
                  });
                }
              },
              onRefresh: () => {
                // Garantir que elementos continuam corretos após refresh
              },
            },
          });

          // Animação da scanline (se existir)
          if (scanline) {
            tl.to(scanline, {
              y: "100%",
              duration: 0.3,
              ease: "power2.inOut",
            }, 0);
          }

          // Monitor fade out com blur e scale
          tl.to(intro, {
            opacity: 0,
            scale: 0.92,
            filter: "blur(8px)",
            duration: 1,
            ease: "power2.inOut",
          }, 0.25);

          // Hero fade in (simultâneo)
          tl.to(hero, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
          }, 0.25);

          // Elementos internos do hero com stagger (se existirem)
          if (heroTextChildren.length > 0) {
            tl.to(heroTextChildren, {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
            }, 0.4);
          }

          if (heroTablet) {
            tl.to(heroTablet, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
            }, 0.5);
          }

          // Animações de loop (tablet floating) - com verificação
          if (heroTablet) {
            gsap.to(heroTablet, {
              y: -10,
              rotateX: -2,
              rotateY: 3,
              scale: 1.01,
              duration: 3.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1,
            });
          }

          // Parallax da imagem do tablet (se existir)
          const tabletScreen = hero.querySelector(".hero-tablet-screen");
          if (tabletScreen) {
            gsap.to(tabletScreen, {
              y: -10,
              scale: 1.03,
              duration: 3.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }

          // Glare passando (se existir)
          const glare = hero.querySelector(".hero-glare");
          if (glare) {
            gsap.fromTo(
              glare,
              { xPercent: -120, opacity: 0 },
              {
                xPercent: 120,
                opacity: 0.35,
                duration: 2.6,
                ease: "sine.inOut",
                repeat: -1,
                repeatDelay: 1.4,
              }
            );
          }
        });
      }, wrapper);
    })();

    return () => {
      if (ctx) ctx.revert();
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };
  }, [isLoaded]);

  return (
    <>
      {/* ========== PRELOADER ========== */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900">
          <div className="text-center space-y-6">
            {/* Logo/Texto */}
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              Carregando Hausecare
            </h2>

            {/* Barra de progresso */}
            <div className="w-64 md:w-80 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentual */}
            <p className="text-white/70 text-lg font-medium">{progress}%</p>
          </div>
        </div>
      )}

      {/* ========== PROGRESS BAR (durante experiência) ========== */}
      {isLoaded && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 shadow-lg shadow-emerald-500/50"
            style={{ width: "0%" }}
          />
        </div>
      )}

      {/* ========== WRAPPER (pinado durante scroll) ========== */}
      <div
        ref={wrapperRef}
        className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{ minHeight: "100vh" }}
      >
        {/* ========== CENA 1: INTRO (MONITOR) - z-20 ========== */}
        <div
          ref={introRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-4 py-8 overflow-hidden"
        >
          {/* Background gradientes radiais */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 35%, rgba(43,144,138,0.18) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)",
            }}
          />

          {/* Grid sutil */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Glow central */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)",
            }}
          />

          {/* Monitor COM molduras - ajustado para imagem */}
          <div className="relative w-full max-w-[92vw] lg:max-w-[1150px] z-10">
            {/* Outer bezel */}
            <div className="relative rounded-[28px] md:rounded-[36px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[12px] md:p-[16px] shadow-2xl">
              {/* Inner bezel */}
              <div className="relative rounded-[20px] md:rounded-[26px] bg-gradient-to-b from-slate-800 to-black p-[14px] md:p-[18px] ring-1 ring-white/10">
                {/* Screen com scanline - aspect-ratio auto para se ajustar à imagem */}
                <div className="relative overflow-hidden rounded-[12px] md:rounded-[16px] bg-black"
                  style={{ aspectRatio: 'auto' }}>
                  {/* Imagem do sistema - CONTAIN para mostrar COMPLETA sem cortar */}
                  <img
                    src={monitorImage}
                    alt="Sistema Hausecare - Dashboard"
                    className="w-full h-full object-contain"
                    loading="eager"
                    fetchpriority="high"
                  />

                  {/* Scanline animada */}
                  <div
                    className="scanline absolute top-0 left-0 right-0 h-[40px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                      transform: "translateY(-100%)",
                    }}
                  />

                  {/* Screen glare overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 45%, transparent 55%, rgba(255,255,255,0.05) 100%)",
                      mixBlendMode: "overlay",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint - centralizado */}
          <div className="absolute bottom-6 md:bottom-8 left-0 right-0 mx-auto flex flex-col items-center gap-2 text-white/60 animate-bounce z-20" style={{ width: 'fit-content' }}>
            <p className="text-xs md:text-sm font-medium tracking-wide">
              Role para continuar
            </p>
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* ========== CENA 2: HERO PRINCIPAL (ATRÁS) - z-10 ========== */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-10 flex items-center text-white"
        >
          {/* Background layers do hero */}
          <div
            className="hero-ambient pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="hero-gradient-orb hero-gradient-orb--primary" />
            <div className="hero-gradient-orb hero-gradient-orb--secondary" />
            <div className="hero-gradient-orb hero-gradient-orb--tertiary" />
          </div>

          <div
            className="hero-noise-layer pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          {/* Container do hero */}
          <div className="relative container-hc grid lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10 w-full px-6">
            {/* TEXTO ESQUERDA */}
            <div className="hero-text space-y-5 lg:space-y-7 max-w-3xl">
              <div
                className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs md:text-sm text-white/80 shadow-lg shadow-black/20 backdrop-blur"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                <span className="font-semibold text-white">
                  Hausecare 360º
                </span>
                <span className="text-white/70">Operação clínica sem travas</span>
              </div>

              <h1
                id="hero-title"
                className="hero-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                Controle, produtividade e padronização para o seu{" "}
                <span className="text-emerald-400">Home Care</span>
              </h1>

              <p
                className="hero-subtitle text-base md:text-lg text-white/90 max-w-xl leading-relaxed"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                Centralize toda a operação: atendimentos do dia em tempo real,
                prontuário digital, agenda inteligente e financeiro conectado.
                Mais visibilidade, menos caos.
              </p>

              <div
                className="inline-flex items-center rounded-full bg-white/10 px-3 sm:px-4 py-2 text-[10px] sm:text-xs text-white/80 shadow-lg shadow-black/20 backdrop-blur whitespace-nowrap"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                Visibilidade operacional • Agenda &amp; Rotas • Financeiro Real
              </div>

              <div
                className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                <a
                  href="#contato"
                  className="btn-hc btn-hc-primary hero-primary-cta w-full sm:w-auto animated-cta"
                  aria-label="Criar conta grátis na Hausecare"
                >
                  <span className="cta-glow" aria-hidden="true"></span>
                  <span className="cta-text">Criar conta grátis</span>
                </a>
                <a
                  href="/funcionalidades"
                  className="inline-flex items-center justify-center rounded-full px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Ver funcionalidades
                </a>
              </div>

              <ul
                className="hero-metrics grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                {HERO_HIGHLIGHTS.map(({ value, label }) => (
                  <li
                    key={label}
                    className="hero-metric-card rounded-xl md:rounded-2xl border border-white/10 bg-white/5 px-4 md:px-5 py-3 md:py-4 shadow-lg shadow-black/20"
                  >
                    <p className="text-2xl md:text-3xl font-semibold text-white">
                      {value}
                    </p>
                    <p className="text-xs md:text-sm uppercase tracking-wide text-white/70">
                      {label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* VISUAL DIREITA (TABLET) */}
            <div className="relative flex justify-center lg:justify-end px-2 sm:px-6">
              {/* Glow atrás do tablet */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 sm:-inset-10 rounded-[52px] blur-3xl opacity-40"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 72%)",
                }}
              />

              <div
                className="hero-tablet relative w-full max-w-[240px] sm:max-w-[320px] md:max-w-[420px] lg:max-w-[500px]"
                style={{ opacity: 0, transform: "translateY(40px) scale(0.95)" }}
              >
                {/* Moldura do tablet */}
                <div className="relative rounded-[32px] md:rounded-[42px] bg-black/45 p-[8px] md:p-[10px] shadow-2xl shadow-black/40 ring-1 ring-white/10">
                  {/* Bezel interno */}
                  <div className="relative rounded-[26px] md:rounded-[34px] bg-[#0b1220] p-[8px] md:p-[10px] ring-1 ring-white/10">
                    {/* Tela */}
                    <div className="relative rounded-[20px] md:rounded-[26px] overflow-hidden bg-black">
                      <div className="hero-tablet-screen relative w-full h-full select-none">
                        <img
                          src={heroTabletImage}
                          alt="Prévia do sistema Hausecare"
                          className="block w-full h-auto"
                          loading="eager"
                          decoding="async"
                          fetchpriority="high"
                          draggable={false}
                        />
                      </div>

                      {/* Glare */}
                      <div
                        className="hero-glare pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.45) 35%, transparent 70%)",
                          mixBlendMode: "screen",
                        }}
                      />
                    </div>

                    {/* Câmera/alto-falante */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 -translate-x-1/2 top-[8px] md:top-[10px] h-[5px] md:h-[6px] w-[60px] md:w-[76px] rounded-full bg-white/10"
                    />
                  </div>
                </div>

                {/* Sombra no chão */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-8 md:-bottom-10 w-[80%] h-12 md:h-16 blur-2xl opacity-40"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 70%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
