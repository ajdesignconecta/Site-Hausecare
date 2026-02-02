import React, { useMemo } from "react";
import { LegalLayout, Section, Callout, BulletGrid, List, SecurityGrid, ContactCard } from "./LegalComponents";

export function PrivacidadePage() {
    const meta = useMemo(
        () => ({
            title: "Política de Privacidade — Hausecare",
            updatedAt: "02/02/2026",
            intro:
                "A Hausecare valoriza a transparência. Esta Política descreve como coletamos, usamos e protegemos dados pessoais ao operar nossa plataforma e aplicativo móvel.",
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
                { id: "escopo", label: "1. Escopo e Identificação" },
                { id: "dados", label: "2. Dados coletados" },
                { id: "permissoes", label: "3. Permissões do App" },
                { id: "finalidades", label: "4. Finalidades e bases legais" },
                { id: "compartilhamento", label: "5. Compartilhamento" },
                { id: "retencao", label: "6. Retenção" },
                { id: "seguranca", label: "7. Segurança" },
                { id: "direitos", label: "8. Direitos do titular" },
                { id: "cookies", label: "9. Cookies e analytics" },
                { id: "criancas", label: "10. Crianças e adolescentes" },
                { id: "contato", label: "11. Contato" },
            ],
        }),
        []
    );

    return (
        <LegalLayout meta={meta} kind="privacy">
            <Section id="escopo" title="1. Escopo e Identificação">
                <p className="text-slate-600 leading-relaxed">
                    Esta Política se aplica ao uso dos sites, aplicativos e serviços da{" "}
                    <span className="font-semibold text-slate-900">Hausecare</span>,
                    operada pela empresa <span className="font-semibold text-slate-900">Webize Tecnologia LTDA</span>,
                    inscrita no CNPJ sob o nº <span className="font-semibold text-slate-900">54.476.220/0001-15</span>.
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

            <Section id="permissoes" title="3. Permissões do App">
                <p className="text-slate-600 leading-relaxed">
                    Para o funcionamento pleno do aplicativo móvel, solicitamos as seguintes permissões:
                </p>
                <BulletGrid
                    items={[
                        {
                            title: "Câmera e Galeria",
                            desc: "Utilizada para capturar fotos de documentos, perfis ou anexar arquivos aos registros de pacientes.",
                        },
                        {
                            title: "Localização",
                            desc: "Necessária para o registro de check-in/check-out de atendimentos domiciliares, garantindo a rastreabilidade e segurança operacional.",
                        },
                        {
                            title: "Notificações",
                            desc: "Utilizada para enviar alertas de agenda, lembretes de medicamentos e atualizações importantes do sistema.",
                        },
                        {
                            title: "Armazenamento",
                            desc: "Utilizado para salvar documentos baixados e cache de mídia para carregar dados mais rapidamente.",
                        },
                    ]}
                />
            </Section>

            <Section id="finalidades" title="4. Finalidades e bases legais">
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

            <Section id="compartilhamento" title="5. Compartilhamento">
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

            <Section id="retencao" title="6. Retenção">
                <p className="text-slate-600 leading-relaxed">
                    Mantemos dados apenas pelo tempo necessário para cumprir finalidades
                    descritas, obrigações legais e legítimos interesses (como segurança e
                    auditoria). Após isso, removemos ou anonimizamos quando possível.
                </p>
            </Section>

            <Section id="seguranca" title="7. Segurança">
                <p className="text-slate-600 leading-relaxed">
                    Adotamos medidas técnicas e organizacionais para proteger dados,
                    incluindo controles de acesso, autenticação, logs, práticas de
                    desenvolvimento seguro e monitoramento. Os dados são armazenados em servidores seguros com criptografia de ponta.
                </p>
                <SecurityGrid />
            </Section>

            <Section id="direitos" title="8. Direitos do titular">
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

            <Section id="cookies" title="9. Cookies e analytics">
                <p className="text-slate-600 leading-relaxed">
                    Podemos usar cookies e ferramentas de métricas para entender uso e
                    melhorar performance. Sempre que aplicável, você poderá administrar
                    preferências do navegador e consentimento.
                </p>
            </Section>

            <Section id="criancas" title="10. Crianças e adolescentes">
                <p className="text-slate-600 leading-relaxed">
                    A plataforma é voltada a operações e profissionais. Não é destinada ao
                    uso direto por crianças. Se houver tratamento específico, ele deve
                    observar a legislação aplicável.
                </p>
            </Section>

            <Section id="contato" title="11. Contato">
                <ContactCard />
            </Section>
        </LegalLayout>
    );
}
