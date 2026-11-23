import React, { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { PRACTICE_AREAS } from '../data/practiceAreas';
import {
  INITIAL_CONTACT_FORM,
  formatContactReceipt,
  hasContactErrors,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
  type ContactReceipt,
} from '../utils/contactValidation';
import { trackFormSubmission } from '../utils/analytics';

interface ContactFormCardProps {
  initialSubject?: string;
  onNavigate: (path: string) => void;
}

export function ContactFormCard({ initialSubject, onNavigate }: ContactFormCardProps) {
  const mountTimeRef = useRef<number>(Date.now());
  const [values, setValues] = useState<ContactFormValues>({
    ...INITIAL_CONTACT_FORM,
    subject: initialSubject || INITIAL_CONTACT_FORM.subject,
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [receipt, setReceipt] = useState<ContactReceipt | null>(null);

  const handleChange = <K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    if (submittedOnce) {
      setErrors(validateContactForm(updated, Date.now() - mountTimeRef.current));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedOnce(true);
    const elapsed = Date.now() - mountTimeRef.current;
    const validationErrors = validateContactForm(values, elapsed);
    setErrors(validationErrors);
    if (hasContactErrors(validationErrors)) {
      return;
    }

    const confirmed = formatContactReceipt(values);
    setReceipt(confirmed);
    trackFormSubmission(confirmed.subject);
  };

  const handleReset = () => {
    mountTimeRef.current = Date.now();
    setValues({
      ...INITIAL_CONTACT_FORM,
      subject: initialSubject || INITIAL_CONTACT_FORM.subject,
    });
    setErrors({});
    setSubmittedOnce(false);
    setReceipt(null);
  };

  const subjectOptions = [
    ...PRACTICE_AREAS.map((area) => area.title),
    'Atendimento Geral / Outro Assunto',
  ];

  return (
    <div className="bg-[#2C4156] rounded-xl px-6 sm:px-10 py-9 sm:py-11 shadow-[0_24px_54px_rgba(8,33,68,0.16)] border border-[#7F99B2]/20">
      <div className="text-center mb-7">
        <h2 className="font-display text-[30px] sm:text-[34px] font-normal text-white">
          Envie sua Mensagem
        </h2>
        <p className="text-[14px] font-light text-[#D2D7DB] mt-1.5 max-w-[540px] mx-auto">
          Canal oficial para agendamento de atendimento presencial em Bauru/SP ou por
          videoconferência.
        </p>
      </div>

      {receipt ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-[#082144] text-white rounded-[6px] p-6 sm:p-8 border border-[#7F99B2]/25"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <CheckCircle2 className="w-7 h-7 text-[#7F99B2] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="font-display text-[24px] font-normal text-white mb-1.5">
                Solicitação de Atendimento Registrada
              </h3>
              <p className="text-[14px] font-light text-[#D2D7DB] leading-relaxed mb-4">
                Prezado(a) <strong className="font-medium text-white">{receipt.name}</strong>, sua mensagem
                sobre <strong className="font-medium text-[#7F99B2]">{receipt.subject}</strong> foi registrada.
                Nossa equipe retornará em horário comercial pelos canais informados ({receipt.email}{' '}
                ou {receipt.phone}).
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-[#D2D7DB] border-t border-[#7F99B2]/20 pt-4 mb-5 tabular-nums">
                <span>
                  Protocolo: <strong className="font-medium text-white">{receipt.protocol}</strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>Registrado às {receipt.submittedAt}</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#F7F7F7] hover:bg-white text-[#082144] text-[13px] font-medium px-5 py-2.5 rounded-[4px] transition-colors cursor-pointer"
              >
                Enviar nova mensagem
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          {/* Campo anti-spam (honeypot) oculto para leitores de tela e usuários */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-company-website">Não preencha este campo</label>
            <input
              id="contact-company-website"
              name="companyWebsite"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.companyWebsite || ''}
              onChange={(e) => handleChange('companyWebsite', e.target.value)}
            />
          </div>

          {errors.antiSpam && (
            <p
              role="alert"
              className="flex items-center gap-2 text-[12.5px] font-medium text-[#2C4156] bg-white px-3.5 py-2 rounded-[4px]"
            >
              <AlertCircle className="w-4 h-4 text-[#991B1B] shrink-0" aria-hidden="true" />
              <span>{errors.antiSpam}</span>
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-[12px] font-semibold text-white mb-1.5">
                Nome completo*
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Seu nome completo"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className="w-full bg-white text-[#2C4156] placeholder:text-[#39586D]/75 text-[13.5px] px-4 py-3 rounded-[4px] border border-transparent focus:border-[#2C4156] focus:outline-none"
              />
              {errors.name && (
                <p
                  id="contact-name-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-[#2C4156] bg-white/95 px-2.5 py-1 rounded-[4px]"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-[#991B1B] shrink-0" aria-hidden="true" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[12px] font-semibold text-white mb-1.5">
                E-mail*
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seuemail@exemplo.com.br"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className="w-full bg-white text-[#2C4156] placeholder:text-[#39586D]/75 text-[13.5px] px-4 py-3 rounded-[4px] border border-transparent focus:border-[#2C4156] focus:outline-none"
              />
              {errors.email && (
                <p
                  id="contact-email-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-[#2C4156] bg-white/95 px-2.5 py-1 rounded-[4px]"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-[#991B1B] shrink-0" aria-hidden="true" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-[12px] font-semibold text-white mb-1.5">
                Telefone / WhatsApp*
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="(14) 90000-0000"
                value={values.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                className="w-full bg-white text-[#2C4156] placeholder:text-[#39586D]/75 text-[13.5px] px-4 py-3 rounded-[4px] border border-transparent focus:border-[#2C4156] focus:outline-none"
              />
              {errors.phone && (
                <p
                  id="contact-phone-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-[#2C4156] bg-white/95 px-2.5 py-1 rounded-[4px]"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-[#991B1B] shrink-0" aria-hidden="true" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-[12px] font-semibold text-white mb-1.5">
                Assunto / Área de Interesse*
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={values.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                aria-invalid={Boolean(errors.subject)}
                className="w-full bg-white text-[#2C4156] text-[13.5px] px-4 py-3 rounded-[4px] border border-transparent focus:border-[#2C4156] focus:outline-none"
              >
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
                {!subjectOptions.includes(values.subject) && values.subject && (
                  <option value={values.subject}>{values.subject}</option>
                )}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-[12px] font-semibold text-white mb-1.5">
              Mensagem*
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Descreva brevemente sua dúvida ou solicitação. Evite inserir dados sensíveis ou sigilosos neste primeiro contato."
              value={values.message}
              onChange={(e) => handleChange('message', e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className="w-full bg-white text-[#2C4156] placeholder:text-[#39586D]/75 text-[13.5px] px-4 py-3 rounded-[4px] border border-transparent focus:border-[#2C4156] focus:outline-none"
            />
            {errors.message && (
              <p
                id="contact-message-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-[#2C4156] bg-white/95 px-2.5 py-1 rounded-[4px]"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#991B1B] shrink-0" aria-hidden="true" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          <div className="bg-[#082144]/35 rounded-[4px] p-3.5 border border-[#7F99B2]/25">
            <label className="flex items-start gap-3 cursor-pointer text-[12.5px] leading-relaxed text-white">
              <input
                id="contact-lgpd-consent"
                type="checkbox"
                checked={values.lgpdConsent}
                onChange={(e) => handleChange('lgpdConsent', e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#2C4156] shrink-0 cursor-pointer"
              />
              <span>
                Declaro que li e concordo com a{' '}
                <a
                  href="/politica-de-privacidade"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/politica-de-privacidade');
                  }}
                  className="underline font-semibold hover:text-[#D2D7DB]"
                >
                  Política de Privacidade
                </a>{' '}
                e autorizo o tratamento dos dados informados exclusivamente para retorno deste
                contato, nos termos da LGPD (Lei nº 13.709/2018).
              </span>
            </label>
            {errors.lgpdConsent && (
              <p
                role="alert"
                className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-[#2C4156] bg-white/95 px-2.5 py-1 rounded-[4px]"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#991B1B] shrink-0" aria-hidden="true" />
                <span>{errors.lgpdConsent}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#082144] hover:bg-[#39586D] text-white text-[14px] font-medium py-3.5 px-6 rounded-[4px] border border-[#7F99B2]/35 transition-colors cursor-pointer"
          >
            Solicitar Atendimento
          </button>
        </form>
      )}
    </div>
  );
}
