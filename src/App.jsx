import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

// Lazy load de todas as páginas para reduzir bundle inicial
const Home = lazy(() => import("./pages/Home"));
const Planos = lazy(() => import("./pages/Planos"));
const Plataforma = lazy(() => import("./pages/Plataforma"));
const Seguranca = lazy(() => import("./pages/seguranca"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ParaQuem = lazy(() => import("./pages/ParaQuem"));
const Contato = lazy(() => import("./pages/Contato"));
const PrivacidadePage = lazy(() => import("./pages/legal/privacidade").then(m => ({ default: m.PrivacidadePage })));
const TermosPage = lazy(() => import("./pages/legal/termos").then(m => ({ default: m.TermosPage })));

export default function App() {
  return (
    <BrowserRouter>
      {/* Header global (menu do site inteiro) */}
      <Header />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Conteúdo que muda conforme a rota */}
      <main>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/funcionalidades" element={<Plataforma />} />
            <Route path="/para-quem" element={<ParaQuem />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/seguranca" element={<Seguranca />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/legal/privacidade" element={<PrivacidadePage />} />
            <Route path="/legal/termos" element={<TermosPage />} />
          </Routes>
        </Suspense>
      </main>

      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
}

