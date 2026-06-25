import { Link, useParams } from "react-router-dom";
import useRecuperarLivroPorIsbn from "../hooks/livro/useRecuperarLivroPorIsbn";

const LivroPage = () => {
  const { isbn } = useParams();

  const {
    data: livro,
    isPending: recuperandoLivro,
    error: errorRecuperarLivro,
  } = useRecuperarLivroPorIsbn(isbn ?? "");

  if (errorRecuperarLivro) throw errorRecuperarLivro;
  if (recuperandoLivro) return <p className="text-gray-600">Recuperando livro...</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/" className="text-sm text-blue-700 hover:underline">
        ← Voltar para a pesquisa
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-gray-800">{livro.title}</h1>
      <p className="mt-1 text-lg text-gray-600">{livro.authors.join(", ")}</p>
      {/*<p className="mt-1 text-sm text-gray-500">ISBN: {livro.isbn}</p>*/}

      <section className="mt-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">Preços</h2>
        <ul className="flex flex-wrap gap-2">
          {livro.preco.map((preco, i) => (
            <li
              key={i}
              className="rounded-lg bg-green-100 px-3 py-1 text-green-800"
            >
              R$ {preco.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">Avaliações</h2>
        <ul className="flex flex-wrap gap-2">
          {livro.rating.map((rating, i) => (
            <li
              key={i}
              className="rounded-lg bg-amber-100 px-3 py-1 text-amber-800"
            >
              ★ {rating.toFixed(1)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LivroPage;
