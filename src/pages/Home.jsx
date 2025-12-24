import React, { lazy, Suspense } from "react";
import Hero from "../components/sections/Hero";

// Lazy-load (abaixo da dobra)
const ProblemSection = lazy(() =>
  import("../components/sections/ProblemSection")
);
const FlowSection = lazy(() => import("../components/sections/HowItWorks"));
const ManagementSection = lazy(() =>
  import("../components/sections/ManagementSection")
);
const SecuritySection = lazy(() =>
  import("../components/sections/SecuritySection")
);
// const AudienceSection = lazy(() => import("../components/sections/Audience"));
const FinalCTA = lazy(() => import("../components/sections/FinalCTA"));

export default function Home() {
  return (
    <main aria-label="Página inicial da Hausecare">
      {/* HERO — Above the fold (carrega sempre, prioridade máxima) */}
      <section id="inicio" aria-label="Início">
        <Hero />
      </section>

      {/* Conteúdo abaixo da dobra — carregamento sob demanda (performance) */}
      <Suspense fallback={null}>
        {/* Problema / Dor */}
        <section id="problemas" aria-label="Problemas que a Hausecare resolve">
          <ProblemSection />
        </section>

        {/* Como funciona / Fluxo */}
        <section id="como-funciona" aria-label="Como funciona na prática">
          <FlowSection />
        </section>

        {/* Gestão / Módulos */}
        <section id="gestao" aria-label="Gestão completa em um único lugar">
          <ManagementSection />
        </section>

        {/* Segurança / Auditoria */}
        <section id="seguranca" aria-label="Segurança e auditoria">
          <SecuritySection />
        </section>

        {/* Público ideal */}
        {/* <section id="publico" aria-label="Para quem é a Hausecare">
          <AudienceSection />
        </section> */}

        {/* CTA Final */}
        <section id="contato" aria-label="Chamada final para ação">
          <FinalCTA />
        </section>
      </Suspense>
    </main>
  );
}
