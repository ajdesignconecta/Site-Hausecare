// src/components/sections/BenefitsInternationalSection.jsx
import { useEffect, useMemo, useRef } from "react";
import {
    HeartPulse,
    ShieldCheck,
    Clock3,
    TrendingUp,
    Stethoscope,
    ArrowRight,
    Sparkles,
} from "lucide-react";

/**
 * BenefitsInternationalSection (SEM cards)
 * - Layout “internacional”: tipografia forte + lista editorial com divisórias
 * - Paleta saúde: sky/teal/emerald (limpo, confiável)
 * - Foco em BENEFÍCIOS (impacto para dono de clínica home care)
 * - React + Tailwind + GSAP + Lucide
 */
export default function BenefitsInternationalSection({
    eyebrow = "Benefícios para clínicas de Home Care",
    title = "Gestão que deixa a operação previsível — e você no controle.",
    subtitle = "O Hausecare reduz o caos do dia a dia e dá uma leitura clara do que está acontecendo: menos improviso, mais rastreabilidade e decisões rápidas.",
    primaryCta = { label: "Solicitar demonstração", href: "https://wa.me/5561992064157" },
    secondaryCta = { label: "Ver planos", href: "#planos" },
}) {
    const rootRef = useRef(null);

    const items = useMemo(
        () => [
            {
                icon: Clock3,
                kicker: "Tempo",
                title: "Menos fricção operacional, mais tempo para gestão.",
                desc: "Você deixa de “caçar informações” e passa a ter uma visão organizada da rotina. Isso reduz retrabalho, desalinhamento e decisões em cima da hora.",
                outcome: "Resultado: rotinas mais leves e decisões mais rápidas.",
            },
            {
                icon: TrendingUp,
                kicker: "Resultado",
                title: "Mais previsibilidade para crescer com segurança.",
                desc: "Quando a operação fica clara, você consegue planejar melhor o mês, ajustar prioridades e manter consistência no atendimento — sem depender de improviso.",
                outcome: "Resultado: crescimento com controle, sem estourar o time.",
            },
            {
                icon: ShieldCheck,
                kicker: "Confiabilidade",
                title: "Mais confiança na operação — do agendamento ao fechamento.",
                desc: "Uma gestão consistente reduz falhas por desorganização e melhora a rastreabilidade do que está acontecendo, diminuindo ruído e incerteza no dia a dia.",
                outcome: "Resultado: menos erros operacionais e mais tranquilidade.",
            },
            {
                icon: Sparkles,
                kicker: "Decisão rápida",
                title: "Direção em segundos com a Lanna (IA) — sem planilha e sem WhatsApp.",
                desc: "A Lanna acelera consultas do dia a dia (agenda, atendimentos, andamento, resultados) em linguagem normal. Você ganha agilidade sem complicar o fluxo.",
                outcome: "Resultado: gestão mais ágil, sem mudar sua rotina.",
            },
        ],
        []
    );

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

            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
                        tl.to("[data-anim='fade']", { opacity: 1, duration: 0.6 }, 0).to(
                            "[data-anim='up']",
                            { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 },
                            0.05
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

    return (
        <section
            ref={rootRef}
            className="relative isolate overflow-hidden py-20 sm:py-24"
            aria-label="Benefícios do Hausecare"
        >
            {/* Fundo “saúde” (clean + confiável) */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-emerald-50" />
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-28 left-1/2 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-200/60 via-teal-200/35 to-emerald-200/40 blur-3xl" />
                <div className="absolute -bottom-24 right-[-6rem] h-80 w-80 rounded-full bg-sky-200/25 blur-3xl" />
            </div>

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Coluna esquerda (sticky no desktop) */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24">
                            <div
                                data-anim="up"
                                className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-sky-900 shadow-sm backdrop-blur"
                            >
                                <HeartPulse className="h-4 w-4 text-emerald-600" />
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

                            {/* “Value line” (sem cards) */}
                            <div
                                data-anim="up"
                                className="mt-8 space-y-3 rounded-2xl border border-sky-200/70 bg-white/70 p-4 shadow-sm backdrop-blur"
                            >
                                <ValueLine
                                    icon={Stethoscope}
                                    title="Operação mais estável"
                                    text="menos improviso, mais consistência."
                                />
                                <ValueLine
                                    icon={TrendingUp}
                                    title="Gestão com direção"
                                    text="decisões mais rápidas e embasadas."
                                />
                                <ValueLine
                                    icon={ShieldCheck}
                                    title="Mais confiança"
                                    text="rotina organizada e rastreável."
                                />
                            </div>

                            {/* CTAs */}
                            <div data-anim="up" className="mt-8 flex flex-col gap-3">
                                <a
                                    href={primaryCta.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2b908a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#206e69] focus:outline-none focus:ring-2 focus:ring-[#2b908a]/50"
                                >
                                    {primaryCta.label}
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </a>

                                <a
                                    href={secondaryCta.href}
                                    className="inline-flex items-center justify-center rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-900 shadow-sm transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-200"
                                >
                                    {secondaryCta.label}
                                </a>

                                <p className="text-xs text-slate-500">
                                    Foco em benefícios: reduzir caos, aumentar controle e dar previsibilidade.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna direita (lista editorial com divisórias — sem cards) */}
                    <div className="lg:col-span-8">
                        <div
                            data-anim="fade"
                            className="rounded-3xl border border-sky-200/70 bg-white/65 shadow-sm backdrop-blur showing:opacity-100"
                        >
                            <div className="px-5 py-5 sm:px-8 sm:py-7">
                                <p className="text-xs font-semibold tracking-wide text-sky-900/80">
                                    O que muda na prática
                                </p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Benefícios desenhados para o dono de clínica: visão clara da rotina, mais agilidade e menos estresse operacional.
                                </p>
                            </div>

                            <div className="divide-y divide-sky-200/60">
                                {items.map((it) => (
                                    <BenefitRow key={it.title} {...it} />
                                ))}
                            </div>

                            {/* Rodapé “ROI strip” sem cards */}
                            <div className="px-5 py-6 sm:px-8">
                                <div className="flex flex-col gap-3 border-t border-sky-200/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm font-semibold text-slate-900">
                                        Gestão mais leve, operação mais previsível.
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                        <Pill text="Menos retrabalho" />
                                        <Pill text="Mais clareza diária" />
                                        <Pill text="Decisões mais rápidas" />
                                        <Pill text="Rotina mais estável" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Observação sutil (sem prometer módulo) */}
                        <p className="mt-4 text-xs leading-relaxed text-slate-500">
                            Observação: os benefícios dependem do uso consistente do sistema na rotina da clínica e das permissões de acesso configuradas.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ----------------- Subcomponentes ----------------- */

function ValueLine({ icon: Icon, title, text }) {
    return (
        <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-100 to-emerald-100 ring-1 ring-sky-200/70">
                <Icon className="h-4 w-4 text-sky-700" />
            </div>
            <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900">{title}</div>
                <div className="text-sm text-slate-600">{text}</div>
            </div>
        </div>
    );
}

function BenefitRow({ icon: Icon, kicker, title, desc, outcome }) {
    return (
        <div
            data-anim="up"
            className="group px-5 py-6 transition hover:bg-sky-50/50 sm:px-8"
        >
            <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 ring-1 ring-sky-200/70">
                    <Icon className="h-5 w-5 text-sky-700" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold tracking-wide text-emerald-700">
                            {kicker}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-xs text-slate-500">benefício direto para gestão</span>
                    </div>

                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                        {title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>

                    <p className="mt-3 text-sm font-semibold text-slate-900">
                        {outcome}
                    </p>
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
