import { Link } from "react-router-dom";
import type { Livro } from "../interfaces/Livro";

interface Props {
  livro: Livro;
}

const calcularMedia = (valores: number[]) => {
  if (valores.length === 0) return 0;
  return valores.reduce((soma, valor) => soma + valor, 0) / valores.length;
};

const CardLivro = ({ livro }: Props) => {
  const menorPreco = Math.min(...livro.preco);
  const ratingMedio = calcularMedia(livro.rating);

  return (
    <Link
      to={`/livros/${livro.isbn}`}
      className="block rounded-lg border-2 border-gray-200 p-4 transition hover:border-gray-400 hover:shadow"
    >
      <h2 className="text-lg font-semibold text-gray-800">{livro.titulo}</h2>
      <p className="text-sm text-gray-600">{livro.autor.join(", ")}</p>
      <div className="mt-2 flex justify-between text-sm">
        <span className="font-medium text-green-700">
          A partir de R$ {menorPreco.toFixed(2)}
        </span>
        <span className="text-amber-600">★ {ratingMedio.toFixed(1)}</span>
      </div>
    </Link>
  );
};

export default CardLivro;
