import { useState } from "react";
import BarraDePesquisa from "../components/BarraDePesquisa";
import CardLivroResumo from "../components/CardLivroResumo";
import LoadingLivros from "../components/LoadingLivros";
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
      <h1 className="mb-2 text-center text-3xl font-bold text-[#4a2f1b]">
        📚 Acervo de Livros
      </h1>
      <p className="mb-6 text-center text-[#7b4f2c]">
        Encontre preços e avaliações de livros em diversas fontes.
      </p>

      <div className="mx-auto max-w-xl">
        <BarraDePesquisa tratarPesquisa={(t) => setTermo(t)} />
        {pesquisandoLivros && termo.trim() !== "" && <LoadingLivros />}
        {erroBuscaLivros && <p className="mt-2 text-red-600">Erro ao buscar livros. Tente novamente.</p>}
        {!pesquisandoLivros && !erroBuscaLivros && termo.trim() !== "" && livros?.length === 0 && (
          <p className="mt-2 text-[#7b4f2c]">Nenhum livro encontrado para "{termo}".</p>
        )}
      </div>

      <div className="prateleira mt-6 grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">

        {livros?.map((livro) => (
          <CardLivroResumo key={livro.OLid} livro={livro} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
