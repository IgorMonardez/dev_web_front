import { Link, useLocation, useParams } from "react-router-dom";
import type { Livro } from "../interfaces/Livro";
import CardLivro from "../components/CardLivro";
import useRecuperarLivroPorOlid from "../hooks/livro/useRecuperarLivroPorOlid";

const LivroPage = () => {
  const { olid } = useParams();
  const location = useLocation();
  const livroDoState = location.state?.livro as Livro | undefined;

  // Caminho normal: o livro chega pela navegação (state) a partir da pesquisa.
  // Fallback (F5/URL direta): recupera por OLID. Enquanto o backend de detalhe
  // não existe, recuperarLivroPorOlid lê do mock.
  const {
    data: livroRecuperado,
    isPending: recuperandoLivro,
  } = useRecuperarLivroPorOlid(livroDoState ? "" : (olid ?? ""));

  const livro = livroDoState ?? livroRecuperado;

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/" className="text-sm text-blue-700 hover:underline">
        ← Voltar para a pesquisa
      </Link>

      {livro ? (
        <CardLivro livro={livro} />
      ) : recuperandoLivro && !livroDoState ? (
        <p className="mt-4 text-gray-600">Recuperando livro...</p>
      ) : (
        <p className="mt-4 text-gray-600">
          Não foi possível carregar este livro. Abra-o a partir da pesquisa.
        </p>
      )}
    </div>
  );
};

export default LivroPage;
