import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ----------------------------- SHARED LAYOUT ----------------------------- */

export function LegalLayout({ meta, kind, children }) {
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
            <header className="pt-24 md:pt-32 pb-8">
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
                            <Link
                                to={kind === "privacy" ? "/legal/termos" : "/legal/privacidade"}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110"
                            >
                                <SwapIcon className="h-4 w-4" />
                                {kind === "privacy" ? "Ver Termos de Uso" : "Ver Política de Privacidade"}
                            </Link>

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

                </div>
            </section>
        </main>
    );
}

/* ----------------------------- COMPONENTS ----------------------------- */

export function Section({ id, title, children }) {
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

export function List({ children }) {
    return (
        <ul className="mt-4 space-y-3 text-slate-700 text-sm leading-relaxed list-disc pl-5">
            {children}
        </ul>
    );
}

export function Callout({ children, tone = "info" }) {
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

export function BulletGrid({ items }) {
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

export function SecurityGrid() {
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

export function ContactCard() {
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

export function SwapIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 7h11l-2.5-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 17H6l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 7v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M6 17v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

export function LinkIcon({ className = "" }) {
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
