// src/components/sections/ProfessionalAppSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import {
    Smartphone,
    CalendarDays,
    PlayCircle,
    CheckCircle2,
    FileText,
    ShieldCheck,
    KeyRound,
    MapPin,
    MessageCircle,
    Wallet,
    Building2,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    X,
    ZoomIn,
} from "lucide-react";

/**
 * ProfessionalAppSection — App do Profissional (Hausecare)
 * - Layout internacional (split + carrossel leve)
 * - Paleta saúde (sky/teal/emerald)
 * - Copy focada em benefícios + o que o app permite (sem exageros)
 * - Acessível, responsivo e performático
 *
 * Imagens:
 * - Coloque suas imagens em /public/imagens/screens/ (recomendado)
 * - E salve como:
 *   /imagens/screens/mobile-1.png ... mobile-11.png (ou .webp/.jpg)
 * - Se a extensão for diferente, ajuste aqui no array `screens`.
 */
export default function ProfessionalAppSection({
    eyebrow = "App do Profissional",
    title = "Operação em campo, sem ruído e sem improviso.",
    subtitle = "Os profissionais acessam a rotina no celular: agenda do dia, pacientes, rota, comunicação e registro de atendimento — tudo com segurança e vínculo com a empresa.",
    ctaPrimary = { label: "Solicitar demonstração", href: "https://wa.me/5561992064157" },
    ctaSecondary = { label: "Ver planos", href: "#planos" },
    // SEO (opcional): id do bloco para linkagem interna e facilitar rastreio.
    sectionId = "app-profissional",
}) {
    const rootRef = useRef(null);
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    // Ajuste aqui se suas imagens estiverem com outra extensão.
    const screens = useMemo(
        () =>
            Array.from({ length: 11 }, (_, i) => ({
                src: `/imagens/screens/mobile-${i + 1}.webp`,
                alt: `Tela do app do profissional Hausecare ${i + 1}`,
            })),
        []
    );

    const bullets = useMemo(
        () => [
            {
                icon: CalendarDays,
                title: "Agenda do dia e lista de pacientes",
                desc: "O profissional visualiza os atendimentos do dia e os pacientes que irá atender, com organização para rotina em campo.",
            },
            {
                icon: PlayCircle,
                title: "Início e finalização do atendimento",
                desc: "O atendimento é iniciado e finalizado diretamente pelo app, com registro da evolução do paciente ao concluir.",
            },
            {
                icon: KeyRound,
                title: "Evolução protegida por senha de atendimento",
                desc: "A evolução do paciente só é enviada mediante senha do atendimento, reforçando segurança e controle do processo.",
            },
            {
                icon: MapPin,
                title: "Rota com 1 toque (Maps/Waze)",
                desc: "Ao tocar em “rota”, o app abre diretamente o Google Maps ou Waze para agilizar o deslocamento.",
            },
            {
                icon: MessageCircle,
                title: "Mensagem rápida para o paciente via WhatsApp",
                desc: "O profissional pode enviar mensagem para o paciente pelo WhatsApp direto do app para confirmação e alinhamentos.",
            },
            {
                icon: Wallet,
                title: "Transparência de repasses",
                desc: "O profissional consegue visualizar quanto irá receber, trazendo clareza financeira e reduzindo retrabalho administrativo.",
            },
            {
                icon: Building2,
                title: "Vínculo com a empresa contratante",
                desc: "A empresa mantém os dados de cadastro do profissional (nome, CPF, telefone, endereço e dados de pagamento) centralizados.",
            },
            {
                icon: ShieldCheck,
                title: "Operação mais segura e rastreável",
                desc: "Com fluxo consistente no app, a clínica reduz ruído operacional e melhora rastreabilidade do atendimento em campo.",
            },
        ],
        []
    );

    // Animações leves (sem peso, sem jitter)
    useEffect(() => {
        // Animações removidas - conteúdo aparece imediatamente
        /*
        const el = rootRef.current;
        if (!el) return;

        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            gsap.set("[data-anim='fade']", { opacity: 0 });
            gsap.set("[data-anim='up']", { opacity: 0, y: 14 });
            gsap.set("[data-anim='float']", { y: 0 });

            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

                        tl.to("[data-anim='fade']", { opacity: 1, duration: 0.6 }, 0)
                            .to(
                                "[data-anim='up']",
                                { opacity: 1, y: 0, duration: 0.75, stagger: 0.07 },
                                0.05
                            )
                            .to(
                                "[data-anim='float']",
                                { y: -6, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut" },
                                0.35
                            );

                        io.disconnect();
                    });
                },
                { threshold: 0.18 }
            );

            io.observe(el);
        }, el);

        return () => ctx.revert();
        */
    }, []);

    // Carrossel: scroll suave via translateX (leve)
    const go = (dir) => {
        setActive((prev) => {
            const next = prev + dir;
            if (next < 0) return screens.length - 1;
            if (next >= screens.length) return 0;
            return next;
        });
    };

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const offset = active * 100;
        if (reduceMotion) {
            track.style.transform = `translateX(-${offset}%)`;
            return;
        }

        gsap.to(track, {
            xPercent: -offset,
            duration: 0.55,
            ease: "power2.out",
        });
    }, [active]);

    // Bloquear scroll quando zoom estiver ativo
    useEffect(() => {
        if (isZoomed) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isZoomed]);

    return (
        <section
            id={sectionId}
            ref={rootRef}
            className="relative isolate overflow-hidden py-20 sm:py-24 bg-slate-50"
            aria-label="App do Profissional Hausecare"
        >
            {/* Fundo glow similar ao AudienceSection */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(900px 360px at 18% 20%, rgba(43,144,138,0.12), transparent 58%), radial-gradient(800px 380px at 85% 55%, rgba(99,102,241,0.10), transparent 62%)",
                }}
            />

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* LEFT: Texto + benefícios (sem cards) */}
                    <div className="lg:col-span-6">
                        <div
                            data-anim="up"
                            className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-sky-900 shadow-sm backdrop-blur"
                        >
                            <Smartphone className="h-4 w-4 text-emerald-600" />
                            <span>{eyebrow}</span>
                        </div>

                        <h2
                            data-anim="up"
                            className="mt-5 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
                        >
                            {title}
                        </h2>

                        <p
                            data-anim="up"
                            className="mt-4 text-pretty text-base leading-relaxed text-slate-600"
                        >
                            {subtitle}
                        </p>

                        {/* Lista editorial com divisórias (internacional, sem cards repetidos) */}
                        <div
                            data-anim="fade"
                            className="mt-8 rounded-3xl border border-sky-200/70 bg-white/70 shadow-sm backdrop-blur"
                        >
                            <div className="px-5 py-5 sm:px-7 sm:py-6">
                                <p className="text-xs font-semibold tracking-wide text-sky-900/80">
                                    O que o profissional consegue fazer no app
                                </p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Fluxo pensado para a rotina na rua: rapidez, clareza e registro consistente do atendimento.
                                </p>
                            </div>

                            <div className="divide-y divide-sky-200/60">
                                {bullets.map((b) => (
                                    <Row key={b.title} {...b} />
                                ))}
                            </div>

                            {/* “Outcome strip” */}
                            <div className="px-5 py-6 sm:px-7">
                                <div className="flex flex-col gap-3 border-t border-sky-200/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm font-semibold text-slate-900">
                                        Benefício direto para a clínica
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                        <Pill text="Menos ruído operacional" />
                                        <Pill text="Mais agilidade em campo" />
                                        <Pill text="Mais rastreabilidade" />
                                        <Pill text="Rotina padronizada" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div data-anim="up" className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={ctaPrimary.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2b908a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#206e69] focus:outline-none focus:ring-2 focus:ring-[#2b908a]/50"
                            >
                                {ctaPrimary.label}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </a>

                            <a
                                href={ctaSecondary.href}
                                className="inline-flex items-center justify-center rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-900 shadow-sm transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-200"
                            >
                                {ctaSecondary.label}
                            </a>
                        </div>

                        <p className="mt-3 text-xs text-slate-500">
                            Observação: o acesso e as permissões seguem as configurações da empresa no Hausecare.
                        </p>
                    </div>

                    {/* RIGHT: Carrossel “mockup” com imagens do app */}
                    <div className="lg:col-span-6">
                        <div
                            data-anim="fade"
                            className="relative rounded-3xl border border-sky-200/70 bg-white/70 p-5 shadow-sm backdrop-blur"
                        >
                            {/* Header do preview */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <div
                                        data-anim="float"
                                        className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 ring-1 ring-sky-200/70"
                                    >
                                        <Smartphone className="h-5 w-5 text-sky-700" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            App do Profissional
                                        </div>
                                        <div className="text-xs text-slate-600">
                                            Agenda • Atendimento • Evolução • Rota • WhatsApp
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => go(-1)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-900 shadow-sm transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-200"
                                        aria-label="Imagem anterior"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => go(1)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-900 shadow-sm transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-200"
                                        aria-label="Próxima imagem"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Viewport do carrossel */}
                            <div className="mt-5 overflow-hidden rounded-2xl border border-sky-200/70 bg-white">
                                <div
                                    // track: usando xPercent com GSAP no effect
                                    ref={trackRef}
                                    className="flex w-full"
                                    style={{ transform: "translateX(0%)" }}
                                >
                                    {screens.map((img, idx) => (
                                        <div
                                            key={img.src}
                                            className="w-full shrink-0"
                                            aria-hidden={idx !== active}
                                        >
                                            <button
                                                type="button"
                                                className="relative group cursor-zoom-in w-full bg-transparent border-0 p-0"
                                                onClick={() => setIsZoomed(true)}
                                                aria-label="Ampliar imagem do app profissional"
                                            >
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="h-[520px] w-full object-contain bg-white sm:h-[620px]"
                                                    loading={idx <= 1 ? "eager" : "lazy"}
                                                    decoding="async"
                                                />
                                                {/* Hover hint */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    <div className="bg-white/90 rounded-full p-2 shadow-sm backdrop-blur">
                                                        <ZoomIn className="w-5 h-5 text-sky-700" />
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dots */}
                            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                {screens.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActive(i)}
                                        className={[
                                            "h-2.5 w-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-sky-200",
                                            i === active ? "bg-sky-600" : "bg-sky-200 hover:bg-sky-300",
                                        ].join(" ")}
                                        aria-label={`Ir para imagem ${i + 1}`}
                                        aria-pressed={i === active}
                                    />
                                ))}
                            </div>

                            {/* Mini legenda */}
                            <div className="mt-4 rounded-2xl bg-sky-50 px-4 py-3 text-xs text-slate-600">
                                <span className="font-semibold text-slate-900">Dica:</span>{" "}
                                clique na imagem para ampliar ou use as setas para navegar.
                            </div>

                            {/* Accent */}
                            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-sky-200/35 to-emerald-200/25 blur-2xl" />
                        </div>

                        {/* Lightbox / Zoom Overlay - Portal para o Body */}
                        {isZoomed && createPortal(
                            <div
                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 transition-all duration-300 animate-in fade-in"
                                onClick={() => setIsZoomed(false)}
                                role="dialog"
                                aria-modal="true"
                            >
                                {/* Botão fechar */}
                                <button
                                    className="absolute top-4 right-4 md:top-8 md:right-8 p-1 md:p-3 rounded-full text-white/80 hover:text-white md:bg-white/10 md:hover:bg-white/20 transition z-50 md:backdrop-blur-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsZoomed(false);
                                    }}
                                >
                                    <X className="w-6 h-6 md:w-8 md:h-8 shadow-sm" />
                                </button>

                                {/* Conteúdo Imagem Grande */}
                                <div
                                    className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={screens[active].src}
                                        alt={screens[active].alt}
                                        className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                                    />
                                    <p className="mt-4 text-white/90 text-sm font-medium">
                                        {active + 1} / {screens.length} • {screens[active].alt}
                                    </p>

                                    {/* Navegação no Lightbox */}
                                    <button
                                        className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 p-3 text-white hover:text-sky-300 transition"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            go(-1);
                                        }}
                                    >
                                        <ChevronLeft className="w-10 h-10" />
                                    </button>
                                    <button
                                        className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 p-3 text-white hover:text-sky-300 transition"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            go(1);
                                        }}
                                    >
                                        <ChevronRight className="w-10 h-10" />
                                    </button>
                                </div>
                            </div>,
                            document.body
                        )}


                    </div>
                </div>
            </div>
        </section>
    );
}

/* ----------------- Subcomponentes ----------------- */

function Row({ icon: Icon, title, desc }) {
    return (
        <div data-anim="up" className="px-5 py-5 sm:px-7">
            <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 ring-1 ring-sky-200/70">
                    <Icon className="h-5 w-5 text-sky-700" />
                </div>
                <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
            </div>
        </div>
    );
}

function Pill({ text }) {
    return (
        <span className="rounded-full border border-sky-200 bg-white px-3 py-1 font-semibold text-sky-900 shadow-sm">
            {text}
        </span>
    );
}
