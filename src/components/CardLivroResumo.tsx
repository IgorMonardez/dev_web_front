import { Link } from "react-router-dom";
import type { Livro } from "../interfaces/Livro";
import useRecuperarNotasPorOlid from "../hooks/livro/useRecuperarNotasPorOlid";
import { calcularMedia } from "../util/calcularMedia";

interface Props {
  livro: Livro;
}

const CardLivroResumo = ({ livro }: Props) => {
  const { data: notasResponse, isPending: carregandoNotas } =
    useRecuperarNotasPorOlid(livro.OLid);

  const notas = notasResponse?.notas ?? [];
  const media = calcularMedia(notas);

  return (
    <Link
      to={"/livros/" + livro.OLid}
      state={{ livro }}
      className="card-resumo block rounded-lg p-4"
    >
      <div className="flex gap-4">
        <img
          src={livro.coverId
            ? `https://covers.openlibrary.org/b/id/${livro.coverId}-M.jpg`
            : "/sem-capa.svg"}
          alt={`Capa de ${livro.title}`}
          className="h-36 w-24 object-cover rounded shadow"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{livro.title}</h2>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">Autor(es):</span> {livro.authors.join(", ")}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Ano:</span> {livro.year}
          </p>
          {carregandoNotas ? (
            <p className="mt-2 text-sm text-gray-400">Carregando nota...</p>
          ) : notas.length > 0 ? (
            <p className="mt-2 font-medium text-amber-600">★ {media.toFixed(1)}</p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">Sem nota disponível</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardLivroResumo;
