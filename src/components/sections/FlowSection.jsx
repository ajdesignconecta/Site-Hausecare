import { useLayoutEffect, useMemo, useRef } from "react";

// SVGs temáticos para cada etapa
const STEP_ICONS = [
  // Cadastro do paciente
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="1.7"/></svg>,
  // Plano terapêutico
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7"/><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  // Vinculação do profissional
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.7"/><circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1.7"/><path d="M4 20c0-2.2 2.7-4 6-4s6 1.8 6 4" stroke="currentColor" strokeWidth="1.7"/><path d="M20 20c0-1.2-1.5-2.2-3.5-2.6" stroke="currentColor" strokeWidth="1.7"/></svg>,
  // Execução do atendimento
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7"/><path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  // Registro da evolução
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7"/><path d="M8 8h8M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  // Financeiro automatizado
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="4" y="7" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.7"/><path d="M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
];
import FlowTimeline from "./FlowTimeline";

export default function FlowSection() {
  // Substitui grid estático por timeline animada GSAP
  return <FlowTimeline />;
}
