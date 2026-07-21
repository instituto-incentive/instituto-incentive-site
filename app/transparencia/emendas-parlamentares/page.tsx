"use client";

import { Download, ExternalLink, FileText, Filter, Info, Mail, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

type EmendaRegistro = {
  proponente: string;
  parlamentar: string;
  modalidade: string;
  objeto: string;
  orgaoConcedente: string;
  instrumento: string;
  emenda: string;
  ano: number;
  valor: string;
  assinatura: string;
  desembolso: string;
  ultimoDesembolso: string;
  situacao: string;
  ultimaAtualizacao: string;
  responsavel: string;
};

const registros: EmendaRegistro[] = [
  {
    proponente: "Instituto Incentive",
    parlamentar: "Não se aplica",
    modalidade: "Emenda parlamentar",
    objeto: "Declaração institucional de inexistência de recebimento de emendas parlamentares no exercício de 2026.",
    orgaoConcedente: "Não houve órgão concedente",
    instrumento: "Sem instrumento",
    emenda: "Sem emenda",
    ano: 2026,
    valor: "R$ 0,00",
    assinatura: "Não se aplica",
    desembolso: "R$ 0,00",
    ultimoDesembolso: "Não se aplica",
    situacao: "Não houve recebimento de emendas parlamentares",
    ultimaAtualizacao: "19/06/2026",
    responsavel: "Pedro Gerard de Souza Jucá - Diretor Executivo",
  },
  {
    proponente: "Instituto Incentive",
    parlamentar: "Não se aplica",
    modalidade: "Emenda parlamentar",
    objeto: "Declaração institucional de inexistência de recebimento de emendas parlamentares no exercício de 2025.",
    orgaoConcedente: "Não houve órgão concedente",
    instrumento: "Sem instrumento",
    emenda: "Sem emenda",
    ano: 2025,
    valor: "R$ 0,00",
    assinatura: "Não se aplica",
    desembolso: "R$ 0,00",
    ultimoDesembolso: "Não se aplica",
    situacao: "Não houve recebimento de emendas parlamentares",
    ultimaAtualizacao: "19/06/2026",
    responsavel: "Pedro Gerard de Souza Jucá - Diretor Executivo",
  },
  {
    proponente: "Instituto Incentive",
    parlamentar: "Não se aplica",
    modalidade: "Emenda parlamentar",
    objeto: "Declaração institucional de inexistência de recebimento de emendas parlamentares no exercício de 2024.",
    orgaoConcedente: "Não houve órgão concedente",
    instrumento: "Sem instrumento",
    emenda: "Sem emenda",
    ano: 2024,
    valor: "R$ 0,00",
    assinatura: "Não se aplica",
    desembolso: "R$ 0,00",
    ultimoDesembolso: "Não se aplica",
    situacao: "Não houve recebimento de emendas parlamentares",
    ultimaAtualizacao: "19/06/2026",
    responsavel: "Pedro Gerard de Souza Jucá - Diretor Executivo",
  },
];

const anos = Array.from(new Set(registros.map((registro) => registro.ano))).sort((a, b) => b - a);
const situacoes = Array.from(new Set(registros.map((registro) => registro.situacao)));

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const requestSubject = encodeURIComponent("Solicitação sobre emendas parlamentares");
const requestBody = encodeURIComponent(
  "Olá, gostaria de solicitar informações/documentos sobre a página de emendas parlamentares do Instituto Incentive.",
);
const requestHref = `mailto:contato@institutoincentive.org.br?subject=${requestSubject}&body=${requestBody}`;

export default function EmendasParlamentaresPage() {
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("todos");
  const [selectedStatus, setSelectedStatus] = useState("todas");

  const filteredRecords = useMemo(() => {
    const term = normalize(search.trim());

    return registros.filter((registro) => {
      const matchesYear = selectedYear === "todos" || String(registro.ano) === selectedYear;
      const matchesStatus = selectedStatus === "todas" || registro.situacao === selectedStatus;
      const searchableText = normalize(Object.values(registro).join(" "));

      return matchesYear && matchesStatus && (!term || searchableText.includes(term));
    });
  }, [search, selectedStatus, selectedYear]);

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-[#004f4f] px-6 py-16 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Transparência institucional
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight md:text-6xl">Emendas parlamentares</h1>
              <p className="max-w-2xl text-lg leading-8 text-white/85">
                Consulte a situação dos recursos de emendas parlamentares, instrumentos, valores, desembolsos e documentos de referência do Instituto Incentive.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-white/20 bg-white/10 p-5 text-sm text-white/90 md:min-w-80">
            <div className="flex items-start gap-3">
              <Info className="mt-1 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
              <p>
                Atualmente, os registros publicados indicam inexistência de recebimento de emendas parlamentares nos exercícios listados.
              </p>
            </div>
            <a className="inline-flex items-center gap-2 font-bold text-amber-200 underline-offset-4 hover:underline" href={requestHref}>
              Solicitar informações complementares <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ["Total recebido", "R$ 0,00"],
            ["Registros publicados", String(registros.length)],
            ["Anos cobertos", `${anos[anos.length - 1]}-${anos[0]}`],
            ["Última atualização", "19/06/2026"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-black text-[#004f4f]">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#004f4f]">
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filtrar registros
            </div>
            <div className="grid gap-3 lg:grid-cols-[1fr_220px_320px_auto]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <span className="sr-only">Pesquisar</span>
                <input
                  className="h-12 w-full rounded-md border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none ring-[#008080]/20 transition focus:border-[#008080] focus:ring-4"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por órgão, objeto, instrumento ou situação"
                  value={search}
                />
              </label>

              <label className="block">
                <span className="sr-only">Ano</span>
                <select
                  className="h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-bold outline-none ring-[#008080]/20 transition focus:border-[#008080] focus:ring-4"
                  onChange={(event) => setSelectedYear(event.target.value)}
                  value={selectedYear}
                >
                  <option value="todos">Todos os anos</option>
                  {anos.map((ano) => (
                    <option key={ano} value={ano}>
                      {ano}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="sr-only">Situação</span>
                <select
                  className="h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-bold outline-none ring-[#008080]/20 transition focus:border-[#008080] focus:ring-4"
                  onChange={(event) => setSelectedStatus(event.target.value)}
                  value={selectedStatus}
                >
                  <option value="todas">Todas as situações</option>
                  {situacoes.map((situacao) => (
                    <option key={situacao} value={situacao}>
                      {situacao}
                    </option>
                  ))}
                </select>
              </label>

              <button
                className="h-12 rounded-md bg-[#004f4f] px-5 text-sm font-black text-white transition hover:bg-[#006b6b]"
                onClick={() => {
                  setSearch("");
                  setSelectedYear("todos");
                  setSelectedStatus("todas");
                }}
                type="button"
              >
                Limpar filtro
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="hidden overflow-x-auto xl:block">
              <table className="min-w-[1280px] border-collapse text-left text-sm">
                <thead className="bg-[#00639a] text-xs font-black uppercase tracking-wide text-white">
                  <tr>
                    {[
                      "Proponente",
                      "Parlamentar",
                      "Modalidade",
                      "Objeto",
                      "Órgão concedente",
                      "Nº instrumento",
                      "Nº emenda",
                      "Ano",
                      "Valor emenda",
                      "Data assinatura",
                      "Desembolso até momento",
                      "Data último desembolso",
                      "Situação",
                      "Arquivo",
                    ].map((header) => (
                      <th key={header} className="border-r border-white/20 px-4 py-4 align-top last:border-r-0">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((registro) => (
                    <tr key={registro.ano} className="border-t border-slate-200 odd:bg-slate-50/70">
                      <td className="px-4 py-4 font-bold text-[#004f4f]">{registro.proponente}</td>
                      <td className="px-4 py-4">{registro.parlamentar}</td>
                      <td className="px-4 py-4">{registro.modalidade}</td>
                      <td className="max-w-md px-4 py-4 leading-6">{registro.objeto}</td>
                      <td className="px-4 py-4">{registro.orgaoConcedente}</td>
                      <td className="px-4 py-4">{registro.instrumento}</td>
                      <td className="px-4 py-4">{registro.emenda}</td>
                      <td className="px-4 py-4 font-bold">{registro.ano}</td>
                      <td className="px-4 py-4 font-bold">{registro.valor}</td>
                      <td className="px-4 py-4">{registro.assinatura}</td>
                      <td className="px-4 py-4 font-bold">{registro.desembolso}</td>
                      <td className="px-4 py-4">{registro.ultimoDesembolso}</td>
                      <td className="px-4 py-4 text-[#004f4f]">{registro.situacao}</td>
                      <td className="px-4 py-4">
                        <a className="inline-flex items-center gap-2 font-bold text-[#00639a] hover:underline" href={requestHref}>
                          Solicitar <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 xl:hidden">
              {filteredRecords.map((registro) => (
                <article key={registro.ano} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{registro.ano}</p>
                      <h2 className="mt-1 text-lg font-black text-[#004f4f]">{registro.modalidade}</h2>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">{registro.valor}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-700">{registro.objeto}</p>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-black text-slate-500">Situação</dt>
                      <dd>{registro.situacao}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-slate-500">Órgão concedente</dt>
                      <dd>{registro.orgaoConcedente}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-slate-500">Última atualização</dt>
                      <dd>{registro.ultimaAtualizacao}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-slate-500">Responsável</dt>
                      <dd>{registro.responsavel}</dd>
                    </div>
                  </dl>
                  <a className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#004f4f] px-4 py-3 text-sm font-black text-white" href={requestHref}>
                    Solicitar documento <Download className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>

            {filteredRecords.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-6 py-14 text-center text-slate-600">
                <FileText className="h-10 w-10 text-slate-400" aria-hidden="true" />
                <p className="font-bold">Nenhum registro encontrado para os filtros selecionados.</p>
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-[#004f4f]/20 bg-[#004f4f] p-6 text-white">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-2xl font-black">Solicitação de informações</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/85">
                  Pedidos, correções ou complementações sobre emendas parlamentares podem ser encaminhados ao canal oficial do Instituto Incentive.
                </p>
              </div>
              <a className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-[#004f4f] transition hover:bg-amber-100" href={requestHref}>
                contato@institutoincentive.org.br <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
