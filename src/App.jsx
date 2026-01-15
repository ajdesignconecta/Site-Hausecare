import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Planos from "./pages/Planos";
import Plataforma from "./pages/Plataforma";
import Seguranca from "./pages/seguranca";

export default function App() {
  return (
    <BrowserRouter>
      {/* Header global (menu do site inteiro) */}
      <Header />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Conteúdo que muda conforme a rota */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funcionalidades" element={<Plataforma />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/seguranca" element={<Seguranca />} />
      </Routes>
    </BrowserRouter>
  );
}
