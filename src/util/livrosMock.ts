import type { Livro } from "../interfaces/Livro";

type LivroMock = Livro & {
  isbn: string;
};

// Dados mockados usados enquanto o backend (webscraping) não existe.
// TODO: remover quando os hooks passarem a consumir o useAPI real.
export const livrosMock: LivroMock[] = [
  {
    isbn: "9788580573466",
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    subtitle: "",
    authors: ["J.R.R. Tolkien"],
    year: "1954",
    url: "https://openlibrary.org/works/OL27448W",
    OLid: "OL27448W",
    ratings: [
      {
        site: "Open library",
        logo: "/logos/openlibrary-logo-tighter.svg",
        nota: "4.9",
        notaMaxima: "5",
        dataColeta: "2026-06-25T00:00:00",
        urlPagina: "https://openlibrary.org/works/OL27448W",
      },
    ],
  },
];
