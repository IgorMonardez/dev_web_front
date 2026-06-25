import { useState } from "react";
import BarraDePesquisa from "../components/BarraDePesquisa";
import CardLivro from "../components/CardLivro";
import usePesquisarLivros from "../hooks/livro/usePesquisarLivros";

const HomePage = () => {
  const [termo, setTermo] = useState("");

  const {
    data: livros,
    isFetching: pesquisandoLivros,
    error: errorPesquisarLivros,
  } = usePesquisarLivros(termo);

  if (errorPesquisarLivros) throw errorPesquisarLivros;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
        Pesquisa de Livros
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Encontre preços e avaliações de livros em diversas fontes.
      </p>

      <BarraDePesquisa tratarPesquisa={(t) => setTermo(t)} />

      <div className="mt-6 flex flex-col gap-3">
        {pesquisandoLivros && <p className="text-gray-600">Pesquisando...</p>}

        {!pesquisandoLivros && termo.trim() !== "" && livros?.length === 0 && (
          <p className="text-gray-600">Nenhum livro encontrado para "{termo}".</p>
        )}

        {livros?.map((livro) => (
          <CardLivro key={livro.OLid} livro={livro} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
