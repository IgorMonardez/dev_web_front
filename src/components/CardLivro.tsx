import type { Livro } from "../interfaces/Livro";
import type { Nota } from "../interfaces/Nota.ts";

interface Props {
  livro: Livro;
}

const LOGO_OPEN_LIBRARY = "/logos/openlibrary-logo-tighter.svg";

const calcularMedia = (notas: Nota[]) => {
  if (notas.length === 0) return 0;
  const total = notas.reduce((soma, n) => soma + parseFloat(n.nota), 0);
  return total / notas.length;
};

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

  const media = calcularMedia(livro.ratings);
  const subtitle = obterSubtituloValido(livro.subtitle);

  return (
    <div className="mx-auto max-w-3xl p-4">
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

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Avaliações de sites parceiros
        </h3>
        {livro.ratings.length === 0 ? (
          <p className="text-gray-600">Nenhuma nota disponível.</p>
        ) : (
          <>
            <p className="mt-1 text-amber-600 font-medium">
              ★ Média geral: {media.toFixed(1)}
            </p>
            <div className="mt-3 space-y-3">
              {livro.ratings.map((nota, index) => {
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
    </div>
  );
};

export default CardLivro;
