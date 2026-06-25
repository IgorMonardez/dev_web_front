import type { Nota } from "./Nota.ts";

export interface Livro {
  title: string;
  subtitle: string;
  authors: string[];
  year: string;
  url: string;
  OLid: string;   // ou 'olid' se preferir, mas tem que casar
  ratings: Nota[];
}
