import type { Nota } from "./Nota";

export interface NotasResponse {
  status: "found" | "not_available" | "error";
  notas: Nota[];
}
