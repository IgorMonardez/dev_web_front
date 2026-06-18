export interface Livro {
  isbn: string; // identificador único do livro
  titulo: string;
  autor: string[];
  preco: number[]; // preços coletados de diferentes fontes
  rating: number[]; // avaliações coletadas de diferentes fontes
}
