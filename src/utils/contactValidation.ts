export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  lgpdConsent: boolean;
  /** Campo oculto anti-spam (honeypot): deve permanecer vazio em envios humanos */
  companyWebsite?: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues | 'antiSpam', string>>;

export interface ContactReceipt {
  protocol: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  submittedAt: string;
}

export const INITIAL_CONTACT_FORM: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  subject: 'Direito Cível',
  message: '',
  lgpdConsent: false,
  companyWebsite: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(
  values: ContactFormValues,
  elapsedMs = 2000
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.companyWebsite && values.companyWebsite.trim().length > 0) {
    errors.antiSpam = 'Envio bloqueado pela verificação automática de segurança.';
    return errors;
  }

  if (elapsedMs < 800) {
    errors.antiSpam = 'Aguarde um instante antes de reenviar o formulário.';
    return errors;
  }

  const name = values.name.trim();
  const email = values.email.trim();
  const phoneDigits = values.phone.replace(/\D/g, '');
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Informe seu nome completo.';
  } else if (name.length < 3) {
    errors.name = 'O nome deve conter ao menos 3 caracteres.';
  }

  if (!email) {
    errors.email = 'Informe um endereço de e-mail válido.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Formato de e-mail inválido.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Informe um telefone ou WhatsApp para retorno.';
  } else if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'Informe DDD e número válido (10 a 13 dígitos).';
  }

  if (!subject) {
    errors.subject = 'Selecione ou informe o assunto do contato.';
  }

  if (!message) {
    errors.message = 'Descreva brevemente sua dúvida ou solicitação de atendimento.';
  } else if (message.length < 15) {
    errors.message = 'Escreva ao menos 15 caracteres para orientar o atendimento inicial.';
  }

  if (!values.lgpdConsent) {
    errors.lgpdConsent =
      'É necessário concordar com o tratamento de dados conforme a Política de Privacidade (LGPD).';
  }

  return errors;
}

export function hasContactErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function formatContactReceipt(
  values: ContactFormValues,
  now: Date = new Date()
): ContactReceipt {
  const suffix = String(now.getTime()).slice(-5);
  return {
    protocol: `CS-${now.getFullYear()}-${suffix}`,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    subject: values.subject.trim(),
    submittedAt: now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}
