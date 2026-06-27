import type { Book } from "../data/mockBooks";
import "./BookCard.css";

interface Props {
  book: Book;
}

function BookCard({ book }: Props) {
  return (
    <div className="book-card">
      <img src={book.coverUrl} alt={book.titulo} className="book-cover" />
      <div className="book-info">
        <h3 className="book-title">{book.titulo}</h3>
        <span className="book-score">⭐ {book.score.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default BookCard;
