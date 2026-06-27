import type { Preco } from "./Preco";

export interface PrecosResponse {
  status: "found" | "not_available" | "error";
  precos: Preco[];
}
