import fs from "fs";
const path = "src/components/layout/Header.jsx";
let s = fs.readFileSync(path, "utf8");
const replacement = `const contentSections = [
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

const formatDate =`;
s = s.replace(/const contentGroups = \[[\s\S]*?const formatDate =/, replacement);
fs.writeFileSync(path, s, "utf8");
