import type { Livro } from "../interfaces/Livro";

// Dados mockados usados enquanto o backend (webscraping) não existe.
// TODO: remover quando os hooks passarem a consumir o useAPI real.
export const livrosMock: Livro[] = [
  {
    isbn: "9788580573466",
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    autor: ["J.R.R. Tolkien"],
    preco: [59.9, 64.9, 55.0],
    rating: [4.9, 4.7, 5.0],
  },
];
