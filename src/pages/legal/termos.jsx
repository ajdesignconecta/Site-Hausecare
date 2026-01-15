import React, { useMemo } from "react";
import { LegalLayout, Section, List, Callout, ContactCard } from "./LegalComponents";

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