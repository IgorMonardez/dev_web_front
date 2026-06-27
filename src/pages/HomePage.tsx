import { useState } from "react";
import BarraDePesquisa from "../components/BarraDePesquisa";
import CardLivroResumo from "../components/CardLivroResumo";
import usePesquisarLivros from "../hooks/livro/usePesquisarLivros";

const HomePage = () => {
  const [termo, setTermo] = useState("");

  const {
    data: livros,
    isPending: pesquisandoLivros,
    isError: erroBuscaLivros,
  } = usePesquisarLivros(termo);


  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
        Pesquisa de Livros
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Encontre preços e avaliações de livros em diversas fontes.
      </p>

      <div className="mx-auto max-w-xl">
        <BarraDePesquisa tratarPesquisa={(t) => setTermo(t)} />
        {pesquisandoLivros && termo.trim() !== "" && <p className="mt-2 text-gray-600">Pesquisando...</p>}
        {erroBuscaLivros && <p className="mt-2 text-red-500">Erro ao buscar livros. Tente novamente.</p>}
        {!pesquisandoLivros && !erroBuscaLivros && termo.trim() !== "" && livros?.length === 0 && (
          <p className="mt-2 text-gray-600">Nenhum livro encontrado para "{termo}".</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {livros?.map((livro) => (
          <CardLivroResumo key={livro.OLid} livro={livro} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
