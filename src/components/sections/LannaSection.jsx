// src/components/sections/LannaSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
    Sparkles,
    CalendarDays,
    BarChart3,
    Users,
    ClipboardList,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

import lannaImage from "../../assets/imagens/screens/lanna-Hausecare.png";
import LannaChat from "./LannaChat";

/**
 * LannaSection — Container premium para apresentar a agente IA do Hausecare
 * Stack: React + Vite + Tailwind + GSAP + Lucide
 *
 * Imagem (por padrão): /imagens/screens/lanna-Hausecare.png
 * - Se sua imagem estiver em /public/imagens/screens, funciona direto.
 * - Se estiver em /src, passe via prop `imageSrc` importando a imagem.
 */
export default function LannaSection({
    imageSrc = lannaImage,
    eyebrow = "Agente de IA do Hausecare",
    title = "Lanna: a IA que organiza sua agenda e revela seus números",
    subtitle = "Pergunte em linguagem normal e receba respostas em segundos — agenda, atendimentos, equipe e faturamento com visão gerencial, sem caça ao dado.",
    primaryCta = { label: "Conversar com a Lanna", href: "#contato" },
    secondaryCta = { label: "Ver em ação", href: "#demo" },
}) {
    const rootRef = useRef(null);
    const [activeExample, setActiveExample] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const examples = useMemo(
        () => [
            {
                q: "Lanna, como está minha agenda hoje?",
                a: "Hoje você tem 7 atendimentos: 5 confirmados, 1 pendente e 1 em revisão. Próximo atendimento às 14:30. Quer que eu mostre por profissional?",
                tag: "Agenda",
            },
            {
                q: "Quanto eu faturei este mês?",
                a: "No mês atual, seu faturamento total é R$ 18.420, com ticket médio estimado de R$ 263. Você teve 70 atendimentos concluídos e 6 em aberto.",
                tag: "Financeiro",
            },
            {
                q: "Quais atendimentos estão pendentes?",
                a: "Você tem 6 atendimentos pendentes: 3 aguardando confirmação, 2 com ajuste de horário e 1 aguardando pagamento. Posso listar por prioridade.",
                tag: "Pendências",
            },
            {
                q: "Quais profissionais estão em atendimento esta semana?",
                a: "Esta semana, 4 profissionais estão ativos: 2 com alta demanda e 1 com capacidade livre. Quer que eu aponte gargalos e sugestões de redistribuição?",
                tag: "Equipe",
            },
        ],
        []
    );

    const featureCards = useMemo(
        () => [
            {
                icon: CalendarDays,
                title: "Agenda & Rotina",
                desc: "Veja atendimentos do dia/semana/mês e status em tempo real (confirmado, pendente, concluído).",
            },
            {
                icon: BarChart3,
                title: "Financeiro & Performance",
                desc: "Faturamento por período, ticket médio, volume de atendimentos e visão comparativa.",
            },
            {
                icon: Users,
                title: "Operação & Equipe",
                desc: "Quem está atendendo, carga por profissional e leitura rápida de capacidade e demanda.",
            },
            {
                icon: ClipboardList,
                title: "Pendências & Prioridades",
                desc: "Atendimentos em aberto, follow-ups e alertas práticos para não perder receita.",
            },
        ],
        []
    );

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            gsap.set("[data-anim='fade-up']", { y: 14, opacity: 0 });
            gsap.set("[data-anim='fade-in']", { opacity: 0 });
            gsap.set("[data-anim='float']", { y: 0 });

            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

                        tl.to("[data-anim='fade-in']", { opacity: 1, duration: 0.6 }, 0)
                            .to(
                                "[data-anim='fade-up']",
                                { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
                                0.05
                            )
                            .to(
                                "[data-anim='float']",
                                { y: -6, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut" },
                                0.35
                            );

                        io.disconnect();
                    });
                },
                { threshold: 0.2 }
            );

            io.observe(el);
        }, el);

        return () => ctx.revert();
    }, []);

    const active = examples[activeExample];

    return (
        <section
            ref={rootRef}
            className="relative isolate overflow-hidden py-20 sm:py-24"
            aria-label="Seção Lanna - Agente IA"
        >
            {/* Background premium */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#174c77] to-[#2b908a]" />
            <div className="absolute inset-0 -z-10 opacity-70">
                <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/20 to-cyan-400/15 blur-3xl" />
                <div className="absolute -bottom-24 right-[-6rem] h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />
            </div>

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-12">
                    {/* Left */}
                    <div className="lg:col-span-6">
                        <div
                            data-anim="fade-up"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur"
                        >
                            <Sparkles className="h-4 w-4 text-indigo-300" />
                            <span>{eyebrow}</span>
                        </div>

                        <h2
                            data-anim="fade-up"
                            className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                        >
                            {title}
                        </h2>

                        <p
                            data-anim="fade-up"
                            className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-300"
                        >
                            {subtitle}
                        </p>

                        {/* Trust/Security */}
                        <div data-anim="fade-up" className="mt-6 flex flex-wrap gap-3">
                            <Badge icon={ShieldCheck} text="Acesso seguro por permissões" />
                            <Badge icon={BarChart3} text="Dados do painel em tempo real" />
                            <Badge icon={ClipboardList} text="Respostas objetivas e acionáveis" />
                        </div>

                        {/* Feature cards */}
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {featureCards.map((f) => (
                                <FeatureCard key={f.title} {...f} />
                            ))}
                        </div>

                        {/* CTAs */}
                        <div data-anim="fade-up" className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/30 whitespace-nowrap"
                            >
                                {primaryCta.label}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </button>

                            <span className="text-xs text-slate-400">
                                Menos cliques. Mais controle. Zero drama operacional.
                            </span>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="lg:col-span-6">
                        <div
                            data-anim="fade-in"
                            className="relative rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur"
                        >
                            {/* Top bar */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        data-anim="float"
                                        className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10"
                                    >
                                        <img
                                            src={imageSrc}
                                            alt="Lanna - Agente IA do Hausecare"
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">Lanna</div>
                                        <div className="text-xs text-slate-300">IA do seu painel • Respostas rápidas</div>
                                    </div>
                                </div>

                                <div className="hidden sm:flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                                    <span className="text-xs text-slate-300">Online</span>
                                </div>
                            </div>

                            {/* Example chips */}
                            <div className="mt-5 flex flex-wrap gap-2">
                                {examples.map((ex, i) => (
                                    <button
                                        key={ex.q}
                                        type="button"
                                        onClick={() => setActiveExample(i)}
                                        className={[
                                            "rounded-full px-3 py-1 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/20",
                                            i === activeExample
                                                ? "bg-white text-slate-900"
                                                : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
                                        ].join(" ")}
                                        aria-pressed={i === activeExample}
                                    >
                                        {ex.tag}
                                    </button>
                                ))}
                            </div>

                            {/* Chat preview */}
                            <div className="mt-5 space-y-3">
                                <ChatBubble
                                    role="user"
                                    title="Você"
                                    text={active.q}
                                />
                                <ChatBubble
                                    role="assistant"
                                    title="Lanna"
                                    text={active.a}
                                />
                            </div>

                            {/* Small footer */}
                            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                                    <Sparkles className="h-4 w-4 text-indigo-300" />
                                    Por que isso é “nível enterprise”?
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                    Porque a Lanna não entrega “dados”. Ela entrega <span className="text-white font-semibold">decisão</span>:
                                    leitura rápida do cenário, prioridades e próximos passos — no contexto do seu dia.
                                </p>
                            </div>

                            {/* Corner accent */}
                            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 blur-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            <LannaChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </section>
    );
}

/* ---------- Subcomponentes ---------- */

function Badge({ icon: Icon, text }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
            <Icon className="h-4 w-4 text-indigo-300" />
            <span>{text}</span>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }) {
    return (
        <div
            data-anim="fade-up"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/10"
        >
            <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-indigo-200" />
                </div>
                <div>
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <div className="mt-1 text-sm leading-relaxed text-slate-300">{desc}</div>
                </div>
            </div>
        </div>
    );
}

function ChatBubble({ role, title, text }) {
    const isUser = role === "user";

    return (
        <div
            data-anim="fade-up"
            className={[
                "flex gap-3",
                isUser ? "justify-end" : "justify-start",
            ].join(" ")}
        >
            <div
                className={[
                    "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                    isUser
                        ? "bg-white text-slate-900"
                        : "border border-white/10 bg-white/5 text-slate-200",
                ].join(" ")}
            >
                <div className="mb-1 text-xs font-semibold opacity-80">{title}</div>
                <div>{text}</div>
            </div>
        </div>
    );
}
