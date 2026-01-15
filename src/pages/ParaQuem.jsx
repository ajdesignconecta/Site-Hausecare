import React from "react";
import AudienceSection from "../components/sections/AudienceSection";
import StickyCta from "../components/sections/StickyCta";
import FinalCTA from "../components/sections/FinalCTA";

export default function ParaQuem() {
    return (
        <main className="pt-24">
            <StickyCta />

            <section aria-label="Para quem é a Hausecare">
                <AudienceSection />
            </section>

            <section aria-label="Chamada final">
                <FinalCTA />
            </section>
        </main>
    );
}
