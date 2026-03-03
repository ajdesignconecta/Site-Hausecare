import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  LayoutDashboard,
  MessageCircleQuestion,
  NotebookTabs,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Wallet,
} from "lucide-react";
import LogoHausecare from "../../assets/imagens/screens/logo-site-menu-2026.png";
import DashboardEstrategico1080 from "../../assets/imagens/screens/dashboard estrategico 1080x1080.png";
import OperacaoClinica1080 from "../../assets/imagens/screens/operação-clinica-1080x1080.png";
import FinanceiroSiteWeb from "../../assets/imagens/screens/feinanceiro-site-web.png";

const secondaryLinks = [
  { label: "Preços e Planos", to: "/planos" },
];

const solutionSections = [
  {
    id: "dashboard-estrategico",
    label: "Dashboard estratégico",
    items: [
      { title: "Visão em tempo real", description: "Acompanhe os atendimentos do dia com status atualizado em tempo real", icon: LayoutDashboard },
      { title: "Alertas automáticos", description: "Receba alertas de atrasos e aja rapidamente na operação", icon: Calendar },
      { title: "Produtividade da equipe", description: "Monitore produtividade por profissional para decisões gerenciais", icon: Sparkles },
    ],
    spotlight: {
      image: DashboardEstrategico1080,
      title: "Controle da operação desde cedo",
      description: "O gestor abre o sistema e já sabe exatamente o que está pendente, em andamento e concluído.",
      cta: "Ver dashboard",
      to: "/funcionalidades",
    },
  },
  {
    id: "operacao-clinica",
    label: "Operação clínica e equipe",
    items: [
      { title: "Evolução do paciente", description: "Registro digital com histórico completo e controle rigoroso", icon: NotebookTabs },
      { title: "Bloqueio de evolução 24h", description: "Evolução não enviada é bloqueada automaticamente e liberada apenas pela clínica", icon: ShieldCheck },
      { title: "Gestão de profissionais", description: "Cadastre, convide e defina permissões por nível para cada colaborador", icon: Smartphone },
      { title: "Auditoria completa", description: "Rastreie quem alterou, quando alterou e o que foi alterado", icon: FileText },
    ],
    spotlight: {
      image: OperacaoClinica1080,
      title: "Segurança clínica e jurídica",
      description: "Menos falhas operacionais, mais governança e mais proteção para a clínica no dia a dia.",
      cta: "Conhecer controle clínico",
      to: "/funcionalidades",
    },
  },
  {
    id: "financeiro-performance",
    label: "Financeiro e performance",
    items: [
      { title: "Financeiro estratégico", description: "Tenha extratos, receitas, despesas e fluxo de caixa organizados", icon: Wallet },
      { title: "DRE automática", description: "Visualize resultado com demonstrativo automático para apoiar decisões", icon: LayoutDashboard },
      { title: "Centro de custos", description: "Acompanhe custos por setor ou tipo de atendimento", icon: MessageCircleQuestion },
      { title: "Ranking e frequência", description: "Meça produtividade, carga horária e performance por profissional", icon: BookOpen },
    ],
    spotlight: {
      image: FinanceiroSiteWeb,
      title: "Rentabilidade com visão clara",
      description: "Veja onde a clínica ganha dinheiro, onde perde margem e quais ações geram crescimento.",
      cta: "Explorar financeiro",
      to: "/funcionalidades",
    },
  },
];

const contentSections = [
  {
    id: "resources",
    label: "Recursos gratuitos",
    items: [
      { title: "Blog", description: "Conteúdo prático para gestores de Home Care", icon: BookOpen, to: "/blog" },
      { title: "Ebooks e Guias", description: "Materiais para melhorar operação e financeiro", icon: FileText, to: "/blog" },
      { title: "FAQ", description: "Respostas rápidas para dúvidas frequentes", icon: MessageCircleQuestion, to: "/#faq" },
    ],
    spotlight: {
      image: "/blog/tecnologia.png",
      title: "Casos e conteúdos para gestão",
      description: "Aprenda com artigos práticos para melhorar processos, equipe e resultado financeiro.",
      cta: "Ver destaque",
      to: "/blog",
    },
  },
  {
    id: "help",
    label: "Ajuda",
    items: [
      { title: "Central de ajuda", description: "Perguntas frequentes e orientações para uso da plataforma", icon: MessageCircleQuestion, to: "/#faq" },
      { title: "Fale com o time", description: "Entre em contato para suporte comercial e operacional", icon: Smartphone, to: "/contato" },
      { title: "Base de conteúdo", description: "Materiais para treinar equipe e padronizar processos", icon: FileText, to: "/blog" },
    ],
    spotlight: {
      image: "/imagens/screens/dashboard-organização.webp",
      title: "Suporte para evolução contínua",
      description: "Tenha ajuda prática para acelerar adoção, padronizar rotinas e aumentar desempenho da equipe.",
      cta: "Ir para ajuda",
      to: "/#faq",
    },
  },
];

function TopLink({ active, children, onMouseEnter, onClick }) {
  return (
    <button
      type="button"
      className={`hc-top-link ${active ? "hc-top-link-active" : ""}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const closeTimer = useRef(null);
  const headerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const location = useLocation();

  const [activeSolutionSectionId, setActiveSolutionSectionId] = useState(solutionSections[0].id);
  const [activeContentSectionId, setActiveContentSectionId] = useState(contentSections[0].id);
  const activeSolutionSection = useMemo(
    () => solutionSections.find((section) => section.id === activeSolutionSectionId) || solutionSections[0],
    [activeSolutionSectionId]
  );
  const activeContentSection = useMemo(
    () => contentSections.find((section) => section.id === activeContentSectionId) || contentSections[0],
    [activeContentSectionId]
  );

  useEffect(() => {
    setActiveMenu(null);
    setActiveSolutionSectionId(solutionSections[0].id);
    setActiveContentSectionId(contentSections[0].id);
  }, [location.pathname]);

  useEffect(() => {
    if (openMobile) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [openMobile]);

  const holdMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    holdMenu();
    // Delay closing to allow moving the cursor from the top link into the submenu
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null);
      closeTimer.current = null;
    }, 220);
  };

  const closeNow = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMenu(null);
  };

  const [hoveringHeader, setHoveringHeader] = useState(false);

  const isInMenuArea = (target) => (
    !!target
    && (headerRef.current?.contains(target) || megaMenuRef.current?.contains(target))
  );

  const handleHeaderLeave = (e) => {
    setHoveringHeader(false);
    if (isInMenuArea(e.relatedTarget)) return;
    scheduleClose();
  };

  const handleMegaLeave = (e) => {
    if (isInMenuArea(e.relatedTarget)) return;
    scheduleClose();
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[120] border-b border-slate-200/90 bg-white transition-colors duration-200"
        onMouseEnter={() => { setHoveringHeader(true); holdMenu(); }}
        onMouseLeave={handleHeaderLeave}
      >
        <div className="mx-auto px-4 md:px-6 max-w-[1320px]">
          <div className="flex h-[78px] items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <NavLink to="/" className="flex items-center shrink-0">
                <img src={LogoHausecare} alt="Hausecare" className="h-9 w-auto" />
              </NavLink>

              <div className="hidden lg:flex items-center gap-0.5">
                <TopLink active={activeMenu === "solutions"} onMouseEnter={() => { holdMenu(); setActiveMenu("solutions"); }}>
                  Soluções
                  <ChevronDown size={13} className={`hc-chevron ${activeMenu === "solutions" ? "hc-chevron-open" : ""}`} strokeWidth={1.8} />
                </TopLink>

                {secondaryLinks.slice(0, 1).map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `hc-top-link hc-top-link-static ${isActive ? "hc-top-link-active" : ""}`}>
                    {item.label}
                  </NavLink>
                ))}

                <TopLink active={activeMenu === "content" || location.pathname.startsWith("/blog")} onMouseEnter={() => { holdMenu(); setActiveMenu("content"); }}>
                  Conteúdos
                  <ChevronDown size={13} className={`hc-chevron ${activeMenu === "content" ? "hc-chevron-open" : ""}`} strokeWidth={1.8} />
                </TopLink>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href="https://app.hausecare.com.br/auth/register" className="inline-flex items-center justify-center rounded-full bg-[#047e6d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#046d5f]">
                Teste Grátis
              </a>
              <a href="https://app.hausecare.com.br/" className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-white px-6 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
                Entrar na sua conta
              </a>
            </div>

            <button className="lg:hidden flex items-center justify-center p-2 rounded" onClick={() => setOpenMobile((v) => !v)} aria-label="Abrir menu">
              <svg className="h-7 w-7 text-[#174c77]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {openMobile ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {activeMenu && (
        <>
          <div className="fixed inset-0 top-[78px] z-[110] bg-black/28" onMouseEnter={scheduleClose} onClick={closeNow} />
          <div className="fixed top-[78px] left-0 w-full z-[130] pointer-events-none">
            <div className="mx-auto max-w-[1320px] px-4 md:px-6">
              <div
                ref={megaMenuRef}
                className="relative mx-auto w-[min(960px,calc(100vw-2rem))] pointer-events-auto"
                onMouseEnter={holdMenu}
                onMouseLeave={handleMegaLeave}
              >
                <div className="absolute -top-3 left-0 right-0 h-3" onMouseEnter={holdMenu} />
                <div className={`hc-mega-shell ${activeMenu === "solutions" ? "hc-mega-shell-large" : "hc-mega-shell-medium"} ${hoveringHeader ? "hc-mega-shell-white" : ""}`}>
                <div className="grid h-full grid-cols-[30%_38%_32%]">
                  <div className="bg-[#f5f6f7] px-9 py-8">
                    <ul className="space-y-2">
                      {(activeMenu === "solutions" ? solutionSections : contentSections).map((group) => (
                        <li key={group.id}>
                          <button
                            type="button"
                            className={`hc-group-item ${
                              activeMenu === "solutions" && activeSolutionSectionId === group.id
                                ? "bg-white text-slate-900"
                                : activeMenu === "content" && activeContentSectionId === group.id
                                  ? "bg-white text-slate-900"
                                  : ""
                            }`}
                            onMouseEnter={() => {
                              if (activeMenu === "solutions") setActiveSolutionSectionId(group.id);
                              if (activeMenu === "content") setActiveContentSectionId(group.id);
                            }}
                            onClick={() => {
                              if (activeMenu === "solutions") setActiveSolutionSectionId(group.id);
                              if (activeMenu === "content") setActiveContentSectionId(group.id);
                            }}
                          >
                            <span>{group.label}</span>
                            <ChevronRight size={17} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#f5f6f7] px-9 py-8 border-l border-slate-200/80">
                    <div className="space-y-5">
                      {(activeMenu === "solutions" ? activeSolutionSection.items : activeContentSection.items).map((item) => {
                        const Icon = item.icon;
                        const Wrapper = item.to ? Link : "div";

                        return (
                          <Wrapper
                            key={item.title}
                            {...(item.to ? { to: item.to } : {})}
                            className={`hc-feature-item ${item.to ? "hc-feature-item-link" : ""}`}
                          >
                            <span className="hc-feature-icon"><Icon size={15} /></span>
                            <span>
                              <span className="hc-item-title">{item.title}</span>
                              <span className="hc-item-desc">{item.description}</span>
                            </span>
                          </Wrapper>
                        );
                      })}
                    </div>
                  </div>

                  <aside className="bg-[#d6ebe6] px-6 py-7 border-l border-slate-200/80">
                    <p className="text-[0.95rem] font-medium uppercase tracking-wide text-slate-600">Em destaque</p>
                    <div className="mt-4 overflow-hidden rounded-2xl bg-white aspect-square w-full flex items-center justify-center p-2">
                      <img
                        src={activeMenu === "solutions" ? activeSolutionSection.spotlight.image : activeContentSection.spotlight.image}
                        alt="Destaque Hausecare"
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {activeMenu === "solutions" ? (
                      <>
                        <h3 className="mt-5 text-[1.2rem] font-normal text-slate-900 leading-tight">{activeSolutionSection.spotlight.title}</h3>
                        <p className="mt-2 text-[0.95rem] font-normal text-slate-700 leading-relaxed">{activeSolutionSection.spotlight.description}</p>
                        <Link to={activeSolutionSection.spotlight.to} className="mt-5 inline-flex items-center gap-2 text-[#0f766e] text-base font-medium hover:underline">
                          {activeSolutionSection.spotlight.cta} <span aria-hidden="true">→</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <h3 className="mt-5 text-[1.2rem] font-normal text-slate-900 leading-tight">{activeContentSection.spotlight.title}</h3>
                        <p className="mt-2 text-[0.95rem] font-normal text-slate-700 leading-relaxed">{activeContentSection.spotlight.description}</p>
                        <Link to={activeContentSection.spotlight.to} className="mt-5 inline-flex items-center gap-2 text-[#0f766e] text-base font-medium hover:underline">
                          {activeContentSection.spotlight.cta} <span aria-hidden="true">→</span>
                        </Link>
                      </>
                    )}
                  </aside>
                </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {openMobile && (
        <>
          <div className="fixed inset-0 z-[105] bg-black/40 lg:hidden" onClick={() => setOpenMobile(false)} />
          <div className="fixed top-[78px] left-0 w-full z-[140] bg-white shadow-xl rounded-b-3xl lg:hidden hc-mobile-menu overflow-hidden max-h-[calc(100vh-78px)] overflow-y-auto">
            <div className="py-2 px-6 space-y-1">
              <NavLink to="/funcionalidades" className="hc-mobile-link" onClick={() => setOpenMobile(false)}>Soluções</NavLink>
              <NavLink to="/planos" className="hc-mobile-link" onClick={() => setOpenMobile(false)}>Preços e Planos</NavLink>
              <NavLink to="/blog" className="hc-mobile-link" onClick={() => setOpenMobile(false)}>Conteúdos</NavLink>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
              <a href="https://app.hausecare.com.br/auth/register" className="w-full flex items-center justify-center rounded-full bg-[#047e6d] py-3 text-base font-semibold text-white">Teste Grátis</a>
              <a href="https://app.hausecare.com.br/" className="w-full flex items-center justify-center rounded-full border border-slate-700/70 bg-white py-3 text-base font-medium text-slate-900">Entrar na sua conta</a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

