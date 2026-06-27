import { useQuery } from "@tanstack/react-query";
import type { Livro } from "../../interfaces/Livro";
import UseAPI from "../useAPI.ts";



const usePesquisarLivros = (termo: string) => {
  const { recuperar } =UseAPI<Livro>("/livros");

  return useQuery({
    queryKey: ["livros", termo],
    queryFn: () => recuperar({q: termo}),
    enabled: termo.trim() !== "",
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default usePesquisarLivros;
