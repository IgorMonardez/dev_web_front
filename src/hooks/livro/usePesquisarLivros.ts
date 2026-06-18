import { useQuery } from "@tanstack/react-query";
import type { Livro } from "../../interfaces/Livro";
import { livrosMock } from "../../util/livrosMock";

const pesquisarLivros = async (termo: string): Promise<Livro[]> => {
  // TODO: trocar pelo useAPI<Livro>(URL_LIVROS).recuperar({ q: termo })
  // quando o backend de webscraping existir.
  const termoNormalizado = termo.trim().toLowerCase();
  if (termoNormalizado === "") return [];

  return livrosMock.filter((livro) => {
    const titulo = livro.titulo.toLowerCase();
    const autores = livro.autor.join(" ").toLowerCase();
    return titulo.includes(termoNormalizado) || autores.includes(termoNormalizado);
  });
};

const usePesquisarLivros = (termo: string) => {
  return useQuery({
    queryKey: ["livros", termo],
    queryFn: () => pesquisarLivros(termo),
    enabled: termo.trim() !== "", // só busca quando há termo
  });
};

export default usePesquisarLivros;
