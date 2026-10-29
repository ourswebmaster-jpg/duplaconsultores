// Diagnóstico de maturidade digital e IA (29/10/2026) — a primeira peça do portal de formação-ação da Dupla.
// Seis dimensões, três afirmações cada, resposta de 0 a 3. O resultado por dimensão é a média em percentagem.
// A submissão vai para o Hub da OURS pela rota pública de formulários (não há credenciais partilhadas):
// o Hub guarda-a e avisa o geral@. O plano do portal está no guia «Formação-ação» do Hub.
//
// Mudar uma dimensão ou uma pergunta aqui obriga a rever o modelo «diagnostico» no Hub
// (src/lib/sites/formularios.ts do ours-hub), que valida os ids.

export type Pergunta = { id: string; texto: string };
export type Dimensao = { id: string; nome: string; perguntas: Pergunta[]; proximoPasso: string };

export const ESCALA = [
  { v: 0, label: "Não" },
  { v: 1, label: "Pouco" },
  { v: 2, label: "Em parte" },
  { v: 3, label: "Sim" },
] as const;

export const DIMENSOES: Dimensao[] = [
  {
    id: "estrategia",
    nome: "Estratégia e liderança",
    perguntas: [
      { id: "e1", texto: "A empresa tem objetivos digitais escritos para este ano." },
      { id: "e2", texto: "Há uma pessoa responsável pelo digital, com tempo para isso." },
      { id: "e3", texto: "A direção decide investimentos digitais com base em resultados medidos." },
    ],
    proximoPasso: "Escrever três objetivos digitais para os próximos 6 meses, com um responsável e um indicador cada.",
  },
  {
    id: "presenca",
    nome: "Presença e marketing digital",
    perguntas: [
      { id: "p1", texto: "O site está atualizado, funciona bem no telemóvel e gera contactos." },
      { id: "p2", texto: "O Perfil da Empresa no Google está completo e tem avaliações recentes." },
      { id: "p3", texto: "As redes sociais ou a publicidade seguem um plano mensal." },
    ],
    proximoPasso: "Rever o site e o Perfil da Empresa no Google: são a montra que o cliente vê antes de ligar.",
  },
  {
    id: "processos",
    nome: "Processos e ferramentas",
    perguntas: [
      { id: "r1", texto: "Orçamentos, encomendas e faturas são tratados numa ferramenta digital, não em papel." },
      { id: "r2", texto: "A equipa partilha documentos e calendários num só sítio (Google Workspace ou Microsoft 365)." },
      { id: "r3", texto: "As tarefas repetitivas (emails, relatórios, lembretes) estão automatizadas." },
    ],
    proximoPasso: "Escolher um processo que se repete todas as semanas e automatizá-lo primeiro.",
  },
  {
    id: "dados",
    nome: "Dados e medição",
    perguntas: [
      { id: "d1", texto: "A empresa sabe de onde vêm os clientes novos (site, redes, recomendação…)." },
      { id: "d2", texto: "Há números de vendas e de marketing revistos todos os meses." },
      { id: "d3", texto: "Os contactos de clientes estão organizados numa base (CRM ou equivalente)." },
    ],
    proximoPasso: "Começar a medir de onde vem cada cliente: sem isto, não se sabe onde investir.",
  },
  {
    id: "ia",
    nome: "Inteligência artificial",
    perguntas: [
      { id: "i1", texto: "A equipa usa ferramentas de IA (ChatGPT, Claude, Copilot, Gemini) no trabalho." },
      { id: "i2", texto: "Há regras sobre o que se pode pôr nessas ferramentas (dados de clientes, documentos)." },
      { id: "i3", texto: "A IA já poupa tempo num processo concreto da empresa." },
    ],
    proximoPasso: "Escolher um caso de uso de IA com ganho claro (respostas a clientes, orçamentos, conteúdos) e testá-lo durante um mês.",
  },
  {
    id: "seguranca",
    nome: "Segurança e dados pessoais",
    perguntas: [
      { id: "s1", texto: "Há cópias de segurança automáticas dos dados importantes." },
      { id: "s2", texto: "As contas da empresa usam palavras-passe fortes e verificação em dois passos." },
      { id: "s3", texto: "A empresa cumpre o RGPD (política de privacidade, consentimentos, registo de tratamentos)." },
    ],
    proximoPasso: "Ligar a verificação em dois passos em todas as contas e confirmar que há cópias de segurança.",
  },
];

export function resultado(respostas: Record<string, number>) {
  return DIMENSOES.map((d) => {
    const soma = d.perguntas.reduce((s, p) => s + (respostas[p.id] ?? 0), 0);
    const pct = Math.round((soma / (d.perguntas.length * 3)) * 100);
    return { id: d.id, nome: d.nome, pct, nivel: nivel(pct), proximoPasso: d.proximoPasso };
  });
}

export function nivel(pct: number) {
  if (pct < 34) return "Inicial";
  if (pct < 67) return "Em desenvolvimento";
  if (pct < 90) return "Consolidado";
  return "Avançado";
}
