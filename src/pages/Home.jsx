import React, { lazy, Suspense } from "react";
import Hero from "../components/sections/Hero";
import StickyCta from "../components/sections/StickyCta";
import ProblemSection from "../components/sections/ProblemSection";
import AudienceSection from "../components/sections/AudienceSection";

// Helper: garante que React.lazy sempre receba { default: Component }
function lazySection(importer, preferredNamedExport) {
  return lazy(() =>
    importer().then((mod) => {
      // 1) default export
      if (mod?.default) return { default: mod.default };

      // 2) named export preferido (ex: AudienceSection)
      if (preferredNamedExport && mod?.[preferredNamedExport]) {
        return { default: mod[preferredNamedExport] };
      }

      // 3) primeira função exportada (fallback)
      const firstFn = Object.values(mod).find((v) => typeof v === "function");
      if (firstFn) return { default: firstFn };

      // 4) erro claro (melhor que erro críptico)
      throw new Error(
        `lazySection: O módulo não exporta um componente React (default/named). Verifique exports do arquivo.`
      );
    })
  );
}

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

export default function Home() {
  return (
    <main aria-label="Página inicial da Hausecare">
      {/* CTA sticky — aparece ao rolar */}
      <StickyCta />

      {/* HERO — Above the fold */}
      <section id="inicio" aria-label="Início">
        <Hero />
      </section>

      {/* Conteúdo abaixo da dobra — carregamento sob demanda */}
      <Suspense fallback={null}>
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

        <section id="gestao" aria-label="Gestão completa em um único lugar">
          <ManagementSection />
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
