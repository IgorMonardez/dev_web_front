import type { Nota } from "./Nota.ts";

export interface Livro {
  title: string;
  subtitle: string;
  authors: string[];
  year: string;
  url: string;
  OLid: string;
  coverId?: number;
  ratings: Nota[];
}
