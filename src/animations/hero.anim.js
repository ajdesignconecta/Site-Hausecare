import gsap from "gsap";

export function heroAnimation(containerRef) {
  const el = containerRef?.current;
  if (!el) return () => {};

  // gsap.context deixa tudo "escopado" ao container e permite revert() perfeito em SPA
  const ctx = gsap.context(() => {
    const q = gsap.utils.selector(el);

    const title = q(".hero-title");
    const subtitle = q(".hero-subtitle");
    const actions = q(".hero-actions");
    const mockup = q(".hero-mockup");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Dica "premium": usa fromTo pra ficar previsível em re-render/re-mount
    if (title?.length) {
      tl.fromTo(
        title,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }
      );
    }

    if (subtitle?.length) {
      tl.fromTo(
        subtitle,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.45"
      );
    }

    if (actions?.length) {
      tl.fromTo(
        actions,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.35"
      );
    }

    // mockup pode não existir (mobile), então não pode “quebrar”
    if (mockup?.length) {
      tl.fromTo(
        mockup,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9 },
        "-=0.55"
      );
    }
  }, el);

  // Retorna cleanup pro React desmontar sem deixar nada pendurado
  return () => ctx.revert();
}
