// src/pages/Contato.jsx
// (Se você estiver usando Next.js App Router, pode mover para: src/app/contato/page.jsx
// e manter o export default do mesmo jeito.)

import React, { useMemo, useState } from "react";
import SEO from "../components/SEO";

const CONTACT = {
    email: "contato@hausecare.com.br",
    phoneLabel: "61 9151-9369",
    phoneTel: "+556191519369",
};

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export default function Contato() {
    const [status, setStatus] = useState({ type: "idle", message: "" });
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
    });
    const [touched, setTouched] = useState({});

    const errors = useMemo(() => {
        const e = {};
        if (!form.name.trim()) e.name = "Informe seu nome.";
        if (!isEmail(form.email)) e.email = "Informe um e-mail válido.";
        if (!form.subject.trim()) e.subject = "Informe o assunto.";
        if (String(form.message || "").trim().length < 20)
            e.message = "Conte um pouco mais (mín. 20 caracteres).";
        return e;
    }, [form]);

    const hasErrors = Object.keys(errors).length > 0;

    function setField(key, value) {
        setForm((s) => ({ ...s, [key]: value }));
    }

    function markTouched(key) {
        setTouched((s) => ({ ...s, [key]: true }));
    }

    function mailtoHref() {
        const subject = encodeURIComponent(form.subject || "Contato — Hausecare");
        const bodyLines = [
            `Nome: ${form.name || "-"}`,
            `E-mail: ${form.email || "-"}`,
            `Empresa: ${form.company || "-"}`,
            "",
            "Mensagem:",
            `${form.message || "-"}`,
        ];
        const body = encodeURIComponent(bodyLines.join("\n"));
        return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    }

    async function onSubmit(e) {
        e.preventDefault();
        setTouched({
            name: true,
            email: true,
            company: true,
            subject: true,
            message: true,
        });

        if (hasErrors) {
            setStatus({
                type: "error",
                message: "Revise os campos destacados antes de enviar.",
            });
            return;
        }

        setStatus({ type: "submitting", message: "Enviando sua mensagem..." });

        try {
            const response = await fetch("https://formsubmit.co/ajax/contato@hausecare.com.br", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    company: form.company,
                    _subject: `Novo contato: ${form.subject}`, // Assunto especial pro FormSubmit
                    message: form.message,
                    _template: "table", // Formato bonitinho
                    _captcha: "false" // Tenta desativar captcha (pode exigir config no email)
                })
            });

            if (response.ok) {
                setStatus({
                    type: "success",
                    message: "Mensagem enviada com sucesso! Em breve entraremos em contato.",
                });
                // Limpa o formulário
                setForm({
                    name: "",
                    email: "",
                    company: "",
                    subject: "",
                    message: "",
                });
                setTouched({});
            } else {
                throw new Error("Erro no envio");
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Houve um erro ao enviar. Tente novamente ou use o botão de e-mail direto.",
            });
        }
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <SEO
                title="Contato | Fale com a Hausecare"
                description="Entre em contato com a Hausecare. Solicite uma demonstração do sistema de gestão para Home Care ou tire suas dúvidas sobre o software."
                path="/contato"
            />
            {/* Background removido para igualar à página de Planos */}
            {/* <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(900px 420px at 12% 18%, rgba(43,144,138,0.12), transparent 58%), radial-gradient(900px 480px at 88% 40%, rgba(99,102,241,0.10), transparent 62%), linear-gradient(180deg, rgba(15,23,42,0.03) 0%, transparent 40%)",
                }}
            /> */}

            {/* HERO */}
            <section className="relative pt-24 md:pt-32 pb-10 md:pb-14">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Atendimento humano + resposta rápida
                    </div>

                    <div className="mt-4 flex flex-col gap-4 md:gap-5">
                        <h1
                            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            Fale com a Hausecare
                        </h1>
                        <p className="max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed">
                            Quer uma demonstração, tirar dúvidas ou discutir implantação? A gente
                            responde com objetividade e sem “blá-blá-blá corporativo” (só o
                            necessário — e bem feito).
                        </p>

                        <div className="mt-2 flex flex-col sm:flex-row gap-3">
                            <a
                                href={`mailto:${CONTACT.email}`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110"
                            >
                                <MailIcon className="h-4 w-4" />
                                Enviar e-mail
                            </a>
                            <a
                                href="https://wa.me/5561991519369"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                            >
                                <PhoneIcon className="h-4 w-4" />
                                Falar no WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="pb-16 md:pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
                        {/* FORM CARD */}
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
                            {/* brand bar */}
                            <div
                                aria-hidden="true"
                                className="h-[6px] w-full"
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(43,144,138,1), rgba(99,102,241,1), rgba(244,63,94,1))",
                                }}
                            />

                            <div className="p-7 md:p-9">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                                            Envie sua mensagem
                                        </h2>
                                        <p className="mt-2 text-slate-600 leading-relaxed">
                                            Preencha o formulário e, ao enviar, abriremos seu e-mail já
                                            com a mensagem pronta. Simples, rápido e confiável.
                                        </p>
                                    </div>

                                    <div className="hidden md:flex items-center justify-center h-12 w-12 rounded-2xl border border-slate-200 bg-slate-50">
                                        <SparkIcon className="h-6 w-6 text-slate-700" />
                                    </div>
                                </div>

                                {/* status banner */}
                                {status.type !== "idle" && (
                                    <div
                                        className={[
                                            "mt-6 rounded-2xl border p-4 text-sm",
                                            status.type === "success"
                                                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                                                : "border-rose-200 bg-rose-50 text-rose-900",
                                        ].join(" ")}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        {status.message}
                                    </div>
                                )}

                                <form className="mt-7 space-y-5" onSubmit={onSubmit} noValidate>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Field
                                            label="Seu nome"
                                            required
                                            value={form.name}
                                            onChange={(v) => setField("name", v)}
                                            onBlur={() => markTouched("name")}
                                            placeholder="Ex: Arnaldo Junior"
                                            error={touched.name ? errors.name : ""}
                                        />

                                        <Field
                                            label="Seu e-mail"
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(v) => setField("email", v)}
                                            onBlur={() => markTouched("email")}
                                            placeholder="voce@empresa.com"
                                            error={touched.email ? errors.email : ""}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Field
                                            label="Empresa (opcional)"
                                            value={form.company}
                                            onChange={(v) => setField("company", v)}
                                            onBlur={() => markTouched("company")}
                                            placeholder="Nome da clínica / operação"
                                        />

                                        <Field
                                            label="Assunto"
                                            required
                                            value={form.subject}
                                            onChange={(v) => setField("subject", v)}
                                            onBlur={() => markTouched("subject")}
                                            placeholder="Ex: Demonstração e implantação"
                                            error={touched.subject ? errors.subject : ""}
                                        />
                                    </div>

                                    <FieldArea
                                        label="Mensagem"
                                        required
                                        value={form.message}
                                        onChange={(v) => setField("message", v)}
                                        onBlur={() => markTouched("message")}
                                        placeholder="Conte rapidamente seu cenário, volume de atendimentos e o que você quer melhorar..."
                                        error={touched.message ? errors.message : ""}
                                        hint="Dica: quanto mais contexto, melhor a demonstração."
                                    />

                                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                        <button
                                            type="submit"
                                            className={[
                                                "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition",
                                                hasErrors
                                                    ? "bg-slate-400 cursor-not-allowed"
                                                    : "bg-slate-900 hover:brightness-110",
                                            ].join(" ")}
                                            disabled={hasErrors || status.type === "submitting"}
                                        >
                                            {status.type === "submitting" ? (
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <SendIcon className="h-4 w-4" />
                                            )}
                                            {status.type === "submitting" ? "Enviando..." : "Enviar mensagem"}
                                        </button>

                                        <a
                                            href={mailtoHref()}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                                        >
                                            <CopyIcon className="h-4 w-4" />
                                            Abrir e-mail com rascunho
                                        </a>
                                    </div>

                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Ao enviar, você confirma que os dados acima são para fins de
                                        contato. Sem spam, sem circo.
                                    </p>
                                </form>
                            </div>

                            {/* detalhe glow */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl opacity-25"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(99,102,241,1) 0%, transparent 60%)",
                                }}
                            />
                        </div>

                        {/* INFO / CARDS */}
                        <aside className="space-y-6">
                            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                                <h3 className="text-lg font-extrabold text-slate-900">
                                    Contato direto
                                </h3>
                                <p className="mt-2 text-slate-600 leading-relaxed">
                                    Prefere ir reto ao ponto? Aqui estão os canais oficiais.
                                </p>

                                <div className="mt-6 space-y-3">
                                    <ContactRow
                                        icon={<MailIcon className="h-4 w-4" />}
                                        label="E-mail"
                                        value={CONTACT.email}
                                        href={`mailto:${CONTACT.email}`}
                                    />
                                    <ContactRow
                                        icon={<PhoneIcon className="h-4 w-4" />}
                                        label="Telefone"
                                        value={CONTACT.phoneLabel}
                                        href={`tel:${CONTACT.phoneTel}`}
                                    />
                                </div>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                                <h3 className="text-lg font-extrabold text-slate-900">
                                    Tempo de resposta
                                </h3>
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <Metric label="Comercial" value="até 2h" />
                                    <Metric label="Suporte" value="até 4h" />
                                    <Metric label="Implantação" value="em 24h" />
                                    <Metric label="SLA" value="priorizado" />
                                </div>
                                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                                    Em horários comerciais (BRT). Fora disso, a gente responde o
                                    mais rápido possível — sem prometer o impossível.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                                <h3 className="text-lg font-extrabold text-slate-900">
                                    Próximos passos
                                </h3>
                                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                                    <li className="flex gap-3">
                                        <StepDot />
                                        <span>
                                            Entendemos seu cenário e objetivo (5–10 min).
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <StepDot />
                                        <span>
                                            Demonstração focada no seu fluxo (sem tour genérico).
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <StepDot />
                                        <span>
                                            Proposta com implantação e evolução do produto.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>

                    {/* FOOT NOTE */}

                </div>
            </section>
        </main>
    );
}

/* ------------------------------ UI Parts ------------------------------ */

function Field({
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    type = "text",
    required = false,
}) {
    const id = useMemo(
        () => `field_${label.toLowerCase().replace(/\s+/g, "_")}_${Math.random().toString(16).slice(2)}`,
        [label]
    );

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-slate-900">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={[
                        "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition",
                        "placeholder:text-slate-400",
                        error
                            ? "border-rose-300 ring-2 ring-rose-100 focus:border-rose-400"
                            : "border-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-100",
                    ].join(" ")}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}_error` : undefined}
                />
            </div>
            {error && (
                <p id={`${id}_error`} className="mt-2 text-xs text-rose-600">
                    {error}
                </p>
            )}
        </div>
    );
}

function FieldArea({
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    required = false,
    hint,
}) {
    const id = useMemo(
        () => `field_${label.toLowerCase().replace(/\s+/g, "_")}_${Math.random().toString(16).slice(2)}`,
        [label]
    );

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-slate-900">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <div className="mt-2">
                <textarea
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    rows={6}
                    className={[
                        "w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition",
                        "placeholder:text-slate-400",
                        error
                            ? "border-rose-300 ring-2 ring-rose-100 focus:border-rose-400"
                            : "border-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-100",
                    ].join(" ")}
                    aria-invalid={!!error}
                    aria-describedby={
                        error ? `${id}_error` : hint ? `${id}_hint` : undefined
                    }
                />
            </div>
            {hint && !error && (
                <p id={`${id}_hint`} className="mt-2 text-xs text-slate-500">
                    {hint}
                </p>
            )}
            {error && (
                <p id={`${id}_error`} className="mt-2 text-xs text-rose-600">
                    {error}
                </p>
            )}
        </div>
    );
}

function ContactRow({ icon, label, value, href }) {
    return (
        <a
            href={href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:bg-slate-50"
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">{label}</p>
                    <p className="text-sm font-semibold text-slate-900 truncate">
                        {value}
                    </p>
                </div>
            </div>
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition">
                Abrir
            </span>
        </a>
    );
}

function Metric({ label, value }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">{label}</p>
            <p className="mt-1 text-lg font-extrabold text-slate-900">{value}</p>
        </div>
    );
}

function StepDot() {
    return (
        <span
            aria-hidden="true"
            className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0"
        />
    );
}

/* ------------------------------ Icons ------------------------------ */

function MailIcon({ className = "" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M6.5 7.5 12 12l5.5-4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function PhoneIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7.5 4.75h1.2c.6 0 1.13.37 1.34.93l.74 1.97c.19.51.06 1.08-.33 1.45l-1.06 1.02c1.06 2.05 2.7 3.7 4.75 4.75l1.02-1.06c.37-.39.94-.52 1.45-.33l1.97.74c.56.21.93.74.93 1.34v1.2a1.75 1.75 0 0 1-1.75 1.75C10.1 20 4 13.9 4 6.5A1.75 1.75 0 0 1 5.75 4.75Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SendIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M3.5 12 20.5 4.5 16.5 19.5 11.5 12.5 3.5 12Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M11.5 12.5 20.5 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function CopyIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M9 9h10v10H9V9Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M5 15V5h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function SparkIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 2l1.1 4.2L17 8l-3.9 1.8L12 14l-1.1-4.2L7 8l3.9-1.8L12 2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M19 13l.7 2.7L22 17l-2.3 1.3L19 21l-.7-2.7L16 17l2.3-1.3L19 13Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    );
}
