import React, { useMemo, useState, useEffect } from "react";

export function TermosPage() {
    const meta = useMemo(
        () => ({
            title: "Termos de Uso — Hausecare",
            updatedAt: "15/01/2026",
            intro:
                "Estes Termos definem as regras para uso da plataforma Hausecare. Ao usar, você concorda com estas condições.",
            highlights: [
                {
                    title: "Uso responsável",
                    desc: "Você é responsável pelas credenciais e pelo conteúdo inserido.",
                },
                {
                    title: "Disponibilidade e evolução",
                    desc: "Melhorias contínuas podem alterar funcionalidades sem quebrar o essencial.",
                },
                {
                    title: "Conformidade",
                    desc: "Uso deve respeitar leis, privacidade e boas práticas profissionais.",
                },
            ],
            toc: [
                { id: "aceite", label: "1. Aceite" },
                { id: "conta", label: "2. Conta e acesso" },
                { id: "uso", label: "3. Uso permitido" },
                { id: "conteudo", label: "4. Conteúdo e responsabilidade" },
                { id: "planos", label: "5. Planos e cobrança" },
                { id: "sla", label: "6. Disponibilidade e suporte" },
                { id: "propriedade", label: "7. Propriedade intelectual" },
                { id: "limitacao", label: "8. Limitação de responsabilidade" },
                { id: "rescisao", label: "9. Suspensão e encerramento" },
                { id: "alteracoes", label: "10. Alterações" },
                { id: "contato", label: "11. Contato" },
            ],
        }),
        []
    );

    return (
        <LegalLayout meta={meta} kind="terms">
            <Section id="aceite" title="1. Aceite">
                <p className="text-slate-600 leading-relaxed">
                    Ao acessar ou usar a plataforma Hausecare, você concorda com estes
                    Termos. Se você usa em nome de uma empresa, declara ter poderes para
                    aceitar em nome dela.
                </p>
            </Section>

            <Section id="conta" title="2. Conta e acesso">
                <List>
                    <li>
                        Você deve fornecer informações verdadeiras e manter dados de cadastro
                        atualizados.
                    </li>
                    <li>
                        Você é responsável por manter suas credenciais seguras e por toda
                        atividade em sua conta.
                    </li>
                    <li>
                        Podemos aplicar medidas de segurança adicionais quando necessário.
                    </li>
                </List>
            </Section>

            <Section id="uso" title="3. Uso permitido">
                <p className="text-slate-600 leading-relaxed">
                    Você concorda em não usar a plataforma para atividades ilegais, abuso,
                    tentativas de acesso indevido, engenharia reversa ou interferência nos
                    serviços.
                </p>
                <Callout tone="neutral">
                    “Profissional” aqui significa: usar a plataforma para melhorar a
                    operação — não para criar caos digital gratuito.
                </Callout>
            </Section>

            <Section id="conteudo" title="4. Conteúdo e responsabilidade">
                <p className="text-slate-600 leading-relaxed">
                    Você é responsável pelo conteúdo que insere (dados, textos, arquivos e
                    informações). Se incluir dados de terceiros, garante que possui base
                    legal e permissões necessárias.
                </p>
            </Section>

            <Section id="planos" title="5. Planos e cobrança">
                <p className="text-slate-600 leading-relaxed">
                    Planos, preços e condições comerciais podem variar conforme proposta,
                    contrato e políticas vigentes no momento da contratação.
                </p>
                <List>
                    <li>Assinaturas podem ser mensais ou anuais, conforme plano.</li>
                    <li>Cancelamentos e reembolsos seguem regras do plano/contrato.</li>
                    <li>
                        Serviços de terceiros integrados podem ter cobranças separadas.
                    </li>
                </List>
            </Section>

            <Section id="sla" title="6. Disponibilidade e suporte">
                <p className="text-slate-600 leading-relaxed">
                    Trabalhamos para manter alta disponibilidade. Manutenções podem ocorrer
                    com comunicação prévia quando possível. O suporte é prestado conforme
                    canal e nível contratado.
                </p>
            </Section>

            <Section id="propriedade" title="7. Propriedade intelectual">
                <p className="text-slate-600 leading-relaxed">
                    A plataforma, marca, interfaces e materiais são de propriedade da
                    Hausecare. Você recebe uma licença limitada para uso durante a vigência
                    do contrato, sem transferência de direitos.
                </p>
            </Section>

            <Section id="limitacao" title="8. Limitação de responsabilidade">
                <p className="text-slate-600 leading-relaxed">
                    Na extensão permitida por lei, a Hausecare não se responsabiliza por
                    perdas indiretas, lucros cessantes ou danos causados por mau uso,
                    falhas de terceiros, internet do usuário ou eventos fora do controle
                    razoável.
                </p>
            </Section>

            <Section id="rescisao" title="9. Suspensão e encerramento">
                <List>
                    <li>
                        Podemos suspender acesso em caso de violação destes Termos, risco de
                        segurança ou exigência legal.
                    </li>
                    <li>
                        Você pode encerrar conforme condições do seu plano/contrato.
                    </li>
                </List>
            </Section>

            <Section id="alteracoes" title="10. Alterações">
                <p className="text-slate-600 leading-relaxed">
                    Podemos atualizar estes Termos para refletir mudanças legais, técnicas
                    ou de produto. Quando relevante, avisaremos por canais apropriados.
                </p>
            </Section>

            <Section id="contato" title="11. Contato">
                <ContactCard />
            </Section>
        </LegalLayout>
    );
}

/* ----------------------------- SHARED LAYOUT ----------------------------- */

function LegalLayout({ meta, kind, children }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const onHash = () => {
            // foco suave ao navegar pelo TOC
            const id = window.location.hash?.replace("#", "");
            if (!id) return;
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    const badge = kind === "privacy" ? "Privacidade" : "Termos";

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // sem drama
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(900px 420px at 12% 18%, rgba(43,144,138,0.10), transparent 58%), radial-gradient(900px 480px at 88% 40%, rgba(99,102,241,0.08), transparent 62%), linear-gradient(180deg, rgba(15,23,42,0.03) 0%, transparent 40%)",
                }}
            />

            {/* Header premium */}
            <header className="pt-14 md:pt-20 pb-8">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {badge} • Atualizado em {meta.updatedAt}
                    </div>

                    <div className="mt-4 flex flex-col gap-4">
                        <h1
                            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            {meta.title}
                        </h1>
                        <p className="max-w-3xl text-slate-600 text-base md:text-lg leading-relaxed">
                            {meta.intro}
                        </p>

                        <div className="mt-2 grid md:grid-cols-3 gap-3">
                            {meta.highlights.map((h) => (
                                <div
                                    key={h.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                >
                                    <p className="text-sm font-extrabold text-slate-900">
                                        {h.title}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                                        {h.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <a
                                href={kind === "privacy" ? "/legal/termos" : "/legal/privacidade"}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110"
                            >
                                <SwapIcon className="h-4 w-4" />
                                {kind === "privacy" ? "Ver Termos de Uso" : "Ver Política de Privacidade"}
                            </a>

                            <button
                                type="button"
                                onClick={copyLink}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                            >
                                <LinkIcon className="h-4 w-4" />
                                {copied ? "Link copiado" : "Copiar link"}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* body */}
            <section className="pb-16 md:pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-start">
                        {/* TOC */}
                        <aside className="sticky top-6 self-start hidden lg:block">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-sm font-extrabold text-slate-900">
                                    Navegação
                                </p>
                                <nav className="mt-4">
                                    <ul className="space-y-2 text-sm">
                                        {meta.toc.map((i) => (
                                            <li key={i.id}>
                                                <a
                                                    href={`#${i.id}`}
                                                    className="block rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                                                >
                                                    {i.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                <div className="mt-5 pt-5 border-t border-slate-200 text-xs text-slate-500">
                                    Última atualização: <span className="font-semibold">{meta.updatedAt}</span>
                                </div>
                            </div>
                        </aside>

                        {/* CONTENT */}
                        <article className="rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.10)] overflow-hidden">
                            <div
                                aria-hidden="true"
                                className="h-[6px] w-full"
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(43,144,138,1), rgba(99,102,241,1), rgba(244,63,94,1))",
                                }}
                            />
                            <div className="p-7 md:p-9">{children}</div>

                            <div className="px-7 md:px-9 pb-8">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-extrabold text-slate-900">
                                        Transparência é estratégia.
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                                        Se algo aqui não estiver claro, fale com a gente. Documento
                                        bom não é o que assusta — é o que orienta.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="mt-12 text-center text-xs text-slate-500">
                        © {new Date().getFullYear()} Hausecare
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ----------------------------- COMPONENTS ----------------------------- */

function Section({ id, title, children }) {
    return (
        <section id={id} className="scroll-mt-28">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {title}
            </h2>
            <div className="mt-3">{children}</div>
            <div className="mt-8 h-px w-full bg-slate-200" aria-hidden="true" />
            <div className="mt-8" />
        </section>
    );
}

function List({ children }) {
    return (
        <ul className="mt-4 space-y-3 text-slate-700 text-sm leading-relaxed list-disc pl-5">
            {children}
        </ul>
    );
}

function Callout({ children, tone = "info" }) {
    const styles = {
        info: "border-indigo-200 bg-indigo-50 text-indigo-900",
        success: "border-emerald-200 bg-emerald-50 text-emerald-900",
        neutral: "border-slate-200 bg-slate-50 text-slate-800",
    }[tone];

    return (
        <div className={`mt-5 rounded-2xl border p-4 text-sm leading-relaxed ${styles}`}>
            {children}
        </div>
    );
}

function BulletGrid({ items }) {
    return (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
            {items.map((it) => (
                <div
                    key={it.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                    <p className="text-sm font-extrabold text-slate-900">{it.title}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{it.desc}</p>
                </div>
            ))}
        </div>
    );
}

function SecurityGrid() {
    const items = [
        { title: "Acesso controlado", desc: "Perfis e permissões por função." },
        { title: "Registro e auditoria", desc: "Logs e rastreabilidade." },
        { title: "Minimização", desc: "Coleta do necessário para operar." },
        { title: "Boas práticas", desc: "Processos e padrões de segurança." },
    ];

    return (
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {items.map((it) => (
                <div
                    key={it.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                    <p className="text-sm font-extrabold text-slate-900">{it.title}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{it.desc}</p>
                </div>
            ))}
        </div>
    );
}

function ContactCard() {
    return (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
            <a
                href="mailto:contato@hausecare.com.br"
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:bg-slate-50"
            >
                <p className="text-xs font-semibold text-slate-500">E-mail</p>
                <p className="mt-1 text-sm font-extrabold text-slate-900">
                    contato@hausecare.com.br
                </p>
                <p className="mt-2 text-xs text-slate-500 group-hover:text-slate-700 transition">
                    Abrir e-mail
                </p>
            </a>

            <a
                href="tel:+556191519369"
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:bg-slate-50"
            >
                <p className="text-xs font-semibold text-slate-500">Telefone</p>
                <p className="mt-1 text-sm font-extrabold text-slate-900">
                    61 9151-9369
                </p>
                <p className="mt-2 text-xs text-slate-500 group-hover:text-slate-700 transition">
                    Ligar agora
                </p>
            </a>
        </div>
    );
}

/* ----------------------------- ICONS ----------------------------- */

function SwapIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 7h11l-2.5-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 17H6l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 7v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M6 17v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function LinkIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M10 13a5 5 0 0 1 0-7l.5-.5a5 5 0 0 1 7 7l-1 1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M14 11a5 5 0 0 1 0 7l-.5.5a5 5 0 0 1-7-7l1-1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}