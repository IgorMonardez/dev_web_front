import { useQuery } from "@tanstack/react-query";
import type { Livro } from "../../interfaces/Livro";
import UseAPI from "../useAPI.ts";



const usePesquisarLivros = (termo: string) => {
  const { recuperar } =UseAPI<Livro>("/livros");

  return useQuery({
    queryKey: ["livros"],
    queryFn: () => recuperar({q: termo}),
    enabled: termo.trim() !== "", // só busca quando há termo
  });
};

export default usePesquisarLivros;
