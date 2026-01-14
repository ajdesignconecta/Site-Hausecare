import { useRef, useState } from "react";
import gsap from "gsap";

const STEPS = [
  {
    title: "Cadastro rápido",
    description: "Cadastre pacientes em segundos, sem erros.",
    benefit: "Reduzimos o tempo de cadastro em 80% – Clínica Vida",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><circle cx="12" cy="8" r="4" stroke="#2b908a" strokeWidth="2"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#2b908a" strokeWidth="2"/></svg>
    ),
    video: "cadastro.mp4"
  },
  {
    title: "Plano sem conflitos",
    description: "Defina planos e frequências com clareza.",
    benefit: "Eliminamos conflitos de agenda – Clínica Bem Cuidar",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#f59e42" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="#f59e42" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    video: "plano.mp4"
  },
  {
    title: "Vinculação automática",
    description: "Vincule profissionais ao paciente com um clique.",
    benefit: "Aumentamos a precisão dos vínculos – Clínica Nova Saúde",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><circle cx="8" cy="8" r="3" stroke="#e57373" strokeWidth="2"/><circle cx="16" cy="8" r="3" stroke="#e57373" strokeWidth="2"/><path d="M4 20c0-2.2 2.7-4 6-4s6 1.8 6 4" stroke="#e57373" strokeWidth="2"/><path d="M20 20c0-1.2-1.5-2.2-3.5-2.6" stroke="#e57373" strokeWidth="2"/></svg>
    ),
    video: "vinculacao.mp4"
  },
  {
    title: "Execução sem retrabalho",
    description: "Organize e acompanhe atendimentos em tempo real.",
    benefit: "Reduzimos retrabalho em 70% – Clínica Ativa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#34d399" strokeWidth="2"/><path d="M8 12l2.5 2.5L16 9" stroke="#34d399" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    video: "execucao.mp4"
  },
  {
    title: "Registro seguro",
    description: "Registre evoluções com segurança e rastreabilidade.",
    benefit: "Zero erros de registro – Clínica Segura",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#6366f1" strokeWidth="2"/><path d="M8 8h8M8 12h6M8 16h4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    video: "registro.mp4"
  },
  {
    title: "Financeiro automatizado",
    description: "Cobrança, folha e despesas integradas automaticamente.",
    benefit: "Gestão financeira sem erros – Clínica Financeira",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="4" y="7" width="16" height="10" rx="3" stroke="#f43f5e" strokeWidth="2"/><path d="M8 12h8M8 15h5" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    video: "financeiro.mp4"
  }
];

export default function FlowCarousel() {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);

  // GSAP animação de entrada/saída
  // ...implementação futura...

  function nextStep() {
    setCurrent((prev) => (prev + 1 < STEPS.length ? prev + 1 : prev));
  }
  function prevStep() {
    setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }

  return (
    <section className="py-24 bg-slate-50" aria-labelledby="flow-carousel-title">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="text-center mb-12">
          <h2 id="flow-carousel-title" className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight" style={{letterSpacing: '-0.02em'}}>
            Como funciona na prática
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Veja como cada etapa do fluxo traz resultados reais para sua operação.
          </p>
        </header>
        <div className="relative" ref={carouselRef}>
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevStep} disabled={current === 0} className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 font-bold transition hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2b908a]">
              ←
            </button>
            <div className="text-sm text-slate-500 font-semibold">
              Etapa {current + 1} de {STEPS.length}
            </div>
            <button onClick={nextStep} disabled={current === STEPS.length - 1} className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 font-bold transition hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2b908a]">
              →
            </button>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md flex flex-col items-center gap-4 transition will-change-transform flow-carousel-card">
            <div className="mb-2">{STEPS[current].icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-1 text-center">{STEPS[current].title}</h3>
            <p className="text-base text-slate-600 mb-2 text-center">{STEPS[current].description}</p>
            <div className="text-sm text-[#2b908a] font-semibold bg-[#e0f7fa] rounded px-3 py-2 mb-2 text-center">{STEPS[current].benefit}</div>
            {/* Video/GIF demonstrativo */}
            <div className="w-full flex justify-center">
              <video src={STEPS[current].video} controls width="320" height="180" style={{borderRadius: '12px', boxShadow: '0 2px 12px rgba(23,76,119,0.10)'}} />
            </div>
          </div>
          {/* Barra de progresso */}
          <div className="mt-6 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#2b908a] to-[#38bdf8] transition-all duration-500" style={{width: `${((current+1)/STEPS.length)*100}%`}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
