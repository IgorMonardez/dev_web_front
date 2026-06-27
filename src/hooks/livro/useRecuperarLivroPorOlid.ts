import { useQuery } from "@tanstack/react-query";
import type { Livro } from "../../interfaces/Livro";
import { livrosMock } from "../../util/livrosMock";

const recuperarLivroPorOlid = async (olid: string): Promise<Livro> => {
  // TODO: trocar pelo useAPI<Livro>(URL_LIVROS).recuperarPorId(olid)
  // quando o backend de detalhe (GET /livros/{olid}) existir.
  const livro = livrosMock.find((l) => l.OLid === olid);
  if (!livro) throw new Error("Livro não encontrado para o OLID: " + olid);
  return livro;
};

const useRecuperarLivroPorOlid = (olid: string) => {
  return useQuery({
    queryKey: ["livros", olid],
    queryFn: () => recuperarLivroPorOlid(olid),
    enabled: olid.trim() !== "",
  });
};

export default useRecuperarLivroPorOlid;
