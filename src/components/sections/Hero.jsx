import { useLayoutEffect, useMemo, useRef } from "react";
import { heroAnimation } from "../../animations/hero.anim";
import { SCREENS } from "../../assets/imagens/screens/screens";
import dashboardImg from "../../assets/imagens/screens/dashboardoficial-imagem.jpg";

const HERO_HIGHLIGHTS = [
  { value: "+120", label: "empresas ativas" },
  { value: "9k+", label: "profissionais conectados" },
  { value: "98 NPS", label: "satisfação dos clientes" },
];

export default function Hero() {
  const heroRef = useRef(null);



  useLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    // Mantém tua animação existente
    const cleanup = heroAnimation(heroRef);

    // Animação do tablet (igual vibe do vídeo)
    // Usa import dinâmico pra não pesar e não quebrar SSR
    let ctx;
    (async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap || gsapModule.default;

      ctx = gsap.context(() => {
        gsap.set(".hero-tablet", {
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
        });

        // Entrada + loop suave (float / zoom / tilt)
        const tl = gsap.timeline();

        tl.fromTo(
          ".hero-tablet",
          { autoAlpha: 0, y: 18, rotateX: 4, rotateY: -6, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          }
        );

        // Loop “premium” (igual vídeo: movimento quase imperceptível)
        gsap.to(".hero-tablet", {
          y: -10,
          rotateX: -3,
          rotateY: 5,
          rotateZ: -0.6,
          scale: 1.01,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.15,
        });

        // Parallax leve da imagem dentro do tablet
        gsap.to(".hero-tablet-screen", {
          y: -10,
          scale: 1.03,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Brilho passando (glare)
        gsap.fromTo(
          ".hero-glare",
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
      }, heroRef);
    })();

    return () => {
      if (typeof cleanup === "function") cleanup();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-title"
      className="hero-section relative overflow-hidden min-h-screen flex items-center text-white bg-gradient-hc pt-0 pb-10 lg:pt-2 lg:pb-12"
    >
      {/* Camada de luz premium */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(900px 420px at 20% 25%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(700px 360px at 85% 65%, rgba(255,255,255,0.12), transparent 60%)",
        }}
      />

      <div className="relative container-hc grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* TEXTO */}
        <div className="hero-text space-y-7 max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 shadow-lg shadow-black/20 backdrop-blur mt-4 sm:mt-0">
            <span className="font-semibold text-white">Hausecare 360º</span>
            <span className="text-white/70">Operação clínica sem fricções</span>
          </div>

          <h1
            id="hero-title"
            className="hero-title text-4xl md:text-5xl font-bold leading-tight"
          >
            Gestão inteligente para empresas de Home Care
          </h1>

          <p className="hero-subtitle text-lg text-white/90 max-w-xl leading-relaxed">
            Centralize atendimentos, profissionais, pacientes e evoluções clínicas
            em um único sistema simples, seguro e eficiente.
          </p>

          <div className="hero-actions flex flex-col sm:flex-row gap-4">
            <a
              href="#contato"
              className="btn-hc btn-hc-primary"
              aria-label="Criar conta grátis na Hausecare"
            >
              Criar conta grátis
            </a>

            <a
              href="/tour"
              className="btn-hc btn-hc-ghost"
              aria-label="Ver tour do sistema Hausecare"
            >
              Ver tour do sistema
            </a>
          </div>

          <ul className="hero-metrics grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            {HERO_HIGHLIGHTS.map(({ value, label }) => (
              <li
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg shadow-black/20"
              >
                <p className="text-3xl font-semibold text-white">{value}</p>
                <p className="text-sm uppercase tracking-wide text-white/70">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* VISUAL (TABLET ANIMADO) */}
        <div className="relative flex justify-center lg:justify-end mt-10 px-2 sm:px-6">
          {/* Glow atrás do tablet */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 sm:-inset-10 rounded-[52px] blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 72%)",
            }}
          />

          <div className="hero-tablet relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[700px]">
            {/* Moldura do tablet */}
            <div className="relative rounded-[42px] bg-black/45 p-[10px] shadow-2xl shadow-black/40 ring-1 ring-white/10">
              {/* “Bezel” interno */}
              <div className="relative rounded-[34px] bg-[#0b1220] p-[10px] ring-1 ring-white/10">
                {/* Tela */}
                <div className="relative rounded-[26px] overflow-hidden bg-black">
                    <img
                      src={dashboardImg}
                      alt="Prévia do sistema Hausecare no tablet"
                      className="hero-tablet-screen w-full h-auto select-none"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                    />

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

                {/* Detalhe topo (câmera/alto-falante) */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 top-[10px] h-[6px] w-[76px] rounded-full bg-white/10"
                />
              </div>
            </div>

            {/* Sombra no chão */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-[80%] h-16 blur-2xl opacity-40"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
