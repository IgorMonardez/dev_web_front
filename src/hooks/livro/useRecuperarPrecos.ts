import { useQuery } from "@tanstack/react-query";
import type { PrecosResponse } from "../../interfaces/PrecosResponse";
import { URL_BASE } from "../../util/constantes";

const useRecuperarPrecos = (olid: string, titulo: string) => {
  return useQuery<PrecosResponse>({
    queryKey: ["precos", olid],
    queryFn: async () => {
      const url = `${URL_BASE}/livros/${olid}/precos?titulo=${encodeURIComponent(titulo)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro HTTP");
      const data: PrecosResponse = await response.json();
      if (data.status === "error") throw new Error("Falha na conexão");
      return data;
    },
    retry: 4,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 60000),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useRecuperarPrecos;
