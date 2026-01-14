
import dashboardOrganizacao from "./dashboard-organização.webp";
import cadastroRapido from "./cadastro-rapido.webp";
import palnoSemConflitos from "./palno-sem-conflitos.webp";
import vinculacaoAutomatica from "./vinculacao-automatica.webp";
import execucaoSemRetrabalho from "./execucao-sem-retrabalho.webp";
import registroSeguro from "./registro-seguro.webp";
import finaneiroAutomaziado from "./finaneiro-automaziado.webp";

export const DEMO_CAROUSEL = [
  {
    id: "dashboard-organizacao",
    title: "Dashboard do sistema Hausecare",
    description: "O dashboard do Hausecare centraliza toda a operação do Home Care em um único painel: atendimentos do dia com status em tempo real (não iniciados, em andamento e concluídos), próximos atendimentos, faturamento do dia e indicadores de performance. A gestão acompanha produtividade da equipe, SLAs de atendimento, rotas e deslocamentos, além de visão financeira e controle de estoque — tudo com dados claros para decisões rápidas e operação sem retrabalho.",
    src: dashboardOrganizacao,
  },
  {
    id: "cadastro-rapido",
    title: "Gestão de Pacientes Centralizada",
    description: "Cadastre e organize seus pacientes em um painel completo, com filtros inteligentes, status, especialidade e profissional responsável. Encontre informações em segundos, mantenha o histórico sempre acessível e garanta controle total do cadastro — com agilidade e zero retrabalho.",
    src: cadastroRapido,
  },
  {
    id: "palno-sem-conflitos",
    title: "Plano Terapêutico Estruturado",
    description: "Crie e acompanhe planos terapêuticos por paciente com controle total de especialidade, profissional, frequência e período de vigência. Centralize o cuidado em um só lugar, evite conflitos de agenda e garanta uma execução padronizada, com rastreabilidade e previsibilidade para a operação.",
    src: palnoSemConflitos,
  },
  {
    id: "vinculacao-automatica",
    title: "Gestão de Profissionais da Organização",
    description: "Centralize o cadastro e o controle da sua equipe em um único painel. Convide profissionais para atuar na organização, organize por especialidade e status, e mantenha dados essenciais sempre atualizados — garantindo escala, padronização e governança operacional no Home Care.",
    src: vinculacaoAutomatica,
  },
  {
    id: "registro-seguro",
    title: "Evolução do Paciente com Segurança e Rastreabilidade",
    description: "Acompanhe o histórico de atendimentos, identifique o que foi concluído e mantenha a evolução clínica registrada de forma padronizada. Para garantir integridade e conformidade, o profissional só finaliza o atendimento e adiciona a evolução mediante a senha do atendimento — assegurando rastreabilidade, controle e registros confiáveis.",
    src: registroSeguro,
  },
  {
    id: "finaneiro-automaziado",
    title: "Financeiro Automatizado com Folha por Profissional",
    description: "Tenha controle total das finanças do Home Care em relatórios claros e acionáveis: receitas, despesas, extrato e DRE. Além disso, a folha de pagamento calcula e consolida automaticamente os valores por profissional, com período, retenções e total líquido — mostrando exatamente quanto pagar e quando pagar, com precisão e previsibilidade.",
    src: finaneiroAutomaziado,
  },
];
