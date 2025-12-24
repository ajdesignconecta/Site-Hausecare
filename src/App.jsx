import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";

import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Planos from "./pages/Planos";
import Sobre from "./pages/Sobre";
import Funcionalidades from "./pages/Funcionalidades";

export default function App() {
  return (
    <BrowserRouter>
      {/* Header global (menu do site inteiro) */}
      <Header />

      {/* Conteúdo que muda conforme a rota */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funcionalidades" element={<Funcionalidades />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
}
