import { useQuery } from "@tanstack/react-query";
import type { NotasResponse } from "../../interfaces/NotasResponse";
import { URL_BASE } from "../../util/constantes";

const useRecuperarNotaGoodreads = (olid: string, titulo: string) => {
  return useQuery<NotasResponse>({
    queryKey: ["notas-goodreads", olid],
    queryFn: async () => {
      const url = `${URL_BASE}/livros/${olid}/notas/goodreads?titulo=${encodeURIComponent(titulo)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro HTTP");
      const data: NotasResponse = await response.json();
      if (data.status === "error") throw new Error("Falha na conexão");
      return data;
    },
    retry: 2,
    retryDelay: 2000,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useRecuperarNotaGoodreads;
