import React, { lazy, Suspense } from "react";
import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";

// Helper: garante que React.lazy sempre receba { default: Component }
function lazySection(importer, preferredNamedExport) {
  return lazy(() =>
    importer().then((mod) => {
      // 1) default export
      if (mod?.default) return { default: mod.default };

      // 2) named export preferido
      if (preferredNamedExport && mod?.[preferredNamedExport]) {
        return { default: mod[preferredNamedExport] };
      }

      // 3) primeira função exportada (fallback)
      const firstFn = Object.values(mod).find((v) => typeof v === "function");
      if (firstFn) return { default: firstFn };

      throw new Error(
        `lazySection: O módulo não exporta um componente React (default/named).`
      );
    })
  );
}

// Lazy Load de TODAS as seções "below the fold"
const StickyCta = lazySection(() => import("../components/sections/StickyCta"));
const ProblemSection = lazySection(() => import("../components/sections/ProblemSection"));
const AudienceSection = lazySection(() => import("../components/sections/LGPD/AudienceSection"));


const IntegrationsSection = lazySection(
  () => import("../components/sections/IntegrationsSection"),
  "IntegrationsSection"
);

const FlowSection = lazySection(
  () => import("../components/sections/HowItWorks"),
  "HowItWorks"
);

const ManagementSection = lazySection(
  () => import("../components/sections/ManagementSection"),
  "ManagementSection"
);

const ProfessionalAppSection = lazySection(
  () => import("../components/sections/ProfessionalAppSection"),
  "ProfessionalAppSection"
);



const LannaSection = lazySection(
  () => import("../components/sections/LannaSection"),
  "LannaSection"
);

const PlansSection = lazySection(
  () => import("../components/sections/PlansSection"),
  "PlansSection"
);

const FaqSection = lazySection(
  () => import("../components/sections/FaqSection"),
  "FaqSection"
);

const FinalCTA = lazySection(
  () => import("../components/sections/FinalCTA"),
  "FinalCTA"
);

const BenefitsHausecareSection = lazySection(
  () => import("../components/sections/BenefitsHausecareSection"),
  "BenefitsInternationalSection"
);

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
