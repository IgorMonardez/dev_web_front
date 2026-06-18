import { useQuery } from "@tanstack/react-query";
import type { Livro } from "../../interfaces/Livro";
import { livrosMock } from "../../util/livrosMock";

const recuperarLivroPorIsbn = async (isbn: string): Promise<Livro> => {
  // TODO: trocar pelo useAPI<Livro>(URL_LIVROS).recuperarPorId(isbn)
  // quando o backend de webscraping existir.
  const livro = livrosMock.find((l) => l.isbn === isbn);
  if (!livro) throw new Error("Livro não encontrado para o ISBN: " + isbn);
  return livro;
};

const useRecuperarLivroPorIsbn = (isbn: string) => {
  return useQuery({
    queryKey: ["livro", isbn],
    queryFn: () => recuperarLivroPorIsbn(isbn),
  });
};

export default useRecuperarLivroPorIsbn;
