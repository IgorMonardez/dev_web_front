import { useQuery } from "@tanstack/react-query";
import type { NotasResponse } from "../../interfaces/NotasResponse";
import { URL_BASE } from "../../util/constantes";

const useRecuperarNotasPorOlid = (olid: string) => {
  return useQuery<NotasResponse>({
    queryKey: ["notas", olid],
    queryFn: async () => {
      const response = await fetch(`${URL_BASE}/livros/${olid}/notas`);
      if (!response.ok) throw new Error("Erro HTTP");
      const data: NotasResponse = await response.json();
      if (data.status === "error") throw new Error("Falha na conexão");
      return data;
    },
    retry: 10,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 60000),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useRecuperarNotasPorOlid;
