import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import LogoHausecare from "../../assets/imagens/hausecare-logosite-atualizada.svg";

const navLinks = [
  { label: "Inicio", to: "/", type: "route" },
  { label: "Plataforma", to: "/funcionalidades", type: "route" },
  { label: "Para quem é", to: "#para-quem-e", type: "anchor" },
  { label: "Planos", to: "/planos", type: "route" },
  { label: "Segurança", to: "/seguranca", type: "route" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");

    // Se não estamos na home, navegar para lá primeiro
    if (location.pathname !== "/") {
      // Sinalizar que estamos fazendo navegação de âncora
      sessionStorage.setItem('anchorNavigation', 'true');
      navigate("/");
      // Aguardar navegação completa
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
    } else {
      // Já estamos na home, só fazer scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-slate-100">
      <div className="max-w-full w-full px-6">
        <div className="flex h-24 items-center justify-between w-full">
          {/* Logo maior e totalmente à esquerda */}
          <NavLink to="/" className="flex items-center gap-2 min-w-[200px] select-none mr-4">
            <img src={LogoHausecare} alt="Hausecare" className="h-24 w-auto" />
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
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
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

      {/* Menu Mobile */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div className="absolute top-0 left-0 w-full bg-white shadow-lg p-6 flex flex-col gap-4 animate-fade-in-down">
            {navLinks.map((item) => {
              if (item.type === "anchor") {
                return (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={(e) => {
                      setOpen(false);
                      handleAnchorClick(e, item.to);
                    }}
                    className="block font-semibold text-lg px-2 py-2 rounded transition-colors duration-150 text-slate-800 hover:text-[#174c77] hover:bg-[#eaf6fa]"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `block font-semibold text-lg px-2 py-2 rounded transition-colors duration-150 ${isActive
                      ? "text-[#174c77] bg-[#eaf6fa]"
                      : "text-slate-800 hover:text-[#174c77] hover:bg-[#eaf6fa]"
                    }`
                  }
                  onClick={(e) => {
                    setOpen(false);
                    // Se clicar no link ativo, rolar para o topo
                    if (location.pathname === item.to) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {item.label}
                </NavLink>
              );
            })}
            <a
              href="https://app.hausecare.com.br/"
              className="bg-[#2b908a] hover:bg-[#174c77] text-white font-bold rounded-full px-6 py-3 transition-all duration-150 shadow-md text-center"
              onClick={() => setOpen(false)}
            >
              Acessar sistema gratuito
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
