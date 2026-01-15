import React, { useMemo } from "react";
import { LegalLayout, Section, Callout, BulletGrid, List, SecurityGrid, ContactCard } from "./LegalComponents";

export function PrivacidadePage() {
    const meta = useMemo(
        () => ({
            title: "Política de Privacidade — Hausecare",
            updatedAt: "15/01/2026",
            intro:
                "A Hausecare valoriza a transparência. Esta Política descreve como coletamos, usamos e protegemos dados pessoais ao operar nossa plataforma.",
            highlights: [
                {
                    title: "Controle e transparência",
                    desc: "Você sabe o que coletamos, por quê e como administrar preferências.",
                },
                {
                    title: "Segurança por padrão",
                    desc: "Boas práticas técnicas e organizacionais para reduzir riscos.",
                },
                {
                    title: "Uso responsável",
                    desc: "Dados são usados para entregar o serviço — não para “vender você”.",
                },
            ],
            toc: [
                { id: "escopo", label: "1. Escopo" },
                { id: "dados", label: "2. Dados coletados" },
                { id: "finalidades", label: "3. Finalidades e bases legais" },
                { id: "compartilhamento", label: "4. Compartilhamento" },
                { id: "retencao", label: "5. Retenção" },
                { id: "seguranca", label: "6. Segurança" },
                { id: "direitos", label: "7. Direitos do titular" },
                { id: "cookies", label: "8. Cookies e analytics" },
                { id: "criancas", label: "9. Crianças e adolescentes" },
                { id: "contato", label: "10. Contato" },
            ],
        }),
        []
    );

    return (
        <LegalLayout meta={meta} kind="privacy">
            <Section id="escopo" title="1. Escopo">
                <p className="text-slate-600 leading-relaxed">
                    Esta Política se aplica ao uso dos sites, aplicativos e serviços da{" "}
                    <span className="font-semibold text-slate-900">Hausecare</span>,
                    incluindo páginas públicas e áreas autenticadas da plataforma.
                </p>
                <Callout>
                    Se sua clínica/empresa é cliente da Hausecare, ela pode atuar como{" "}
                    <span className="font-semibold">Controladora</span> e a Hausecare como{" "}
                    <span className="font-semibold">Operadora</span>, conforme a LGPD.
                </Callout>
            </Section>

            <Section id="dados" title="2. Dados coletados">
                <p className="text-slate-600 leading-relaxed">
                    Coletamos apenas o necessário para fornecer e melhorar o serviço. Os
                    tipos de dados podem incluir:
                </p>
                <BulletGrid
                    items={[
                        {
                            title: "Dados de conta",
                            desc: "Nome, e-mail, telefone, credenciais e informações de acesso.",
                        },
                        {
                            title: "Dados de uso",
                            desc: "Registros de atividade, logs, eventos e preferências na plataforma.",
                        },
                        {
                            title: "Dados operacionais",
                            desc: "Informações inseridas por usuários para gestão (ex.: agendas, registros administrativos).",
                        },
                        {
                            title: "Dados técnicos",
                            desc: "IP, dispositivo, navegador, cookies e identificadores para segurança e performance.",
                        },
                    ]}
                />
                <Callout tone="neutral">
                    Importante: se você inserir dados de terceiros (ex.: pacientes),
                    você deve ter base legal e permissão apropriada para isso.
                </Callout>
            </Section>

            <Section id="finalidades" title="3. Finalidades e bases legais">
                <p className="text-slate-600 leading-relaxed">
                    Usamos os dados para operar a plataforma, garantir segurança,
                    atendimento, melhorias e cumprimento legal. As bases legais podem
                    incluir execução de contrato, legítimo interesse, obrigação legal e
                    consentimento (quando aplicável).
                </p>
                <List>
                    <li>
                        <span className="font-semibold text-slate-900">
                            Prestação do serviço:
                        </span>{" "}
                        autenticação, gestão de acesso, funcionamento de módulos e suporte.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-900">Segurança:</span>{" "}
                        prevenção a fraude, auditoria, investigação e monitoramento.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-900">Comunicação:</span>{" "}
                        avisos operacionais, atualizações e mensagens essenciais.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-900">Melhoria:</span>{" "}
                        métricas agregadas para performance e experiência do usuário.
                    </li>
                </List>
            </Section>

            <Section id="compartilhamento" title="4. Compartilhamento">
                <p className="text-slate-600 leading-relaxed">
                    Não vendemos dados pessoais. Podemos compartilhar dados com:
                </p>
                <List>
                    <li>
                        <span className="font-semibold text-slate-900">Fornecedores:</span>{" "}
                        hospedagem, e-mail transacional, analytics e suporte técnico (sob
                        contrato e confidencialidade).
                    </li>
                    <li>
                        <span className="font-semibold text-slate-900">Requisição legal:</span>{" "}
                        quando houver obrigação por lei, ordem judicial ou autoridade competente.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-900">Cliente (empresa):</span>{" "}
                        quando a empresa é controladora e administra usuários e dados inseridos na plataforma.
                    </li>
                </List>
            </Section>

            <Section id="retencao" title="5. Retenção">
                <p className="text-slate-600 leading-relaxed">
                    Mantemos dados apenas pelo tempo necessário para cumprir finalidades
                    descritas, obrigações legais e legítimos interesses (como segurança e
                    auditoria). Após isso, removemos ou anonimizamos quando possível.
                </p>
            </Section>

            <Section id="seguranca" title="6. Segurança">
                <p className="text-slate-600 leading-relaxed">
                    Adotamos medidas técnicas e organizacionais para proteger dados,
                    incluindo controles de acesso, autenticação, logs, práticas de
                    desenvolvimento seguro e monitoramento.
                </p>
                <SecurityGrid />
            </Section>

            <Section id="direitos" title="7. Direitos do titular">
                <p className="text-slate-600 leading-relaxed">
                    Você pode solicitar confirmação de tratamento, acesso, correção,
                    anonimização, portabilidade, eliminação e revogação de consentimento,
                    conforme aplicável.
                </p>
                <Callout tone="success">
                    Para solicitações, use o canal oficial:{" "}
                    <a
                        className="font-semibold underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900"
                        href="mailto:contato@hausecare.com.br"
                    >
                        contato@hausecare.com.br
                    </a>
                    .
                </Callout>
            </Section>

            <Section id="cookies" title="8. Cookies e analytics">
                <p className="text-slate-600 leading-relaxed">
                    Podemos usar cookies e ferramentas de métricas para entender uso e
                    melhorar performance. Sempre que aplicável, você poderá administrar
                    preferências do navegador e consentimento.
                </p>
            </Section>

            <Section id="criancas" title="9. Crianças e adolescentes">
                <p className="text-slate-600 leading-relaxed">
                    A plataforma é voltada a operações e profissionais. Não é destinada ao
                    uso direto por crianças. Se houver tratamento específico, ele deve
                    observar a legislação aplicável.
                </p>
            </Section>

            <Section id="contato" title="10. Contato">
                <ContactCard />
            </Section>
        </LegalLayout>
    );
}
