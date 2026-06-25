import { Link, useParams } from "react-router-dom";
import CardLivro from "../components/CardLivro";
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
    <div className="mx-auto max-w-3xl">
      <Link to="/" className="text-sm text-blue-700 hover:underline">
        ← Voltar para a pesquisa
      </Link>

      <CardLivro livro={livro} />
    </div>
  );
};

export default LivroPage;
