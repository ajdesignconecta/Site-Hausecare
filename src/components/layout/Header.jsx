import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import LogoHausecare from "../../assets/imagens/hausecare-logosite-atualizada.svg";

const navLinks = [
  { label: "Inicio", to: "/", type: "route" },
  { label: "Plataforma", to: "/funcionalidades", type: "route" },
  { label: "Para quem é", to: "/para-quem", type: "route" },
  { label: "Planos", to: "/planos", type: "route" },
  { label: "Segurança", to: "/seguranca", type: "route" },
  { label: "Blog", to: "/blog", type: "route" },
  { label: "Contato", to: "/contato", type: "route" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Bloquear rolagem da página (html e body) quando o menu estiver aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");

    if (location.pathname !== "/") {
      // Navegar para home COM o hash para o ScrollToTop capturar
      navigate({ pathname: "/", hash: href });
    } else {
      // Já estamos na home, só fazer scroll direto
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-slate-100"
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <div className="mx-auto px-4 md:px-6 max-w-[1400px]">
        <div className="flex h-16 md:h-20 items-center justify-between w-full">
          {/* Logo maior e totalmente à esquerda */}
          <NavLink to="/" className="flex items-center gap-2 md:min-w-[200px] select-none mr-auto">
            <img src={LogoHausecare} alt="Hausecare" className="h-16 md:h-20 w-auto" />
          </NavLink>

          {/* Menu Desktop centralizado e flex-grow */}
          <nav className="hidden md:flex flex-grow justify-center gap-8">
            {navLinks.map((item) => {
              if (item.type === "anchor") {
                return (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={(e) => handleAnchorClick(e, item.to)}
                    className="relative font-semibold text-base px-2 py-1 rounded transition-colors duration-150 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#174c77] after:transition-[width] after:duration-200 hover:after:w-full text-slate-800 hover:text-[#174c77]"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={(e) => {
                    // Se clicar no link ativo (já está na página), rolar para o topo
                    if (location.pathname === item.to) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={({ isActive }) =>
                    `relative font-semibold text-base px-2 py-1 rounded transition-colors duration-150 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#174c77] after:transition-[width] after:duration-200 hover:after:w-full ${isActive
                      ? "text-[#174c77]"
                      : "text-slate-800 hover:text-[#174c77]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Botões destaque à direita */}
          <div className="hidden md:flex flex-shrink-0 items-center gap-2 ml-4">
            <a
              href="https://app.hausecare.com.br/"
              className="bg-gradient-to-r from-[#2b908a] to-[#174c77] text-white font-bold rounded-full px-6 py-2 text-base shadow-md transition-all duration-200 ease-out hover:from-[#174c77] hover:to-[#2b908a] hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#174c77]"
            >
              Acessar sistema gratuito
            </a>
            <a
              href="https://app.hausecare.com.br/"
              className="ml-2 px-5 py-2 rounded-full text-slate-600 font-semibold text-base border border-slate-200 bg-white hover:bg-slate-100 hover:text-[#174c77] transition-colors duration-150 shadow-sm"
              style={{ boxShadow: '0 1px 4px 0 rgba(30, 41, 59, 0.06)' }}
            >
              Entrar
            </a>
          </div>

          {/* Botão mobile */}
          <button
            className="md:hidden flex-shrink-0 flex items-center justify-center p-2 rounded focus:outline-none ml-2 mr-4"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <svg className="h-7 w-7 text-[#174c77]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? (
                <>
                  <path d="M6 18L18 6M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile Overlay (High-level Professional) */}
      {/* Menu Mobile Overlay (High-level Professional) */}
      {open && (
        <>
          <div className="fixed inset-0 z-[105] bg-black/40 md:hidden" onClick={() => setOpen(false)} />
          <div className="fixed top-16 left-0 w-full z-[110] bg-white shadow-xl rounded-b-3xl md:hidden animate-fade-in-down overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">

            {/* Lista de Links */}
            <div className="py-2 px-6 space-y-1">
              {navLinks.map((item) => {
                const isAnchor = item.type === "anchor";

                if (isAnchor) {
                  return (
                    <a
                      key={item.label}
                      href={item.to}
                      onClick={(e) => {
                        setOpen(false);
                        handleAnchorClick(e, item.to);
                      }}
                      className="flex items-center justify-between text-lg font-medium text-slate-800 py-3 border-b border-slate-50 hover:text-[#174c77] transition-colors"
                    >
                      {item.label}
                      <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  );
                }

                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between text-lg font-medium py-3 border-b border-slate-50 transition-colors ${isActive ? "text-[#174c77]" : "text-slate-800 hover:text-[#174c77]"
                      }`
                    }
                    onClick={(e) => {
                      setOpen(false);
                      if (location.pathname === item.to) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    {item.label}
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                );
              })}
            </div>

            {/* Rodapé do Menu (Botões de Ação) */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
              <a
                href="https://app.hausecare.com.br/"
                className="w-full flex items-center justify-center bg-gradient-to-r from-[#2b908a] to-[#174c77] text-white font-bold rounded-full py-3 text-base shadow-md transition-all duration-200 ease-out hover:from-[#174c77] hover:to-[#2b908a] hover:-translate-y-0.5 hover:shadow-lg"
              >
                Acessar sistema gratuito
              </a>
              <a
                href="https://app.hausecare.com.br/"
                className="w-full flex items-center justify-center px-5 py-3 rounded-full text-slate-600 font-semibold text-base border border-slate-200 bg-white hover:bg-slate-100 hover:text-[#174c77] transition-colors duration-150 shadow-sm"
              >
                Entrar
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
