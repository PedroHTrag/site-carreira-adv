export interface OfficePhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface FirmPillar {
  id: string;
  title: string;
  description: string;
  iconName: 'scale' | 'users' | 'shield';
}

/**
 * Dados institucionais centralizados e editáveis do escritório.
 * Mantenha Nome, Endereço e Telefone (NAP) consistentes em todo o site para SEO local.
 */
export const getSiteAssetUrl = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const FIRM_INFO = {
  name: 'Carreira Advocacia',
  shortName: 'Carreira Advocacia',
  oabSocietyNumber: 'OAB/SP [Nº REGISTRO SOCIEDADE]',
  cityState: 'Bauru/SP',
  foundedYear: '[ANO DE FUNDAÇÃO]',
  // NAP (Name, Address, Phone) — manter idêntico em todas as seções e schemas
  addressLine: '[ENDEREÇO COMPLETO], Centro, Bauru/SP, CEP [00000-000]',
  streetAddress: '[ENDEREÇO COMPLETO], Centro',
  postalCode: '[00000-000]',
  phoneDisplay: '[TELEFONE: (14) 0000-0000]',
  phoneHref: 'tel:+551400000000',
  whatsappDisplay: '[WHATSAPP: (14) 90000-0000]',
  whatsappNumberDigits: '5514900000000',
  whatsappPrefilledMessage:
    'Olá, gostaria de solicitar informações sobre atendimento jurídico com o escritório Carreira Advocacia em Bauru/SP.',
  email: '[E-MAIL: contato@carreiraadvocacia.adv.br]',
  dpoEmail: '[E-MAIL DPO: privacidade@carreiraadvocacia.adv.br]',
  businessHours: 'Segunda a sexta-feira, das 08h00 às 18h00',
  heroBackdrop: getSiteAssetUrl('/src/assets/images/office_boardroom_clean_1795363800654.webp'),
  servicesBackdrop: getSiteAssetUrl('/src/assets/images/services_courthouse_bg_1795363216763.webp'),
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Centro%2C%20Bauru%20-%20SP%2C%20Brasil&t=&z=15&ie=UTF8&iwloc=&output=embed',
  googleMapsLink:
    'https://www.google.com/maps/search/?api=1&query=Bauru+SP+Centro+Brasil',
};

export function buildWhatsAppHref(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || FIRM_INFO.whatsappPrefilledMessage);
  return `https://wa.me/${FIRM_INFO.whatsappNumberDigits}?text=${message}`;
}

export const HOME_PILLARS: FirmPillar[] = [
  {
    id: 'rigor-tecnico',
    title: 'Rigor Técnico e Precisão',
    description:
      'Fundamentação jurídica sólida, atualização normativa constante e exame prévio da documentação em cada demanda.',
    iconName: 'scale',
  },
  {
    id: 'atendimento-pessoal',
    title: 'Atendimento Direto e Claro',
    description:
      'Contato próximo com os advogados responsáveis em Bauru e região, explicando direitos, riscos e etapas sem juridiquês.',
    iconName: 'users',
  },
  {
    id: 'etica-sigilo',
    title: 'Ética e Sigilo Absoluto',
    description:
      'Conduta sóbria alinhada ao Estatuto da Advocacia e ao Provimento nº 205/2021 da OAB, com respeito integral à LGPD.',
    iconName: 'shield',
  },
];

export const OFFICE_CONTENT = {
  historyTitle: 'Segurança jurídica com rigor técnico e proximidade.',
  historyParagraphs: [
    'Fundado em [ANO DE FUNDAÇÃO], o escritório Carreira Advocacia atua em Bauru/SP com o propósito de tornar o direito um caminho claro e seguro para pessoas e empresas.',
    'Com atuação nas áreas Cível, Trabalhista e Previdenciária, cada demanda é conduzida com estudo aprofundado, transparência e comunicação objetiva — presencialmente em Bauru ou por atendimento remoto.',
  ],
  purpose:
    'Tornar o direito um caminho claro e seguro para pessoas e empresas de Bauru e região.',
  mission:
    'Oferecer assessoria jurídica técnica, ética e personalizada, traduzindo a complexidade da lei em decisões seguras para quem confia em nós.',
  vision:
    'Ser reconhecido em Bauru e região como escritório de referência em confiança, rigor técnico e relacionamento de longo prazo.',
  positioningStatement:
    'Para quem busca segurança jurídica com proximidade, a Carreira Advocacia une rigor técnico e atendimento direto, pessoal e transparente, com o conhecimento de quem atua em Bauru e região.',
  valuesList: [
    {
      number: '01',
      title: 'Ética',
      description: 'Atuação irrestrita dentro dos limites legais, morais e disciplinares da advocacia.',
    },
    {
      number: '02',
      title: 'Rigor técnico',
      description: 'Fundamentação sólida, atualização normativa constante e precisão em cada peça.',
    },
    {
      number: '03',
      title: 'Respeito',
      description: 'Escuta atenta e consideração genuína pela história, pelo tempo e pelos interesses de cada pessoa.',
    },
    {
      number: '04',
      title: 'Clareza',
      description: 'Tradução objetiva de cenários, riscos e etapas, sem opacidade ou jargões excessivos.',
    },
    {
      number: '05',
      title: 'Compromisso',
      description: 'Responsabilidade integral com prazos, estratégias e acompanhamento contínuo das demandas.',
    },
    {
      number: '06',
      title: 'Discrição',
      description: 'Sobriedade na conduta profissional e proteção absoluta às informações confiadas ao escritório.',
    },
  ],
  nonNegotiablePrinciples: [
    'Cada caso é único e recebe atenção individual.',
    'Falamos de forma clara, sem juridiquês desnecessário.',
    'Prazo é compromisso.',
    'O sigilo do cliente é absoluto.',
  ],
  differentials: [
    {
      number: '01',
      title: 'Atendimento pessoal',
      description:
        'Contato direto com os advogados responsáveis, sem intermediários impessoais ou respostas padronizadas.',
    },
    {
      number: '02',
      title: 'Linguagem clara',
      description:
        'Explicação transparente de direitos, riscos, prazos e possibilidades reais em cada fase do processo.',
    },
    {
      number: '03',
      title: 'Conduta ética',
      description:
        'Postura sóbria, responsável e estritamente alinhada às normas da profissão e ao interesse legítimo do cliente.',
    },
    {
      number: '04',
      title: 'Conhecimento local',
      description:
        'Presença ativa e compreensão das dinâmicas econômicas, sociais e forenses de Bauru e região.',
    },
  ],
  photos: [
    {
      id: 'sala-reunioes',
      src: getSiteAssetUrl('/src/assets/images/office_boardroom_clean_1795363800654.webp'),
      alt: 'Sala de reuniões do escritório Carreira Advocacia em Bauru/SP com mesa em madeira escura e biblioteca jurídica',
      caption: 'Sala de Reuniões e Biblioteca Jurídica — Unidade Bauru/SP',
    },
    {
      id: 'recepcao-atendimento',
      src: getSiteAssetUrl('/src/assets/images/office_lounge_clean_1795363801856.webp'),
      alt: 'Área de recepção e atendimento reservado do escritório Carreira Advocacia em Bauru/SP',
      caption: 'Espaço de Acolhimento e Atendimento Reservado',
    },
  ] as OfficePhoto[],
};
