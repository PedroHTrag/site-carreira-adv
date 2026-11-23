export interface AreaFaqItem {
  question: string;
  answer: string;
}

export interface PracticeAreaItem {
  slug: string;
  title: string;
  shortTitle: string;
  localHeadline: string;
  seoTitle: string;
  seoDescription: string;
  shortDescription: string;
  fullDescription: string[];
  situations: string[];
  workflowSteps: { title: string; description: string }[];
  faqs: AreaFaqItem[];
  iconName: 'scale' | 'hard-hat' | 'shield' | 'users' | 'briefcase' | 'landmark';
}

/**
 * Coleção editável das Áreas de Atuação.
 * Atualmente estruturada para Direito Cível, Direito Trabalhista e Direito Previdenciário.
 */
export const PRACTICE_AREAS: PracticeAreaItem[] = [
  {
    slug: 'direito-civel',
    title: 'Direito Cível',
    shortTitle: 'Cível',
    localHeadline: 'Advogado Cível em Bauru — Direito Civil e Obrigações',
    seoTitle: 'Direito Cível em Bauru/SP | Carreira Advocacia',
    seoDescription:
      'Atuação informativa e técnica de advogado cível em Bauru/SP para contratos, obrigações, responsabilidade civil, posse, propriedade e cobranças.',
    shortDescription:
      'Orientação e representação em contratos civis, obrigações, responsabilidade civil, direito imobiliário, posse, propriedade e cobranças.',
    fullDescription: [
      'O Direito Cível regula as relações jurídicas cotidianas entre pessoas físicas e jurídicas, abrangendo contratos, obrigações, bens patrimoniais e responsabilidade civil. Em Bauru e região, o escritório Carreira Advocacia atua tanto na prevenção de conflitos contratuais quanto na condução de medidas judiciais e extrajudiciais.',
      'Cada demanda é precedida de leitura atenta dos documentos e avaliação dos prazos prescricionais ou decadenciais aplicáveis, com explicação clara das alternativas jurídicas previstas na legislação vigente.',
    ],
    situations: [
      'Elaboração, revisão e rescisão de contratos civis e imobiliários (compra e venda, locação e prestação de serviços).',
      'Ações de cobrança, execuções de títulos extrajudiciais e defesas em demandas patrimoniais.',
      'Questões possessórias, usucapião judicial ou extrajudicial e regularização documental de imóveis em Bauru/SP.',
      'Demandas envolvendo responsabilidade civil por danos materiais ou morais, sempre analisadas caso a caso.',
    ],
    workflowSteps: [
      {
        title: '1. Triagem e Levantamento Documental',
        description:
          'Recebimento dos contratos, notificações, matrículas ou comprovantes relacionados ao caso.',
      },
      {
        title: '2. Análise de Viabilidade Jurídica',
        description:
          'Exame técnico dos riscos, prazos legais e caminhos extrajudiciais ou judiciais disponíveis.',
      },
      {
        title: '3. Estratégia e Notificação Prévia',
        description:
          'Quando cabível, tentativa de composição amigável ou notificação extrajudicial documentada.',
      },
      {
        title: '4. Condução Processual',
        description:
          'Propositura ou defesa em juízo com acompanhamento informativo de todas as movimentações.',
      },
    ],
    faqs: [
      {
        question: 'É recomendável revisar um contrato antes da assinatura?',
        answer:
          'Sim. A análise preventiva das cláusulas de multa, rescisão, garantias e foro reduz significativamente ambiguidades futuras e permite adequar o instrumento à realidade das partes.',
      },
      {
        question: 'Como funciona a regularização de imóveis por usucapião extrajudicial?',
        answer:
          'Quando preenchidos os requisitos legais de tempo de posse, ausência de oposição e planta assinada por profissional habilitado, o procedimento pode tramitar diretamente em cartório de notas e registro de imóveis em Bauru/SP.',
      },
      {
        question: 'Quais documentos levar para uma análise inicial em Direito Cível?',
        answer:
          'Recomenda-se reunir o contrato ou documento objeto da dúvida, eventuais notificações trocadas, comprovantes de pagamento e documentos pessoais básicos.',
      },
    ],
    iconName: 'scale',
  },
  {
    slug: 'direito-trabalhista',
    title: 'Direito Trabalhista',
    shortTitle: 'Trabalhista',
    localHeadline: 'Advogado Trabalhista em Bauru — Direito do Trabalho',
    seoTitle: 'Advogado Trabalhista em Bauru/SP | Carreira Advocacia',
    seoDescription:
      'Atuação de advogado trabalhista em Bauru/SP para trabalhadores e empresas em rescisões, jornadas, compliance trabalhista e ações na Justiça do Trabalho.',
    shortDescription:
      'Assessoria jurídica para empregados e empregadores em rescisões contratuais, jornada, verbas trabalhistas e prevenção de passivos.',
    fullDescription: [
      'As relações de trabalho exigem atenção rigorosa à Consolidação das Leis do Trabalho (CLT), normas coletivas da categoria e entendimentos consolidados dos tribunais. Em Bauru/SP, o escritório presta atendimento informativo a trabalhadores e assessoria preventiva e contenciosa a empresas.',
      'A atuação envolve desde o esclarecimento sobre verbas rescisórias, adicionais e horas extras até a estruturação de rotinas internas em conformidade com a legislação trabalhista.',
    ],
    situations: [
      'Conferência de termos de rescisão contratual, aviso prévio, FGTS e verbas rescisórias.',
      'Análise de jornada de trabalho, banco de horas, horas extras e intervalos legais.',
      'Adicionais de insalubridade, periculosidade e reconhecimento de vínculo ou equiparação salarial.',
      'Assessoria trabalhista empresarial preventiva, revisão de contratos e defesa em reclamações trabalhistas em Bauru e região.',
    ],
    workflowSteps: [
      {
        title: '1. Análise do Histórico Contratual',
        description:
          'Verificação da CTPS, holerites, controles de ponto, TRCT e convenção coletiva aplicável.',
      },
      {
        title: '2. Conferência de Prazos Prescricionais',
        description:
          'Avaliação do prazo bienal após o término do contrato e quinquenal para eventuais pleitos.',
      },
      {
        title: '3. Orientação Técnica',
        description:
          'Esclarecimento objetivo sobre os direitos e deveres previstos na legislação trabalhista.',
      },
      {
        title: '4. Atuação Administrativa ou Judicial',
        description:
          'Condução de negociações assistidas ou representação perante a Justiça do Trabalho.',
      },
    ],
    faqs: [
      {
        question: 'Qual é o prazo para ingressar com ação trabalhista após a saída do emprego?',
        answer:
          'A Constituição Federal estabelece o prazo de até 2 anos contados da extinção do contrato de trabalho, podendo ser discutidos os últimos 5 anos anteriores ao ajuizamento da ação.',
      },
      {
        question: 'O escritório atende apenas trabalhadores ou também empresas em Bauru?',
        answer:
          'Atuamos nas duas frentes de forma independente, prestando orientação técnica a empregados e consultoria preventiva ou defesa contenciosa para empresas de Bauru e região.',
      },
      {
        question: 'Quais documentos ajudam na primeira análise trabalhista?',
        answer:
          'Carteira de trabalho (física ou digital), contrato de trabalho, últimos holerites, termo de rescisão (TRCT) e extrato analítico do FGTS.',
      },
    ],
    iconName: 'hard-hat',
  },
  {
    slug: 'direito-previdenciario',
    title: 'Direito Previdenciário',
    shortTitle: 'Previdenciário',
    localHeadline: 'Advogado Previdenciário em Bauru — INSS e Benefícios',
    seoTitle: 'Direito Previdenciário em Bauru/SP | Carreira Advocacia',
    seoDescription:
      'Atuação jurídica em Direito Previdenciário em Bauru/SP: planejamento previdenciário, aposentadorias, auxílio por incapacidade, pensão por morte e BPC/LOAS.',
    shortDescription:
      'Orientação e atuação administrativa ou judicial em aposentadorias, planejamento previdenciário, benefícios por incapacidade, pensões e revisões no INSS.',
    fullDescription: [
      'O Direito Previdenciário abrange a proteção social assegurada pelo Regime Geral de Previdência Social (INSS) e por regimes próprios, exigindo conferência minuciosa do histórico contributivo (CNIS), períodos especiais e regras de transição vigentes.',
      'Em Bauru e região, o escritório atua desde o levantamento documental e requerimentos administrativos até recursos e ações previdenciárias, sempre em linguagem clara e dentro dos parâmetros éticos da advocacia.',
    ],
    situations: [
      'Planejamento previdenciário com análise do CNIS, vínculos faltantes e simulação de regras de transição.',
      'Requerimento e acompanhamento de aposentadoria por idade, tempo de contribuição, especial ou da pessoa com deficiência.',
      'Auxílio por incapacidade temporária, aposentadoria por incapacidade permanente, auxílio-acidente e pensão por morte.',
      'Benefício de Prestação Continuada (BPC/LOAS), revisões de benefício e recursos contra indeferimentos do INSS.',
    ],
    workflowSteps: [
      {
        title: '1. Levantamento do CNIS e Provas',
        description:
          'Conferência do Cadastro Nacional de Informações Sociais, CTPS, carnês de contribuição, PPP e laudos médicos.',
      },
      {
        title: '2. Diagnóstico e Cálculo Previdenciário',
        description:
          'Identificação de pendências contributivas, tempo rural ou especial e regras aplicáveis ao histórico do segurado.',
      },
      {
        title: '3. Requerimento ou Recurso Administrativo',
        description:
          'Instrução documental perante o INSS, cumprimento de exigências e acompanhamento de perícias ou recursos.',
      },
      {
        title: '4. Medida Judicial Previdenciária',
        description:
          'Quando houver indeferimento ou necessidade de reconhecimento judicial de tempo ou incapacidade, propositura e acompanhamento da ação.',
      },
    ],
    faqs: [
      {
        question: 'O que é e para que serve o planejamento previdenciário?',
        answer:
          'É o estudo técnico do histórico de contribuições (CNIS), carteiras de trabalho e documentos especiais (como PPP) para verificar inconsistências, corrigir vínculos antes do pedido e identificar qual regra previdenciária se aplica ao perfil do segurado.',
      },
      {
        question: 'Meu benefício foi indeferido pelo INSS. Preciso entrar direto na Justiça?',
        answer:
          'Não necessariamente. Conforme o motivo do indeferimento, é avaliada a viabilidade de recurso administrativo no próprio INSS, novo requerimento instruído com documentos faltantes ou medida judicial.',
      },
      {
        question: 'Quais documentos ajudam na primeira análise previdenciária?',
        answer:
          'Extrato completo do CNIS (disponível no Meu INSS), carteiras de trabalho, carnês/guias de recolhimento, cartas de concessão ou indeferimento e, quando aplicável, PPP e laudos médicos atualizados.',
      },
    ],
    iconName: 'shield',
  },
];

export function getPracticeAreaBySlug(slug?: string): PracticeAreaItem | undefined {
  if (!slug) return undefined;
  return PRACTICE_AREAS.find((area) => area.slug === slug);
}
