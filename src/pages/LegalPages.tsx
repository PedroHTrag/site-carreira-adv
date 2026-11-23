import { PageHeroBanner } from '../components/Layout';
import { FIRM_INFO } from '../data/firm';
import type { BreadcrumbItem } from '../utils/router';

interface LegalPageProps {
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export function PrivacyPolicyPage({ breadcrumbs, onNavigate }: LegalPageProps) {
  return (
    <>
      <PageHeroBanner
        eyebrow="LGPD · LEI Nº 13.709/2018"
        titlePrefix="Política de"
        titleHighlight="Privacidade"
        subtitle="Transparência sobre coleta, uso, armazenamento e direitos dos titulares de dados pessoais."
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <section aria-label="Política de Privacidade" className="bg-white py-14 lg:py-16">
        <div className="max-w-[880px] mx-auto px-6 space-y-7 text-[15px] font-light leading-[1.72] text-[#2C4156]">
          <section className="space-y-2.5">
            <h2 className="font-display text-[26px] font-normal text-[#082144]">
              1. Controlador dos Dados Pessoais
            </h2>
            <p>
              O tratamento de dados pessoais coletados por meio deste site é realizado por{' '}
              <strong className="font-medium text-[#082144]">{FIRM_INFO.name}</strong>, sociedade de advogados
              registrada sob <strong className="font-medium text-[#082144]">{FIRM_INFO.oabSocietyNumber}</strong>,
              com sede em <strong className="font-medium text-[#082144]">{FIRM_INFO.addressLine}</strong>.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-display text-[26px] font-normal text-[#082144]">
              2. Finalidade e Dados Coletados
            </h2>
            <p>
              Ao preencher o formulário de contato, coletamos nome, e-mail, telefone/WhatsApp,
              assunto e a mensagem enviada exclusivamente para responder à sua solicitação de
              atendimento ou agendamento jurídico, mediante seu consentimento expresso.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-display text-[26px] font-normal text-[#082144]">
              3. Cookies e Ferramentas Analíticas
            </h2>
            <p>
              Utilizamos cookies estritamente necessários para registrar suas preferências de
              privacidade. Cookies analíticos (Google Analytics 4) somente são ativados mediante sua
              concordância explícita no banner de cookies, podendo ser revogados a qualquer momento
              em "Preferências de Cookies" no rodapé.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-display text-[26px] font-normal text-[#082144]">
              4. Direitos do Titular e Canal de Encarregado (DPO)
            </h2>
            <p>
              Nos termos do artigo 18 da LGPD, você pode solicitar confirmação da existência de
              tratamento, acesso, correção, eliminação de dados ou revogação de consentimento pelo
              e-mail <strong className="font-medium text-[#082144]">{FIRM_INFO.dpoEmail}</strong>.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}

export function TermsOfUsePage({ breadcrumbs, onNavigate }: LegalPageProps) {
  return (
    <>
      <PageHeroBanner
        eyebrow="CONFORMIDADE ÉTICA · OAB"
        titlePrefix="Termos"
        titleHighlight="de Uso"
        subtitle="Regras de utilização do site institucional e caráter exclusivamente informativo do conteúdo."
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <section aria-label="Termos de Uso" className="bg-white py-14 lg:py-16">
        <div className="max-w-[880px] mx-auto px-6 space-y-7 text-[15px] font-light leading-[1.72] text-[#2C4156]">
          <section className="space-y-2.5">
            <h2 className="font-display text-[26px] font-normal text-[#082144]">
              1. Caráter Meramente Informativo
            </h2>
            <p>
              Os textos, artigos do blog, perguntas frequentes e materiais disponibilizados neste
              site por <strong className="font-medium text-[#082144]">{FIRM_INFO.name}</strong> possuem caráter
              exclusivamente informativo, em observância ao Código de Ética e Disciplina da OAB e ao
              Provimento nº 205/2021. Nenhuma publicação substitui análise jurídica individualizada
              nem constitui promessa ou garantia de resultado.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-display text-[26px] font-normal text-[#082144]">
              2. Relação Advogado–Cliente
            </h2>
            <p>
              O envio de mensagem pelo formulário de contato ou por WhatsApp não estabelece
              automaticamente relação de mandato ou patrocínio processual, a qual depende de
              atendimento formal, verificação de conflito de interesses e instrumento contratual
              próprio.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-display text-[26px] font-normal text-[#082144]">
              3. Propriedade Intelectual
            </h2>
            <p>
              A marca, os textos institucionais e os artigos autorais publicados pertencem ao
              escritório e a seus respectivos autores identificados, sendo vedada a reprodução para
              fins comerciais sem autorização prévia.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
