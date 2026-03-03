import fs from "fs";

const path = "src/components/layout/Header.jsx";
let s = fs.readFileSync(path, "utf8");

const replacement = `const secondaryLinks = [
  { label: "Pre\u00e7os e Planos", to: "/planos" },
];

const solutionSections = [
  {
    id: "dashboard-estrategico",
    label: "Dashboard estrat\u00e9gico",
    items: [
      { title: "Vis\u00e3o em tempo real", description: "Acompanhe os atendimentos do dia com status atualizado em tempo real", icon: LayoutDashboard },
      { title: "Alertas autom\u00e1ticos", description: "Receba alertas de atrasos e aja rapidamente na opera\u00e7\u00e3o", icon: Calendar },
      { title: "Produtividade da equipe", description: "Monitore produtividade por profissional para decis\u00f5es gerenciais", icon: Sparkles },
    ],
    spotlight: {
      image: "/imagens/screens/dasboard-hausecare.webp",
      title: "Controle da opera\u00e7\u00e3o desde cedo",
      description: "O gestor abre o sistema e j\u00e1 sabe exatamente o que est\u00e1 pendente, em andamento e conclu\u00eddo.",
      cta: "Ver dashboard",
      to: "/funcionalidades",
    },
  },
  {
    id: "operacao-clinica",
    label: "Opera\u00e7\u00e3o cl\u00ednica e equipe",
    items: [
      { title: "Evolu\u00e7\u00e3o do paciente", description: "Registro digital com hist\u00f3rico completo e controle rigoroso", icon: NotebookTabs },
      { title: "Bloqueio de evolu\u00e7\u00e3o 24h", description: "Evolu\u00e7\u00e3o n\u00e3o enviada \u00e9 bloqueada automaticamente e liberada apenas pela cl\u00ednica", icon: ShieldCheck },
      { title: "Gest\u00e3o de profissionais", description: "Cadastre, convide e defina permiss\u00f5es por n\u00edvel para cada colaborador", icon: Smartphone },
      { title: "Auditoria completa", description: "Rastreie quem alterou, quando alterou e o que foi alterado", icon: FileText },
    ],
    spotlight: {
      image: "/imagens/screens/prontuario.webp",
      title: "Seguran\u00e7a cl\u00ednica e jur\u00eddica",
      description: "Menos falhas operacionais, mais governan\u00e7a e mais prote\u00e7\u00e3o para a cl\u00ednica no dia a dia.",
      cta: "Conhecer controle cl\u00ednico",
      to: "/funcionalidades",
    },
  },
  {
    id: "financeiro-performance",
    label: "Financeiro e performance",
    items: [
      { title: "Financeiro estrat\u00e9gico", description: "Tenha extratos, receitas, despesas e fluxo de caixa organizados", icon: Wallet },
      { title: "DRE autom\u00e1tica", description: "Visualize resultado com demonstrativo autom\u00e1tico para apoiar decis\u00f5es", icon: LayoutDashboard },
      { title: "Centro de custos", description: "Acompanhe custos por setor ou tipo de atendimento", icon: MessageCircleQuestion },
      { title: "Ranking e frequ\u00eancia", description: "Me\u00e7a produtividade, carga hor\u00e1ria e performance por profissional", icon: BookOpen },
    ],
    spotlight: {
      image: "/imagens/screens/resumo-financeiro.webp",
      title: "Rentabilidade com vis\u00e3o clara",
      description: "Veja onde a cl\u00ednica ganha dinheiro, onde perde margem e quais a\u00e7\u00f5es geram crescimento.",
      cta: "Explorar financeiro",
      to: "/funcionalidades",
    },
  },
];

const contentGroups = ["Recursos gratuitos", "Ajuda"];

const contentItems = [
  { title: "Blog", description: "Conte\u00fado pr\u00e1tico para gestores de Home Care", icon: BookOpen, to: "/blog" },
  { title: "Ebooks e Guias", description: "Materiais para melhorar opera\u00e7\u00e3o e financeiro", icon: FileText, to: "/blog" },
  { title: "FAQ", description: "Respostas r\u00e1pidas para d\u00favidas frequentes", icon: MessageCircleQuestion, to: "/#faq" },
];

const formatDate =`;

s = s.replace(/const secondaryLinks = \[[\s\S]*?const formatDate =/, replacement);

fs.writeFileSync(path, s, "utf8");
