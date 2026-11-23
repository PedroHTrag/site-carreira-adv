import { getSiteAssetUrl } from './firm';

export interface BlogSubSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  subsections?: BlogSubSection[];
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  categorySlug: string;
  authorSlug: string;
  publishedAt: string;
  publishedAtDisplay: string;
  updatedAt: string;
  updatedAtDisplay: string;
  readingMinutes: number;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  relatedAreaSlugs: string[];
  sections: BlogSection[];
}

/**
 * Coleção editável de artigos do Blog (formato JSON/TypeScript estruturado com H2 e H3).
 * Categorias alinhadas às três áreas de atuação: Direito Cível, Trabalhista e Previdenciário.
 * Cada artigo possui caráter exclusivamente informativo, conforme Provimento 205/2021 da OAB.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'direito-trabalhista-bauru-rescisao-prazos',
    title: 'Rescisão de Contrato de Trabalho: Quais Verbas e Prazos Observar',
    seoTitle: 'Rescisão Trabalhista e Prazos Legais | Blog Carreira Advocacia Bauru',
    seoDescription:
      'Entenda de forma informativa quais verbas integram a rescisão contratual, os prazos de pagamento pela CLT e os prazos prescricionais na Justiça do Trabalho.',
    categorySlug: 'direito-trabalhista',
    authorSlug: 'associado-trabalhista',
    publishedAt: '2026-10-18',
    publishedAtDisplay: '18 de outubro de 2026',
    updatedAt: '2026-11-05',
    updatedAtDisplay: '05 de novembro de 2026',
    readingMinutes: 5,
    excerpt:
      'Guia informativo sobre as modalidades de desligamento previstas na CLT, o prazo de pagamento das verbas rescisórias e a conferência documental necessária.',
    coverImage: getSiteAssetUrl('/src/assets/images/office_boardroom_clean_1795363800654.webp'),
    coverAlt:
      'Mesa de reuniões do escritório Carreira Advocacia para atendimento trabalhista em Bauru',
    relatedAreaSlugs: ['direito-trabalhista', 'direito-previdenciario'],
    sections: [
      {
        id: 'modalidades-de-rescisao',
        heading: 'Principais Modalidades de Rescisão na CLT',
        paragraphs: [
          'O encerramento do contrato de trabalho gera reflexos distintos conforme a modalidade do desligamento. A conferência correta do Termo de Rescisão do Contrato de Trabalho (TRCT) evita equívocos tanto para trabalhadores quanto para empregadores em Bauru e região.',
        ],
        subsections: [
          {
            heading: 'Dispensa sem justa causa e pedido de demissão',
            paragraphs: [
              'Na dispensa sem justa causa por iniciativa do empregador, são devidos saldo de salário, aviso prévio (trabalhado ou indenizado), férias vencidas e proporcionais acrescidas de 1/3, 13º salário proporcional e saque do FGTS com a indenização legal.',
              'Já no pedido de demissão, o empregado mantém direito ao saldo de salário, 13º proporcional e férias acrescidas de 1/3, observando-se as regras do aviso prévio.',
            ],
          },
          {
            heading: 'Rescisão por acordo entre as partes',
            paragraphs: [
              'Prevista no artigo 484-A da CLT, a extinção consensual possibilita o pagamento de metade do aviso prévio indenizado e redução proporcional da multa do FGTS, exigindo formalização inequívoca da vontade de ambas as partes.',
            ],
          },
        ],
      },
      {
        id: 'prazos-de-pagamento-e-prescricao',
        heading: 'Prazos de Pagamento e Prescrição Trabalhista',
        paragraphs: [
          'Independentemente da modalidade de desligamento ou da forma de aviso prévio, o artigo 477, §6º, da CLT fixa o prazo de até 10 dias corridos contados do término do contrato para a quitação das verbas rescisórias e entrega das guias.',
        ],
        subsections: [
          {
            heading: 'Prazo prescricional de 2 e 5 anos',
            paragraphs: [
              'Caso permaneçam divergências documentais não resolvidas administrativamente, a legislação estabelece o prazo de 2 anos após o encerramento do vínculo para propositura de eventual ação trabalhista, limitado aos últimos 5 anos do contrato.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'planejamento-previdenciario-aposentadoria-inss',
    title: 'Planejamento Previdenciário no INSS: Como Conferir o CNIS e Vínculos',
    seoTitle: 'Planejamento Previdenciário e CNIS | Carreira Advocacia Bauru/SP',
    seoDescription:
      'Saiba como funciona a conferência do extrato do CNIS, a regularização de vínculos e os cuidados documentais antes de protocolar pedido de aposentadoria no INSS.',
    categorySlug: 'direito-previdenciario',
    authorSlug: 'socia-previdenciario',
    publishedAt: '2026-09-29',
    publishedAtDisplay: '29 de setembro de 2026',
    updatedAt: '2026-10-22',
    updatedAtDisplay: '22 de outubro de 2026',
    readingMinutes: 6,
    excerpt:
      'Entenda o papel do Cadastro Nacional de Informações Sociais (CNIS), as pendências mais frequentes nos registros contributivos e os documentos que evitam atrasos no INSS.',
    coverImage: getSiteAssetUrl('/src/assets/images/office_lounge_clean_1795363801856.webp'),
    coverAlt:
      'Espaço reservado de atendimento previdenciário no escritório Carreira Advocacia em Bauru/SP',
    relatedAreaSlugs: ['direito-previdenciario', 'direito-trabalhista'],
    sections: [
      {
        id: 'importancia-do-cnis',
        heading: 'O Papel do CNIS na Análise Previdenciária',
        paragraphs: [
          'Antes de solicitar qualquer benefício previdenciário no INSS, a análise do Cadastro Nacional de Informações Sociais (CNIS) permite verificar se todas as contribuições, datas de admissão e demissão e remunerações constam sem falhas ou indicadores de pendência.',
        ],
        subsections: [
          {
            heading: 'Indicadores de pendência mais comuns',
            paragraphs: [
              'Registros sem data de saída (extemporaneidade de vínculo), recolhimentos abaixo do salário mínimo ou contribuições em atraso sem comprovação de atividade costumam gerar exigências administrativas que podem ser corrigidas antecipadamente.',
            ],
          },
          {
            heading: 'Tempo especial, atividade rural e períodos concomitantes',
            paragraphs: [
              'Atividades expostas a agentes nocivos exigem a conferência do Perfil Profissiográfico Previdenciário (PPP) e de laudos técnicos contemporâneos ao trabalho, conforme os critérios vigentes em cada período.',
            ],
          },
        ],
      },
      {
        id: 'organizacao-para-requerimento',
        heading: 'Documentos Essenciais Antes do Pedido Administrativo',
        paragraphs: [
          'Reunir carteiras de trabalho originais, carnês de recolhimento, PPPs e eventuais processos trabalhistas com reconhecimento de vínculo reduz exigências e permite analisar de forma objetiva as regras de transição aplicáveis em Bauru e região.',
        ],
      },
    ],
  },
  {
    slug: 'contratos-civis-revisao-seguranca-juridica',
    title: 'Contratos Civis e Obrigações: Cláusulas Essenciais para Prevenir Conflitos',
    seoTitle: 'Contratos Civis e Obrigações em Bauru/SP | Blog Carreira Advocacia',
    seoDescription:
      'Conheça as principais cláusulas de segurança jurídica em contratos civis, locações e prestações de serviços para evitar ambiguidades e litígios.',
    categorySlug: 'direito-civel',
    authorSlug: 'carreira-socio',
    publishedAt: '2026-09-10',
    publishedAtDisplay: '10 de setembro de 2026',
    updatedAt: '2026-09-25',
    updatedAtDisplay: '25 de setembro de 2026',
    readingMinutes: 5,
    excerpt:
      'Como a redação clara de objeto, obrigações das partes, garantias, multa proporcional e rescisão protege relações contratuais civis.',
    coverImage: getSiteAssetUrl('/src/assets/images/hero_law_library_1795363217239.webp'),
    coverAlt: 'Biblioteca jurídica utilizada na revisão de contratos civis em Bauru/SP',
    relatedAreaSlugs: ['direito-civel'],
    sections: [
      {
        id: 'clausulas-criticas',
        heading: 'Cláusulas que Merecem Atenção Antes da Assinatura',
        paragraphs: [
          'Em contratos civis — como compra e venda, locação de imóveis ou prestação de serviços — modelos genéricos sem adaptação à negociação real costumam deixar lacunas que só aparecem diante de atraso ou inadimplemento.',
        ],
        subsections: [
          {
            heading: 'Objeto, prazos e critérios de cumprimento',
            paragraphs: [
              'Descrever objetivamente o bem ou serviço contratado, as formas de pagamento, os prazos de entrega e as condições de vistoria reduz divergências interpretativas entre as partes.',
            ],
          },
          {
            heading: 'Rescisão, multa contratual e notificações',
            paragraphs: [
              'Prever prazos razoáveis de denúncia, hipóteses de rescisão motivada, multa proporcional prevista no Código Civil e meio formal de notificação confere previsibilidade para eventuais acertos futuros.',
            ],
          },
        ],
      },
      {
        id: 'provas-e-execucao',
        heading: 'Formalização Documental e Validade como Título Executivo',
        paragraphs: [
          'A correta identificação dos contratantes, assinatura válida (física ou eletrônica conforme a legislação) e observância dos requisitos legais definem a força probatória e executiva do documento caso seja necessária cobrança judicial.',
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug?: string): BlogPost | undefined {
  if (!slug) return undefined;
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostsByAuthor(authorSlug: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.authorSlug === authorSlug);
}

export function getBlogPostsByArea(areaSlug: string): BlogPost[] {
  return BLOG_POSTS.filter(
    (post) => post.categorySlug === areaSlug || post.relatedAreaSlugs.includes(areaSlug)
  );
}

