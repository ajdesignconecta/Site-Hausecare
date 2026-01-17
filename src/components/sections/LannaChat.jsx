import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, Sparkles, MessageSquare, ChevronLeft } from "lucide-react";
import lannaImage from "../../assets/imagens/screens/lanna-Hausecare.png";

const CHAT_FLOW = {
    start: {
        message: [
            "Olá! Eu sou o assistente do Hausecare. 👋",
            "Estou aqui para te ajudar a entender o sistema, encontrar telas e tirar dúvidas sobre agenda, atendimentos, pacientes, profissionais, financeiro e uso da Lanna (Agente IA).",
            "Me diga o que você quer resolver agora:",
        ],
        options: [
            { label: "📅 Agenda & Atendimentos", next: "agenda" },
            { label: "👤 Pacientes", next: "pacientes" },
            { label: "👥 Profissionais", next: "profissionais" },
            { label: "💰 Financeiro", next: "financeiro" },
            { label: "🤖 Lanna (IA)", next: "lanna_ia" },
            { label: "🔐 Login & Acesso", next: "login" },
            { label: "🆘 Suporte", next: "suporte" },
        ],
    },
    sobre_hausecare: {
        message: [
            "🏢 **O que é o Hausecare?**",
            "É um sistema para organizar e acompanhar rotinas de atendimento, com foco em agenda, gestão de atendimentos, cadastro de pacientes, visão de profissionais e resumo financeiro do que foi realizado.",
            "🎯 **Para quem é indicado?**",
            "Profissionais que precisam de uma rotina organizada e Clínicas/empresas que desejam acompanhar atendimentos e ter visão operacional e financeira."
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    agenda: {
        message: ["Beleza. Sobre agenda e atendimentos, qual é sua dúvida?"],
        options: [
            { label: "Ver atendimentos de hoje", next: "agenda_hoje" },
            { label: "Não tenho atendimentos (o que significa?)", next: "agenda_vazio" },
            { label: "Consultar por período (dia/mês/ano)", next: "agenda_periodo" },
            { label: "Atendimentos em aberto", next: "agenda_aberto" },
            { label: "🔙 Voltar ao menu", next: "start" },
        ],
    },
    agenda_hoje: {
        message: [
            "Acesse o Painel para ter uma visão rápida e, em seguida, entre em Agenda para ver os atendimentos organizados.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    agenda_vazio: {
        message: [
            "Sim. Quando não existir atendimento agendado, o sistema exibe uma mensagem informando que não há atendimento programado.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    agenda_periodo: {
        message: [
            "Sim — especialmente usando a Lanna, você pode consultar atendimentos por dia, semana, mês e ano, conforme seu acesso.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    agenda_aberto: {
        message: [
            "Você pode verificar quantos atendimentos estão em aberto e o status com a Lanna:",
            "“Lanna, quantos atendimentos estão em aberto?”",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    pacientes: {
        message: ["Certo. Sobre pacientes, o que você precisa?"],
        options: [
            { label: "Onde encontro a lista de pacientes?", next: "pacientes_lista" },
            { label: "O que dá pra fazer com pacientes?", next: "pacientes_fazer" },
            { label: "🔙 Voltar ao menu", next: "start" },
        ],
    },
    pacientes_lista: {
        message: [
            "No menu, acesse Pacientes para visualizar e gerenciar os pacientes cadastrados no sistema.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    pacientes_fazer: {
        message: [
            "O sistema mantém o cadastro para facilitar a rotina de atendimentos e acompanhamento dentro da plataforma.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    profissionais: {
        message: ["Ok. Sobre profissionais, qual é a sua dúvida?"],
        options: [
            { label: "Quem está em atendimento?", next: "profissionais_quem" },
            { label: "Consultar por período (dia/semana/mês)", next: "profissionais_periodo" },
            { label: "🔙 Voltar ao menu", next: "start" },
        ],
    },
    profissionais_quem: {
        message: [
            "Sim. A Lanna pode te ajudar a consultar quais profissionais estão em atendimento no dia/semana/mês, conforme seus dados e permissões.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    profissionais_periodo: {
        message: [
            "A Lanna também responde por período:",
            "“Lanna, profissionais em atendimento esta semana.”",
            "“Lanna, profissionais em atendimento este mês.”",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    financeiro: {
        message: ["Vamos de financeiro. O que você quer saber?"],
        options: [
            { label: "Onde vejo o resumo financeiro?", next: "financeiro_onde" },
            { label: "Quanto faturei (dia/mês/ano)?", next: "financeiro_quanto" },
            { label: "O que entra no resumo?", next: "financeiro_resumo" },
            { label: "🔙 Voltar ao menu", next: "start" },
        ],
    },
    financeiro_onde: {
        message: [
            "Sim. Você tem um Resumo financeiro com base nos atendimentos concluídos, e também pode consultar com a Lanna quanto foi faturado por período (dia/mês/ano).",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    financeiro_quanto: {
        message: [
            "Sim. Você tem um Resumo financeiro com base nos atendimentos concluídos, e também pode consultar com a Lanna quanto foi faturado por período (dia/mês/ano).",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    financeiro_resumo: {
        message: [
            "A visão é baseada nos atendimentos concluídos, trazendo uma leitura mais rápida dos resultados.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    lanna_ia: {
        message: [
            "A Lanna é a agente de IA do Hausecare. Ela ajuda você a consultar informações do sistema de forma rápida, como:",
            "• Agenda do dia/semana/mês/ano",
            "• Se existe atendimento hoje",
            "• Quantos atendimentos estão em aberto",
            "• Quanto foi faturado por período",
            "• Quais profissionais estão em atendimento no período",
        ],
        options: [
            { label: "Como eu pergunto?", next: "lanna_exemplos" },
            { label: "🔙 Voltar ao menu", next: "start" },
        ],
    },
    lanna_exemplos: {
        message: [
            "Você pode perguntar em linguagem natural, por exemplo:",
            "“Lanna, quais são meus atendimentos de hoje?”",
            "“Quanto eu faturei este mês?”",
            "“Quantos atendimentos estão em aberto?”",
            "“Quem está em atendimento esta semana?”",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    lanna_agenda: {
        message: [
            "Você pode perguntar:",
            "“Lanna, quais são meus atendimentos de hoje?”",
            "“Lanna, como está minha agenda essa semana?”",
            "“Lanna, quais atendimentos estão confirmados e pendentes?”",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    lanna_financeiro: {
        message: [
            "Exemplos úteis:",
            "“Lanna, quanto eu faturei este mês?”",
            "“Lanna, quanto eu faturei no ano?”",
            "“Lanna, resumo financeiro do dia.”",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    lanna_aberto: {
        message: [
            "“Lanna, quantos atendimentos estão em aberto?”",
            "“Lanna, lista de atendimentos pendentes.”",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    lanna_profissionais: {
        message: [
            "“Lanna, quem está em atendimento hoje?”",
            "“Lanna, profissionais em atendimento esta semana.”",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    login: {
        message: ["Entendi. Sobre login e acesso, o que aconteceu?"],
        options: [
            { label: "Não consigo entrar", next: "login_erro" },
            { label: "Esqueci minha senha", next: "login_senha" },
            { label: "🔙 Voltar ao menu", next: "start" },
        ],
    },
    login_erro: {
        message: [
            "Verifique:",
            "• Se o e-mail/usuário e senha estão corretos",
            "• Se você está no ambiente correto do sistema",
            "• Se sua internet está estável",
            "Se ainda assim não funcionar, fale com o suporte informando o que aparece na tela (mensagem/erro) para acelerar a solução.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    login_senha: {
        message: [
            "Use a opção de recuperação disponível na área de acesso (quando estiver configurada no seu ambiente) ou solicite suporte para recuperação.",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    suporte: {
        message: ["Certo — para acelerar seu atendimento, me diga:"],
        options: [
            { label: "Problema na agenda/atendimento", next: "suporte_coleta" },
            { label: "Problema no login", next: "suporte_coleta" },
            { label: "Dúvida sobre financeiro", next: "suporte_coleta" },
            { label: "Falar com suporte humano", next: "suporte_humano" },
            { label: "🔙 Voltar ao menu", next: "start" },
        ],
    },
    suporte_coleta: {
        message: [
            "Para te ajudar mais rápido, envie:",
            "• Qual tela você estava",
            "• O que você tentou fazer",
            "• Qual mensagem apareceu (se houver)",
        ],
        options: [
            { label: "Resolvido / Voltar", next: "encerra" },
            { label: "🔙 Voltar ao menu", next: "start" },
        ],
    },
    suporte_humano: {
        message: [
            "Nosso time pode orientar na configuração inicial e tirar dúvidas sobre o uso do sistema no dia a dia.",
            "Se possível, ao pedir suporte, envie:",
            "• Qual tela você estava",
            "• O que você tentou fazer",
            "• Qual mensagem apareceu (se houver)",
        ],
        options: [{ label: "🔙 Voltar ao menu", next: "start" }],
    },
    encerra: {
        message: [
            "Perfeito ✅ Se surgir outra dúvida, me chama aqui.",
            "Você também pode perguntar direto pra Lanna dentro do sistema e ganhar tempo.",
        ],
        options: [{ label: "🔄 Recomeçar", next: "start" }],
    },
    beneficios: {
        message: [
            "Contratar o Hausecare transforma sua gestão! 🚀",
            "✅ **Organização Total:** Agenda e prontuários em um só lugar.",
            "✅ **Financeiro Seguro:** Controle de repasses e faturamento sem erros.",
            "✅ **Menos Stress:** Automatizamos a rotina para você focar em crescer.",
            "Quer ver os planos disponíveis?"
        ],
        options: [
            { label: "Ver Planos", next: "financeiro" },
            { label: "🔙 Voltar ao menu", next: "start" }
        ],
    },
    como_funciona: {
        message: [
            "O Hausecare é prático e 100% online! 💻📱",
            "1. **Gestor (Você):** Organiza escalas e financeiro pelo Painel Web.",
            "2. **Profissional:** Recebe a agenda e faz a evolução pelo App.",
            "3. **Tudo Conectado:** O que eles fazem no app aparece pra você na hora!",
            "Simples assim. Sem papel e sem delay."
        ],
        options: [
            { label: "Ver Planos", next: "financeiro" },
            { label: "🔙 Voltar ao menu", next: "start" }
        ],
    },
    valores_sistema: {
        message: [
            "Para conferir os valores e planos atualizados para sua empresa: 💎",
            "1. Cadastre-se grátis em: **app.hausecare.com.br/auth/register**",
            "2. Acesse a página de **Upgrade** dentro do sistema.",
            "Lá você encontra todas as opções detalhadas para o seu perfil!",
        ],
        options: [
            { label: "Criar Conta Grátis", link: "https://app.hausecare.com.br/auth/register" },
            { label: "🔙 Voltar ao menu", next: "start" }
        ],
    },
    default_fallback: {
        message: [
            "Desculpe, não entendi exatamente. 😕",
            "Tente usar os botões abaixo ou digite uma palavra-chave como 'agenda', 'financeiro' ou 'suporte'.",
        ],
        options: [
            { label: "📅 Agenda & Atendimentos", next: "agenda" },
            { label: "💰 Financeiro", next: "financeiro" },
            { label: "🔙 Voltar ao início", next: "start" },
        ],
    },
};

const KEYWORD_MAP = {
    agenda: "agenda",
    atendimento: "agenda",
    horario: "agenda",
    compromisso: "agenda",
    paciente: "pacientes",
    cliente: "pacientes",
    lista: "pacientes",
    profissional: "profissionais",
    medico: "profissionais",
    enfermeiro: "profissionais",
    equipe: "profissionais",
    financeiro: "financeiro",
    faturamento: "financeiro",
    dinheiro: "financeiro",
    receita: "financeiro",
    pagamento: "financeiro",
    login: "login",
    senha: "login",
    acesso: "login",
    entrar: "login",
    suporte: "suporte",
    ajuda: "suporte",
    erro: "suporte",
    bug: "suporte",
    problema: "suporte",
    lanna: "lanna_ia",
    ia: "lanna_ia",
    inteligencia: "lanna_ia",
    beneficio: "beneficios",
    vantagem: "beneficios",
    ganho: "beneficios",
    contratar: "valores_sistema",
    motivo: "beneficios",
    funciona: "como_funciona",
    sistema: "como_funciona",
    plataforma: "como_funciona",
    software: "como_funciona",
    app: "como_funciona",
    aplicativo: "como_funciona",
    valor: "valores_sistema",
    valores: "valores_sistema",
    preco: "valores_sistema",
    custo: "valores_sistema",
    pagar: "valores_sistema",
    plano: "valores_sistema",
    planos: "valores_sistema",
    quanto: "valores_sistema",
    custa: "valores_sistema",
    mensalidade: "valores_sistema",
    assinatura: "valores_sistema",
    hausecare: "sobre_hausecare",
    sobre: "sobre_hausecare",
    indicado: "sobre_hausecare",
    que: "sobre_hausecare",
};

function findBestMatch(text) {
    const normalize = (str) =>
        str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const normalizedText = normalize(text);
    const words = normalizedText.split(/\s+/);

    for (const word of words) {
        // Verifica correspondência exata ou parcial significativa
        for (const [key, target] of Object.entries(KEYWORD_MAP)) {
            if (word.includes(key) || key.includes(word)) {
                // Evita falsos positivos muito curtos
                if (word.length > 3) return target;
            }
        }
    }
    return null;
}

export default function LannaChat({ isOpen, onClose }) {
    const [messages, setMessages] = useState([]);
    const [currentStep, setCurrentStep] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const messagesEndRef = useRef(null);

    // Inicializa o chat quando abre
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            handleStep("start");
        }
    }, [isOpen]);

    // Bloqueia scroll da página quando aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Scroll automático
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleStep = (stepKey) => {
        const stepData = CHAT_FLOW[stepKey];
        if (!stepData) return;

        setIsTyping(true);
        setCurrentStep(null); // Esconde opções enquanto digita

        // Simula tempo de digitação e processamento
        let delay = 600;

        // Adiciona mensagens do bot sequencialmente
        stepData.message.forEach((msg, index) => {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { type: "bot", text: msg, id: Date.now() + index },
                ]);

                // Se for a última mensagem, libera as opções
                if (index === stepData.message.length - 1) {
                    setIsTyping(false);
                    setCurrentStep(stepData);
                }
            }, delay * (index + 1));
        });
    };



    const handleOptionClick = (option) => {
        // Se for link externo
        if (option.link) {
            window.open(option.link, "_blank");
            return;
        }

        // Adiciona escolha do usuário
        setMessages((prev) => [
            ...prev,
            { type: "user", text: option.label, id: Date.now() },
        ]);

        // Vai para o próximo passo
        handleStep(option.next);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputVal.trim()) return;

        const text = inputVal.trim();
        setInputVal("");

        // Adiciona mensagem do usuário
        setMessages((prev) => [
            ...prev,
            { type: "user", text: text, id: Date.now() },
        ]);

        // Busca correspondência
        const match = findBestMatch(text);
        if (match) {
            handleStep(match);
        } else {
            handleStep("default_fallback");
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Janela do Chat */}
            <div className="relative flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl ring-1 ring-white/10">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 bg-slate-900/50 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 p-0.5">
                            <img src={lannaImage} alt="Lanna" className="h-full w-full rounded-full object-cover" />
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-500"></span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Lanna</h3>
                            <p className="text-xs text-slate-400">Hausecare Assistant</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Área de Mensagens */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.type === "user"
                                    ? "bg-indigo-600 text-white rounded-tr-sm"
                                    : "bg-slate-800/80 text-slate-200 rounded-tl-sm border border-white/5"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start animate-in fade-in duration-300">
                            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/5 bg-slate-800/80 px-4 py-3">
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }}></span>
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }}></span>
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }}></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Área de Opções (Footer) */}
                <div className="border-t border-white/5 bg-slate-900/50 p-4 backdrop-blur-md">
                    {currentStep && !isTyping && (
                        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {currentStep.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(opt)}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {!currentStep && !isTyping && (
                        <div className="text-center text-sm text-slate-500 py-2">
                            A conversa foi encerrada.
                            <button onClick={() => handleStep('start')} className="ml-2 text-indigo-400 hover:underline">Reiniciar</button>
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500">
                        <Sparkles className="h-3 w-3" />
                        <span>Dica: descreva sua dúvida como se estivesse falando com uma pessoa. A Lanna entende.</span>
                    </div>
                </div>

                {/* Input Area */}
                <form
                    onSubmit={handleSend}
                    className="border-t border-white/5 bg-slate-900/80 p-3 backdrop-blur-md"
                >
                    <div className="relative flex items-center gap-2">
                        <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            placeholder="Digite sua dúvida..."
                            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                        />
                        <button
                            type="submit"
                            disabled={!inputVal.trim() || isTyping}
                            className="group flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600"
                        >
                            <Send className="h-4 w-4 transition group-active:scale-95" />
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
