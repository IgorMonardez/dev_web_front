import BookCard from "./components/BookCard";
import mockBooks from "./data/mockBooks";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1> BookScore</h1>
        <p>Avaliações de livros</p>
      </header>
      <main className="book-grid">
        {mockBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </main>
    </div>
  );
}

export default App;
