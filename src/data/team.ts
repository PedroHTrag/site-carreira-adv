import { getSiteAssetUrl } from './firm';

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  isPartner: boolean;
  oab: string;
  primaryAreaSlug: string;
  areaSlugs: string[];
  photo: string;
  photoAlt: string;
  shortBio: string;
  fullBio: string[];
  education: string[];
  languages: string[];
  publications: string[];
  email: string;
  linkedinUrl: string;
  whatsappMessage: string;
}

/**
 * Coleção editável da Equipe.
 * Para adicionar ou remover integrantes, basta editar este array.
 * A listagem do site ordena automaticamente sócios primeiro (isPartner: true).
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: 'carreira-socio',
    name: '[NOME DO SÓCIO 1] Carreira',
    role: 'Sócio-Fundador',
    isPartner: true,
    oab: 'OAB/SP [000.001]',
    primaryAreaSlug: 'direito-civel',
    areaSlugs: ['direito-civel', 'direito-trabalhista'],
    photo: getSiteAssetUrl('/src/assets/images/lawyer_male_portrait_1795363216792.webp'),
    photoAlt:
      'Retrato institucional de [NOME DO SÓCIO 1] Carreira, Sócio-Fundador do escritório Carreira Advocacia em Bauru/SP',
    shortBio:
      'Atua na advocacia cível e trabalhista em Bauru e região, com foco em contratos, obrigações, demandas patrimoniais e consultoria jurídica preventiva.',
    fullBio: [
      'Sócio-fundador do escritório Carreira Advocacia, dedica-se ao atendimento consultivo e contencioso de pessoas físicas e jurídicas em Bauru/SP na esfera cível e trabalhista.',
      'Sua prática é voltada para a clareza contratual, prevenção de litígios e condução técnica de demandas envolvendo obrigações civis, responsabilidade civil e questões imobiliárias.',
    ],
    education: [
      'Graduação em Direito — [INSTITUIÇÃO DE ENSINO]',
      'Especialização em Direito Civil e Processo Civil — [INSTITUIÇÃO / ANO]',
      'Membro inscrito na Ordem dos Advogados do Brasil, Seção São Paulo (Subseção Bauru).',
    ],
    languages: ['Português (nativo)', 'Inglês (leitura e conversação jurídica)'],
    publications: [
      'Artigos informativos sobre elaboração de contratos civis, responsabilidade civil e segurança documental.',
      'Participações em encontros regionais de advocacia cível no interior paulista.',
    ],
    email: '[E-MAIL: carreira@carreiraadvocacia.adv.br]',
    linkedinUrl: 'https://www.linkedin.com',
    whatsappMessage:
      'Olá, gostaria de solicitar contato com o Dr. [NOME DO SÓCIO 1] Carreira (OAB/SP [000.001]) para atendimento jurídico em Direito Cível em Bauru/SP.',
  },
  {
    slug: 'socia-previdenciario',
    name: '[NOME DA SÓCIA 2]',
    role: 'Sócia',
    isPartner: true,
    oab: 'OAB/SP [000.002]',
    primaryAreaSlug: 'direito-previdenciario',
    areaSlugs: ['direito-previdenciario', 'direito-civel'],
    photo: getSiteAssetUrl('/src/assets/images/lawyer_female_portrait_1795363217529.webp'),
    photoAlt:
      'Retrato institucional de [NOME DA SÓCIA 2], Sócia do escritório Carreira Advocacia em Bauru/SP',
    shortBio:
      'Coordena a área de Direito Previdenciário e atua em demandas cíveis correlatas, conduzindo planejamentos previdenciários e requerimentos no INSS.',
    fullBio: [
      'Sócia-fundadora do escritório, atua de forma próxima e reservada em demandas de Direito Previdenciário e Direito Cível em Bauru/SP e comarca de região.',
      'Dedica-se à conferência detalhada de vínculos no CNIS, preparação documental para pedidos de aposentadoria e acompanhamento de benefícios por incapacidade ou pensão por morte.',
    ],
    education: [
      'Graduação em Direito — [INSTITUIÇÃO DE ENSINO]',
      'Pós-graduação em Direito Previdenciário — [INSTITUIÇÃO / ANO]',
      'Capacitação em Planejamento Previdenciário e Cálculos de Benefícios.',
    ],
    languages: ['Português (nativo)', 'Espanhol (intermediário)'],
    publications: [
      'Autora de guias informativos sobre planejamento previdenciário, revisão do CNIS e benefícios do INSS.',
    ],
    email: '[E-MAIL: socia@carreiraadvocacia.adv.br]',
    linkedinUrl: 'https://www.linkedin.com',
    whatsappMessage:
      'Olá, gostaria de solicitar contato com a Dra. [NOME DA SÓCIA 2] (OAB/SP [000.002]) para orientação em Direito Previdenciário em Bauru/SP.',
  },
  {
    slug: 'associado-trabalhista',
    name: '[NOME DO ADVOGADO 3]',
    role: 'Advogado Associado',
    isPartner: false,
    oab: 'OAB/SP [000.003]',
    primaryAreaSlug: 'direito-trabalhista',
    areaSlugs: ['direito-trabalhista', 'direito-previdenciario'],
    photo: getSiteAssetUrl('/src/assets/images/lawyer_male_associate_1795363780487.webp'),
    photoAlt:
      'Retrato institucional de [NOME DO ADVOGADO 3], Advogado Associado da área Trabalhista e Previdenciária',
    shortBio:
      'Atua em Direito do Trabalho e em reflexos previdenciários do vínculo empregatício em Bauru/SP, realizando análise de rescisões e jornada.',
    fullBio: [
      'Advogado associado responsável pelo acompanhamento técnico de demandas trabalhistas e análise de reflexos previdenciários na unidade de Bauru/SP.',
      'Atua na conferência minuciosa de cálculos rescisórios, revisão de documentos laborais e orientação preventiva voltada à conformidade legal.',
    ],
    education: [
      'Graduação em Direito — [INSTITUIÇÃO DE ENSINO]',
      'Especialização em Direito e Processo do Trabalho — [INSTITUIÇÃO / ANO]',
    ],
    languages: ['Português (nativo)', 'Inglês (leitura técnica)'],
    publications: [
      'Publicações informativas sobre jornada de trabalho, verbas rescisórias e prazos prescricionais na CLT.',
    ],
    email: '[E-MAIL: trabalhista@carreiraadvocacia.adv.br]',
    linkedinUrl: 'https://www.linkedin.com',
    whatsappMessage:
      'Olá, gostaria de falar com [NOME DO ADVOGADO 3] (OAB/SP [000.003]) sobre orientação em Direito Trabalhista.',
  },
  {
    slug: 'associada-previdenciario',
    name: '[NOME DA ADVOGADA 4]',
    role: 'Advogada Associada',
    isPartner: false,
    oab: 'OAB/SP [000.004]',
    primaryAreaSlug: 'direito-previdenciario',
    areaSlugs: ['direito-previdenciario', 'direito-civel'],
    photo: getSiteAssetUrl('/src/assets/images/lawyer_female_associate_1795363780202.webp'),
    photoAlt:
      'Retrato institucional de [NOME DA ADVOGADA 4], Advogada Associada da área Previdenciária e Cível',
    shortBio:
      'Dedica-se ao Direito Previdenciário administrativo e judicial e a demandas cíveis em Bauru e região.',
    fullBio: [
      'Advogada associada com foco em requerimentos previdenciários no INSS, benefícios assistenciais (BPC/LOAS), benefícios por incapacidade e ações cíveis correlatas em Bauru e região.',
      'Atua na organização probatória prévia e no acompanhamento processual informativo em cada etapa do atendimento.',
    ],
    education: [
      'Graduação em Direito — [INSTITUIÇÃO DE ENSINO]',
      'Especialização em Direito Previdenciário e Processo Civil — [INSTITUIÇÃO / ANO]',
    ],
    languages: ['Português (nativo)', 'Inglês (intermediário)'],
    publications: [
      'Notas informativas sobre aposentadoria por incapacidade, BPC/LOAS e documentos necessários ao INSS.',
    ],
    email: '[E-MAIL: previdenciario@carreiraadvocacia.adv.br]',
    linkedinUrl: 'https://www.linkedin.com',
    whatsappMessage:
      'Olá, gostaria de falar com [NOME DA ADVOGADA 4] (OAB/SP [000.004]) sobre Direito Previdenciário ou Cível.',
  },
];

export function getSortedTeamMembers(members: TeamMember[] = TEAM_MEMBERS): TeamMember[] {
  return [...members].sort((a, b) => Number(b.isPartner) - Number(a.isPartner));
}

export function filterTeamByArea(
  areaSlug: string,
  members: TeamMember[] = TEAM_MEMBERS
): TeamMember[] {
  const sorted = getSortedTeamMembers(members);
  if (!areaSlug || areaSlug === 'todas') return sorted;
  return sorted.filter(
    (member) => member.primaryAreaSlug === areaSlug || member.areaSlugs.includes(areaSlug)
  );
}

export function getTeamMemberBySlug(slug?: string): TeamMember | undefined {
  if (!slug) return undefined;
  return TEAM_MEMBERS.find((member) => member.slug === slug);
}
