import React, { lazy, Suspense } from "react";
import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";
import StickyCta from "../components/sections/StickyCta";
import ProblemSection from "../components/sections/ProblemSection";
import AudienceSection from "../components/sections/LGPD/AudienceSection";

// Lazy Load das outras seções (mantendo otimização onde é seguro)
const IntegrationsSection = lazy(() => import("../components/sections/IntegrationsSection"));
const FlowSection = lazy(() => import("../components/sections/HowItWorks"));
const ManagementSection = lazy(() => import("../components/sections/ManagementSection"));
const ProfessionalAppSection = lazy(() => import("../components/sections/ProfessionalAppSection"));
const LannaSection = lazy(() => import("../components/sections/LannaSection"));
const PlansSection = lazy(() => import("../components/sections/PlansSection"));
const FaqSection = lazy(() => import("../components/sections/FaqSection"));
const FinalCTA = lazy(() => import("../components/sections/FinalCTA"));
const BenefitsHausecareSection = lazy(() => import("../components/sections/BenefitsHausecareSection"));

export default function Home() {
  return (
    <main aria-label="Página inicial da Hausecare">
      <SEO
        title="Sistema para Home Care | Software de Gestão para Clínicas de Atendimento Domiciliar"
        description="Hausecare: o sistema completo para gestão de Home Care. Agenda, prontuário digital, rotas, financeiro e controle de equipe. Software para clínicas de atendimento domiciliar."
        path="/"
      />

      {/* CTA sticky — aparece ao rolar */}
      <StickyCta />

      {/* HERO — Above the fold */}
      <section id="inicio" aria-label="Início">
        <Hero />
      </section>

      {/* Conteúdo abaixo da dobra — carregamento sob demanda */}
      <Suspense fallback={null}>
        <section aria-label="Benefícios da plataforma">
          <BenefitsHausecareSection />
        </section>

        <section id="problemas" aria-label="Problemas que a Hausecare resolve">
          <ProblemSection />
        </section>

        <section aria-label="Para quem é a Hausecare">
          <AudienceSection />
        </section>

        <section id="integracoes" aria-label="Integrações e ecossistema">
          <IntegrationsSection />
        </section>

        <section id="como-funciona" aria-label="Como funciona na prática">
          <FlowSection />
        </section>

        <section id="app-profissional" aria-label="App do Profissional">
          <ProfessionalAppSection />
        </section>

        <section id="gestao" aria-label="Gestão completa em um único lugar">
          <ManagementSection />
        </section>



        <section id="lanna" aria-label="Lanna IA">
          <LannaSection />
        </section>

        <section id="planos" aria-label="Planos e comparação">
          <PlansSection />
        </section>



        <section id="faq" aria-label="Perguntas frequentes">
          <FaqSection />
        </section>

        <section id="contato" aria-label="Chamada final para ação">
          <FinalCTA />
        </section>
      </Suspense>
    </main>
  );
}
