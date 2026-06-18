import { URL_BASE } from "../util/constantes";

// Hook genérico de acesso à API, no mesmo padrão da referência das aulas.
// Ainda não é usado pelos hooks de domínio (que leem do mock), mas já deixa
// pronta a camada para quando o backend de webscraping existir.
const useAPI = <T>(endpoint: string) => {
  const URL = `${URL_BASE}${endpoint}`;

  const handleResponseError = async (response: Response) => {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      if (error) throw error;
      else throw new Error("Erro desconhecido. Status: " + response.status);
    }
  };

  const recuperar = async (queryString?: Record<string, string>): Promise<T[]> => {
    const url = queryString
      ? `${URL}?` + new URLSearchParams({ ...queryString })
      : URL;
    const response = await fetch(url);
    await handleResponseError(response);
    return await response.json();
  };

  const recuperarPorId = async (id: string): Promise<T> => {
    const response = await fetch(`${URL}/${id}`);
    await handleResponseError(response);
    return await response.json();
  };

  return { recuperar, recuperarPorId };
};

export default useAPI;
