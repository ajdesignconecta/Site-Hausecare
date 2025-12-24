import { Building2, Users, HeartPulse, ShieldCheck } from "lucide-react";

export default function Audience() {
  const audiences = [
    {
      icon: Building2,
      title: "Empresas de Home Care",
      description:
        "Organizações que precisam de controle absoluto sobre pacientes, profissionais, agendas, evolução clínica e financeiro.",
    },
    {
      icon: Users,
      title: "Clínicas e Instituições",
      description:
        "Clínicas que desejam padronizar processos, reduzir erros operacionais e ganhar escala com segurança.",
    },
    {
      icon: HeartPulse,
      title: "Profissionais de Saúde",
      description:
        "Fisioterapeutas, enfermeiros e equipes multidisciplinares integrados a um fluxo seguro e rastreável.",
    },
    {
      icon: ShieldCheck,
      title: "Gestores e Administradores",
      description:
        "Gestores que precisam de dados confiáveis para decisões financeiras, operacionais e estratégicas.",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Para quem a Hausecare foi criada
          </h2>
          <p className="text-slate-600 text-lg">
            Uma plataforma desenhada para organizações que precisam operar com
            excelência clínica, controle total e visão de negócio.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#174c77] text-white mb-5">
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
