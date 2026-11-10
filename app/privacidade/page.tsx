import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do Instituto Incentive: como tratamos dados de contato, segurança, cookies e solicitações de titulares.",
  path: "/privacidade",
});

const privacyTopics = [
  {
    title: "Dados de contato",
    text: "No formulário, são informados nome, e-mail, assunto e mensagem. Esses dados são enviados voluntariamente por quem entra em contato.",
  },
  {
    title: "Finalidades",
    text: "Usamos essas informações para responder demandas, encaminhar contatos institucionais e manter o histórico necessário ao atendimento.",
  },
  {
    title: "Segurança do formulário",
    text: "O formulário utiliza o Cloudflare Turnstile para reduzir envios automatizados e abuso dos canais de contato.",
  },
  {
    title: "Transparência",
    text: "Documentos são publicados quando houver finalidade institucional ou obrigação aplicável, com revisão de privacidade antes da divulgação.",
  },
];

const rights = [
  "Confirmar a existência de tratamento de dados pessoais.",
  "Solicitar acesso e correção de dados incompletos, inexatos ou desatualizados.",
  "Solicitar informações sobre compartilhamento, quando aplicável.",
  "Solicitar eliminação, bloqueio ou revisão quando cabível, observadas as obrigações legais de guarda.",
  "Revogar consentimento quando esta for a base aplicável ao tratamento.",
];

const serviceProviders = [
  { title: "Vercel", text: "Hospedagem do site e recursos técnicos de desempenho e medição agregada." },
  { title: "Cloudflare Turnstile", text: "Verificação de segurança para prevenir abuso no formulário de contato." },
  { title: "Resend", text: "Encaminhamento da mensagem do formulário ao canal institucional de atendimento." },
  {
    title: "Google Analytics ou Tag Manager",
    text: "Recursos opcionais que só são carregados quando estiverem configurados e houver aceite no aviso de cookies.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-surface)] text-[var(--brand-text)]">
      <PublicHeader />

      <section id="conteudo-principal" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--brand-orange-dark)]">
              Privacidade e proteção de dados
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              Política de Privacidade do Instituto Incentive.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--brand-muted)]">
              Esta política explica como o Instituto trata dados pessoais recebidos pelo site e pelos canais de contato
              institucional.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6">
            <ShieldCheck className="text-[var(--brand-teal)]" size={32} />
            <h2 className="mt-4 text-xl font-bold">Controlador e canal de contato</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
              O controlador dos dados tratados pelo site é o {siteConfig.fullName}, CNPJ {siteConfig.cnpj}. Para
              solicitações de privacidade, utilize o e-mail institucional indicado nesta página.
            </p>
            <p className="mt-4 inline-flex rounded-lg bg-[var(--brand-orange-soft)] px-3 py-2 text-xs font-bold uppercase text-[var(--brand-orange-dark)]">
              Vigente a partir de 10 de novembro de 2026
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-[var(--brand-text)] text-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-8 md:grid-cols-4">
          {privacyTopics.map((topic) => (
            <article key={topic.title} className="rounded-lg border border-white/10 bg-white/[0.07] p-5">
              <LockKeyhole className="text-[var(--brand-orange-light)]" size={26} />
              <h2 className="mt-4 text-lg font-bold">{topic.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--brand-light-text)]">{topic.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--brand-orange-dark)]">Tratamento de dados</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Quando e por que tratamos informações.</h2>
          <div className="mt-4 grid gap-4 text-base leading-8 text-[var(--brand-muted)]">
            <p>
              O tratamento ocorre quando a pessoa preenche o formulário de contato, navega no site ou usa um canal
              institucional divulgado pelo Instituto. A finalidade é responder à solicitação, proteger o serviço contra
              uso indevido e aprimorar a comunicação institucional.
            </p>
            <p>
              As mensagens do formulário são encaminhadas ao canal institucional de atendimento. O prazo de guarda é
              definido conforme a finalidade do contato e eventuais obrigações legais ou de prestação de contas. A
              política interna de retenção está em formalização pelo Instituto.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {serviceProviders.map((provider) => (
            <div key={provider.title} className="rounded-lg border border-[var(--brand-border)] bg-white p-4">
              <h3 className="text-sm font-bold text-[var(--brand-text)]">{provider.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--brand-muted)]">{provider.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--brand-orange-dark)]">Cookies e medições</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Você decide sobre medições opcionais.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
              O site mantém recursos técnicos necessários ao funcionamento e à segurança. Medições opcionais do Google
              Analytics ou Google Tag Manager dependem de aceite no aviso de cookies e só são carregadas se estiverem
              configuradas pelo Instituto.
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
              Não utilizamos, neste portal, publicidade comportamental, rede de afiliados ou Google AdSense. Caso isso
              mude, esta política e o aviso de cookies deverão ser revisados antes da ativação.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6">
            <h3 className="text-lg font-bold">Como alterar sua escolha</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
              A escolha é salva no navegador. Para alterar a decisão, limpe os dados de navegação deste site no seu
              navegador e acesse novamente a página para visualizar o aviso de cookies.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--brand-orange-dark)]">Direitos do titular</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Como solicitar informações ou correções.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
              O pedido deve ser enviado pelos canais oficiais. Poderemos solicitar informações adicionais para confirmar
              a identidade da pessoa solicitante e proteger seus dados contra acesso indevido.
            </p>
          </div>

          <div className="grid gap-3">
            {rights.map((right) => (
              <div key={right} className="flex gap-3 rounded-lg border border-[var(--brand-border)] bg-white p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand-teal)]" size={18} />
                <p className="text-sm font-semibold leading-6 text-[var(--brand-text)]">{right}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-[var(--brand-tint)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 md:grid-cols-2">
          <div className="rounded-lg border border-[var(--brand-border)] bg-white p-6">
            <FileText className="text-[var(--brand-teal)]" size={28} />
            <h2 className="mt-4 text-xl font-bold">Documentos públicos</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
              A divulgação de documentos institucionais passa por revisão de finalidade e privacidade. Consulte o Portal
              da Transparência para acessar informações públicas do Instituto.
            </p>
            <Link href="/transparencia" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-teal)] transition hover:text-[var(--brand-teal-dark)]">
              Ver Portal da Transparência
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rounded-lg border border-[var(--brand-border)] bg-white p-6">
            <Mail className="text-[var(--brand-teal)]" size={28} />
            <h2 className="mt-4 text-xl font-bold">Solicitações de privacidade</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
              Para dúvidas, atualização de dados ou exercício de direitos, escreva para o canal institucional de
              atendimento com o assunto “Privacidade e proteção de dados”.
            </p>
            <a href={`mailto:${siteConfig.email}?subject=Privacidade%20e%20prote%C3%A7%C3%A3o%20de%20dados`} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--brand-teal)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand-teal-dark)]">
              {siteConfig.email}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
