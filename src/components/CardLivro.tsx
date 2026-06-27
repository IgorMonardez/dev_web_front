import type { Livro } from "../interfaces/Livro";
import type { Nota } from "../interfaces/Nota.ts";
import useRecuperarNotasPorOlid from "../hooks/livro/useRecuperarNotasPorOlid";
import useRecuperarNotaGoodreads from "../hooks/livro/useRecuperarNotaGoodreads";
import useRecuperarPrecos from "../hooks/livro/useRecuperarPrecos";
import { calcularMedia } from "../util/calcularMedia";

interface Props {
  livro: Livro;
}

const LOGO_OPEN_LIBRARY = "/logos/openlibrary-logo-tighter.svg";

const obterSubtituloValido = (subtitle?: string | null) => {
  const valor = subtitle?.trim();
  if (!valor || valor.toUpperCase() === "N/A") return "";
  return valor;
};

const resolverLogo = (nota: Nota) => {
  const logo = nota.logo?.trim();
  const site = nota.site?.trim().toLowerCase();

  if (site === "open library" || logo === "openlibrary-logo-tighter.svg") {
    return LOGO_OPEN_LIBRARY;
  }

  return logo;
};

const CardLivro = ({ livro }: Props) => {
  const { data: notasResponse, isPending: carregandoNotas, isError: erroNotas } = useRecuperarNotasPorOlid(livro.OLid);
  const { data: notasSkoob, isPending: carregandoSkoob } = useRecuperarNotaGoodreads(livro.OLid, livro.title);
  const { data: precosResponse, isPending: carregandoPrecos, isError: erroPrecos } = useRecuperarPrecos(livro.OLid, livro.title);

  const todasAsNotas = [
    ...(notasResponse?.notas ?? []),
    ...(notasSkoob?.notas ?? []),
  ];
  const statusNotas = notasResponse?.status;
  const media = calcularMedia(todasAsNotas);
  const subtitle = obterSubtituloValido(livro.subtitle);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <img
          src={livro.coverId
            ? `https://covers.openlibrary.org/b/id/${livro.coverId}-M.jpg`
            : "/sem-capa.svg"}
          alt={`Capa de ${livro.title}`}
          className="h-36 w-24 object-cover rounded shadow"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{livro.title}</h1>
      {subtitle && (
        <h2 className="text-xl text-gray-600">{subtitle}</h2>
      )}
      <p className="mt-1 text-gray-700">
        <span className="font-semibold">Autor(es):</span> {livro.authors.join(", ")}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Ano:</span> {livro.year}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">OLID:</span> {livro.OLid}
      </p>
      <p className="mt-2">
        <a
          href={livro.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Ver no Open Library
        </a>
      </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Avaliações de sites parceiros
        </h3>
        {carregandoNotas || carregandoSkoob ? (
          <p className="text-gray-400 text-sm">Carregando notas...</p>
        ) : erroNotas ? (
          <p className="text-red-400 text-sm">Não foi possível buscar a nota após 5 tentativas.</p>
        ) : statusNotas === "not_available" && todasAsNotas.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhuma nota disponível.</p>
        ) : (
          <>
            <p className="mt-1 text-amber-600 font-medium">
              ★ Média geral: {media.toFixed(1)}
            </p>
            <div className="mt-3 space-y-3">
              {todasAsNotas.map((nota, index) => {
                const logoSrc = resolverLogo(nota);

                return (
                  <div
                    key={index}
                    className="rounded border border-gray-200 p-3 flex items-start gap-3"
                  >
                    {logoSrc && (
                      <img
                        src={logoSrc}
                        alt={nota.site}
                        className="h-8 w-8 object-contain"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{nota.site}</span>
                        <span className="text-amber-600">
                          {nota.nota} / {nota.notaMaxima}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Coletado em: {new Date(nota.dataColeta).toLocaleDateString()}
                      </p>
                      <a
                        href={nota.urlPagina}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Ver avaliação completa
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Preços</h3>
        {carregandoPrecos ? (
          <p className="text-gray-400 text-sm">Carregando preços...</p>
        ) : erroPrecos ? (
          <p className="text-red-400 text-sm">Não foi possível buscar preços.</p>
        ) : precosResponse?.status === "not_available" ? (
          <p className="text-gray-500 text-sm">Nenhum preço encontrado.</p>
        ) : (
          <div className="mt-2 space-y-2">
            {precosResponse?.precos.slice(0, 3).map((preco, index) => (
              <div key={index} className="flex items-center justify-between rounded border border-gray-200 p-2">
                <span className="font-medium text-green-700">
                  R$ {preco.preco.toFixed(2).replace(".", ",")}
                </span>
                <a
                  href={preco.urlPagina}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver no {preco.site}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardLivro;
