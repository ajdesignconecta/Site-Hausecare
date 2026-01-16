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
        setTimeout(() => setIsLoaded(true), 250);
      })
      .catch((err) => {
        console.error("Error preloading images:", err);
        setIsLoaded(true);
      });
  }, [imageSources]);

  return { progress, isLoaded };
}

// Hook para animação de digitação com efeito de backspace
function useTypingEffect(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timeoutId;

    // Garantir que começa do zero
    setDisplayedText("");
    setIsComplete(false);

    const animate = () => {
      if (!isDeleting) {
        // Fase de digitação
        if (index < text.length) {
          index++;
          setDisplayedText(text.substring(0, index));
          timeoutId = setTimeout(animate, speed);
        } else {
          // Texto completo digitado
          setIsComplete(true);
          // Pause antes de começar a apagar
          timeoutId = setTimeout(() => {
            isDeleting = true;
            animate();
          }, 2000); // Pausa de 2 segundos
        }
      } else {
        // Fase de apagar (backspace)
        if (index > 0) {
          index--;
          setDisplayedText(text.substring(0, index));
          setIsComplete(false);
          timeoutId = setTimeout(animate, speed * 0.5); // Backspace mais rápido
        } else {
          // Texto completamente apagado
          // Pausa breve antes de recomeçar
          timeoutId = setTimeout(() => {
            isDeleting = false;
            animate();
          }, 500);
        }
      }
    };

    animate();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed]);

  return { displayedText, isComplete };
}

export default function Hero() {
  const heroText = "Bem-vindo(a) ao sistema de gestão para empresas ";
  const { displayedText, isComplete } = useTypingEffect(heroText, 80);

  const { progress, isLoaded } = useImagePreloader([
    monitorImage,
    heroTabletImage,
  ]);

  const wrapperRef = useRef(null);
  const introRef = useRef(null);

  // IMPORTANTE:
  // O HERO “fundo” precisa existir visível por trás para o buraco revelar algo.
  // Então criamos:
  // - heroSectionRef: camada base (sempre visível)
  // - heroAnimRef: conteúdo animado (opacity 0 -> 1 com GSAP)
  const heroSectionRef = useRef(null);
  const heroAnimRef = useRef(null);

  const progressBarRef = useRef(null);
  const heroContainerRef = useRef(null);

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

      const heroSection = heroSectionRef.current; // base (visível)
      const heroAnim = heroAnimRef.current; // conteúdo animado

      if (!wrapper || !intro || !heroSection || !heroAnim) return;

      ctx = gsap.context(() => {
        requestAnimationFrame(() => {
          const scanline = intro.querySelector(".scanline");

          // pegar elementos internos a partir do heroSection (pq ele sempre existe)
          const heroTextChildren = heroSection.querySelectorAll(
            ".hero-text > *"
          );
          const heroTablet = heroSection.querySelector(".hero-tablet");

          // ✅ NÃO zera opacity do heroSection (senão não revela nada)
          // Só anima o conteúdo
          gsap.set(heroAnim, {
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

          const isMobile = window.innerWidth < 1024;
          const scrollDistance = isMobile ? "+=120%" : "+=180%";

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: scrollDistance,
              scrub: 1.5,
              pin: !isMobile, // Desabilita pin no mobile para evitar conflitos com header fixo
              pinSpacing: !isMobile,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  gsap.to(progressBarRef.current, {
                    width: `${self.progress * 100}%`,
                    duration: 0.1,
                    ease: "none",
                  });
                }
              },
            },
          });

          if (scanline) {
            tl.to(
              scanline,
              { y: "100%", duration: 0.3, ease: "power2.inOut" },
              0
            );
          }

          // Monitor fade out
          tl.to(
            intro,
            {
              opacity: 0,
              scale: 0.92,
              filter: "blur(8px)",
              duration: 1,
              ease: "power2.inOut",
              pointerEvents: "none", // Desativa cliques após sumir
            },
            0.25
          );

          // Conteúdo do hero entra
          tl.to(
            heroAnim,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1,
              ease: "power2.out",
            },
            0.25
          );

          if (heroTextChildren.length > 0) {
            tl.to(
              heroTextChildren,
              { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
              0.4
            );
          }

          if (heroTablet) {
            tl.to(
              heroTablet,
              { opacity: 1, y: 0, scale: 1, duration: 0.8 },
              0.5
            );
          }

          // loops
          if (heroTablet) {
            gsap.to(heroTablet, {
              y: isMobile ? -5 : -10,
              rotateX: isMobile ? -1 : -2,
              rotateY: isMobile ? 1 : 3,
              scale: isMobile ? 1.005 : 1.01,
              duration: 3.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1,
            });
          }

          const tabletScreen = heroSection.querySelector(".hero-tablet-screen");
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

          const glare = heroSection.querySelector(".hero-glare");
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
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              Carregando Hausecare
            </h2>
            <div className="w-64 md:w-80 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
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
        ref={(el) => {
          wrapperRef.current = el;
          heroContainerRef.current = el;
        }}
        className="relative w-full bg-gradient-to-r from-[#174c77] to-[#2b908a] overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* ========== CENA 2 (ATRÁS): HERO BASE — SEMPRE VISÍVEL ========== */}
        <div
          ref={heroSectionRef}
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

          {/* Conteúdo animável (isso entra no scroll) */}
          <div ref={heroAnimRef} className="w-full">
            <div className="relative container-hc grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center z-10 w-full px-6">
              {/* TEXTO ESQUERDA */}
              <div className="hero-text space-y-5 lg:space-y-7 max-w-3xl">
                <div
                  className="hidden md:inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs md:text-sm text-white/80 shadow-lg shadow-black/20 backdrop-blur"
                  style={{ opacity: 0, transform: "translateY(20px)" }}
                >
                  <span className="font-semibold text-white">Hausecare 360º</span>
                  <span className="text-white/70">
                    Operação clínica sem travas
                  </span>
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
                    href="https://app.hausecare.com.br/auth/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hc btn-hc-primary hero-primary-cta w-full sm:w-auto animated-cta transform hover:scale-105 transition-transform duration-300 relative z-10 hover:z-20"
                    aria-label="Criar conta grátis na Hausecare"
                    style={{
                      outline: "none",
                      boxShadow: "0 10px 25px rgba(15, 23, 42, 0.18)" // Mantém sombra original, remove ring do hover
                    }}
                  >
                    <span className="cta-glow" aria-hidden="true"></span>
                    <span className="cta-text">Criar conta grátis</span>
                  </a>
                  <a
                    href="/funcionalidades"
                    className="inline-flex items-center justify-center rounded-xl px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors transform hover:scale-105 transition-transform duration-300 relative z-10 hover:z-20"
                    style={{ outline: "none" }}
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
              <div className="hidden md:flex relative justify-center lg:justify-end px-2 sm:px-6">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 sm:-inset-10 rounded-[52px] blur-3xl opacity-40"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 72%)",
                  }}
                />

                <div
                  className="hero-tablet relative w-full max-w-[90%] sm:max-w-[480px] md:max-w-[420px] lg:max-w-[500px]"
                  style={{
                    opacity: 0,
                    transform: "translateY(40px) scale(0.95)",
                  }}
                >
                  <div className="relative rounded-[32px] md:rounded-[42px] bg-black/45 p-[8px] md:p-[10px] shadow-2xl shadow-black/40 ring-1 ring-white/10">
                    <div className="relative rounded-[26px] md:rounded-[34px] bg-[#0b1220] p-[8px] md:p-[10px] ring-1 ring-white/10">
                      <div className="relative rounded-[20px] md:rounded-[26px] overflow-hidden bg-black">
                        <div className="hero-tablet-screen relative w-full h-full select-none">
                          <img
                            src={monitorImage}
                            alt="Prévia do sistema Hausecare - Mobile"
                            className="block w-full h-auto md:hidden"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                            draggable={false}
                          />
                          <img
                            src={heroTabletImage}
                            alt="Prévia do sistema Hausecare"
                            className="hidden md:block w-full h-auto"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                            draggable={false}
                          />
                        </div>

                        <div
                          className="hero-glare pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.45) 35%, transparent 70%)",
                            mixBlendMode: "screen",
                          }}
                        />
                      </div>

                      <div
                        aria-hidden="true"
                        className="absolute left-1/2 -translate-x-1/2 top-[8px] md:top-[10px] h-[5px] md:h-[6px] w-[60px] md:w-[76px] rounded-full bg-white/10"
                      />
                    </div>
                  </div>

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

        {/* ========== CENA 1 (NA FRENTE): INTRO (MONITOR) — MASCARADA ========== */}
        <div
          ref={introRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-4 py-8 overflow-hidden"
          style={{
            willChange: "mask-image, -webkit-mask-image, opacity, transform",
          }}
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

          {/* Container Principal */}
          <div className="relative w-full z-10 flex flex-col items-center max-w-6xl mx-auto px-6 pt-32 pb-12 md:pt-48 md:pb-16">

            {/* Bloco de Texto */}
            <div className="max-w-5xl text-center mx-auto mb-2 md:mb-4">
              <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs md:text-sm font-medium tracking-wide text-gray-200">
                  Gestão Inteligente
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white tracking-tight mb-5 mx-auto drop-shadow-xl">
                {displayedText}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  {isComplete ? "HOME CARE" : ""}
                </span>
                {!isComplete && <span className="animate-pulse">|</span>}
              </h1>
            </div>

            {/* Monitor Wrapper */}
            <div className="relative w-full max-w-4xl group">
              <div className="relative rounded-[28px] md:rounded-[36px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[12px] md:p-[16px] shadow-2xl">
                <div className="relative rounded-[20px] md:rounded-[26px] bg-gradient-to-b from-slate-800 to-black p-[14px] md:p-[18px] ring-1 ring-white/10">
                  <div
                    className="relative overflow-hidden rounded-[12px] md:rounded-[16px] bg-black"
                    style={{ aspectRatio: "auto" }}
                  >
                    <img
                      src={heroTabletImage}
                      alt="Sistema Hausecare - Dashboard Mobile"
                      className="w-full h-full object-contain md:hidden"
                      loading="eager"
                      fetchpriority="high"
                    />
                    <img
                      src={monitorImage}
                      alt="Sistema Hausecare - Dashboard"
                      className="hidden md:block w-full h-full object-contain"
                      loading="eager"
                      fetchpriority="high"
                    />

                    <div
                      className="scanline absolute top-0 left-0 right-0 h-[40px] pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                        transform: "translateY(-100%)",
                      }}
                    />

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
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-64 md:bottom-28 left-0 right-0 mx-auto flex flex-col items-center gap-2 text-black animate-bounce z-20"
            style={{ width: "fit-content" }}
          >
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
      </div>
    </>
  );
}
