import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import Planos from "./pages/Planos";
import Plataforma from "./pages/Plataforma";
import Seguranca from "./pages/seguranca";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

import ParaQuem from "./pages/ParaQuem";
import Contato from "./pages/Contato";
import { PrivacidadePage } from "./pages/legal/privacidade";
import { TermosPage } from "./pages/legal/termos";

export default function App() {
  return (
    <BrowserRouter>
      {/* Header global (menu do site inteiro) */}
      <Header />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Conteúdo que muda conforme a rota */}
      <main>
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
      </main>

      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
}

