import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, FileText, Mail, Scale } from "lucide-react";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Termos e Condições de Uso",
  description: "Termos e condições de uso do portal institucional do Instituto Incentive.",
  path: "/termos-de-uso",
});

const commitments = [
  "Usar o portal de forma lícita, respeitosa e compatível com sua finalidade institucional.",
  "Não tentar interferir na segurança, disponibilidade ou funcionamento dos serviços do site.",
  "Não enviar conteúdo ilícito, discriminatório, fraudulento ou que viole direitos de terceiros pelos canais de contato.",
  "Verificar a fonte e a data dos documentos públicos antes de utilizá-los em decisões, citações ou reproduções.",
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-surface)] text-[var(--brand-text)]">
      <PublicHeader />
      <section id="conteudo-principal" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--brand-orange-dark)]">Uso do portal</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Termos e Condições de Uso.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--brand-muted)]">Estes termos orientam o uso do portal institucional do Instituto Incentive e de seus conteúdos públicos.</p>
          </div>
          <div className="rounded-lg border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6">
            <Scale className="text-[var(--brand-teal)]" size={32} />
            <h2 className="mt-4 text-xl font-bold">Finalidade institucional</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">O portal divulga informações institucionais, projetos, documentos de transparência e canais de contato do {siteConfig.fullName}.</p>
            <p className="mt-4 inline-flex rounded-lg bg-[var(--brand-orange-soft)] px-3 py-2 text-xs font-bold uppercase text-[var(--brand-orange-dark)]">Vigentes a partir de 10 de novembro de 2026</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-[var(--brand-text)] text-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-8 md:grid-cols-3">
          <article className="rounded-lg border border-white/10 bg-white/[0.07] p-5"><FileText className="text-[var(--brand-orange-light)]" size={26} /><h2 className="mt-4 text-lg font-bold">Conteúdo informativo</h2><p className="mt-3 text-sm leading-6 text-[var(--brand-light-text)]">As páginas e documentos têm finalidade informativa, institucional e de transparência.</p></article>
          <article className="rounded-lg border border-white/10 bg-white/[0.07] p-5"><Scale className="text-[var(--brand-orange-light)]" size={26} /><h2 className="mt-4 text-lg font-bold">Atualização responsável</h2><p className="mt-3 text-sm leading-6 text-[var(--brand-light-text)]">O Instituto pode atualizar conteúdos e documentos quando houver revisão institucional, correção ou fato novo.</p></article>
          <article className="rounded-lg border border-white/10 bg-white/[0.07] p-5"><Mail className="text-[var(--brand-orange-light)]" size={26} /><h2 className="mt-4 text-lg font-bold">Canais oficiais</h2><p className="mt-3 text-sm leading-6 text-[var(--brand-light-text)]">Dúvidas sobre o portal ou seus conteúdos podem ser encaminhadas pelo contato institucional.</p></article>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div><p className="text-sm font-semibold uppercase text-[var(--brand-orange-dark)]">Compromisso de uso</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Navegação segura e respeitosa.</h2><p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">Ao utilizar o portal, a pessoa visitante concorda em observar a legislação aplicável e não utilizar os recursos do site para causar dano, disseminar conteúdo ilícito ou comprometer a segurança dos canais do Instituto.</p></div>
        <div className="grid gap-3">{commitments.map((commitment) => (<div key={commitment} className="flex gap-3 rounded-lg border border-[var(--brand-border)] bg-white p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand-teal)]" size={18} /><p className="text-sm font-semibold leading-6 text-[var(--brand-text)]">{commitment}</p></div>))}</div>
      </section>

      <section className="border-y border-[var(--brand-border)] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2">
          <div><p className="text-sm font-semibold uppercase text-[var(--brand-orange-dark)]">Conteúdos e documentos</p><h2 className="mt-3 text-3xl font-bold">Uso responsável das informações.</h2><p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">Marcas, textos, imagens e demais conteúdos do portal são protegidos pela legislação aplicável ou têm uso autorizado ao Instituto. A reprodução deve respeitar autoria, fonte, finalidade e eventuais restrições indicadas no próprio documento.</p></div>
          <div><p className="text-sm font-semibold uppercase text-[var(--brand-orange-dark)]">Links externos</p><h2 className="mt-3 text-3xl font-bold">Sites de terceiros.</h2><p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">Alguns links direcionam para serviços, redes sociais e bases públicas de terceiros. O Instituto não controla suas políticas, disponibilidade ou práticas de privacidade. Consulte os termos e políticas do destino antes de fornecer dados pessoais.</p></div>
        </div>
      </section>

      <section className="bg-[var(--brand-surface)]"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--brand-border)] bg-white p-6"><FileText className="text-[var(--brand-teal)]" size={28} /><h2 className="mt-4 text-xl font-bold">Privacidade</h2><p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">O tratamento de dados pessoais pelo portal é explicado na Política de Privacidade.</p><a href="/privacidade" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-teal)] transition hover:text-[var(--brand-teal-dark)]">Ver Política de Privacidade <ArrowRight size={17} /></a></div>
        <div className="rounded-lg border border-[var(--brand-border)] bg-white p-6"><Mail className="text-[var(--brand-teal)]" size={28} /><h2 className="mt-4 text-xl font-bold">Dúvidas sobre os termos</h2><p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">Para esclarecer dúvidas ou comunicar conteúdo que exija revisão, entre em contato pelo e-mail oficial.</p><a href={`mailto:${siteConfig.email}?subject=D%C3%BAvida%20sobre%20os%20Termos%20de%20Uso`} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--brand-teal)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand-teal-dark)]">{siteConfig.email} <ArrowRight size={17} /></a></div>
      </div></section>
      <PublicFooter />
    </main>
  );
}
