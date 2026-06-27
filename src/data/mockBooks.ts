export interface Book {
  id: number;
  titulo: string;
  isbn: string;
  coverUrl: string;
  score: number;
}

const mockBooks: Book[] = [
  {
    id: 1,
    titulo: "O Senhor dos Anéis",
    isbn: "978-0-261-10235-4",
    coverUrl: "https://placehold.co/200x300/8B5E3C/fff?text=SDA",
    score: 9.2,
  },
  {
    id: 2,
    titulo: "Harry Potter e a Pedra Filosofal",
    isbn: "978-0-439-70818-8",
    coverUrl: "https://placehold.co/200x300/740001/fff?text=HP",
    score: 8.7,
  },
  {
    id: 3,
    titulo: "1984",
    isbn: "978-0-452-28423-4",
    coverUrl: "https://placehold.co/200x300/1a1a2e/fff?text=1984",
    score: 9.0,
  },
  {
    id: 4,
    titulo: "Duna",
    isbn: "978-0-441-17271-9",
    coverUrl: "https://placehold.co/200x300/c2a227/fff?text=DUNA",
    score: 8.5,
  },
  {
    id: 5,
    titulo: "O Hobbit",
    isbn: "978-0-261-10221-7",
    coverUrl: "https://placehold.co/200x300/2d6a4f/fff?text=HOBBIT",
    score: 8.9,
  },
  {
    id: 6,
    titulo: "Cem Anos de Solidão",
    isbn: "978-0-06-088328-7",
    coverUrl: "https://placehold.co/200x300/6a0572/fff?text=CAS",
    score: 9.1,
  },
];

export default mockBooks;
