import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="mb-6 bg-gray-100 py-4">
      <div className="mx-3 md:mx-10 lg:mx-20">
        <Link to="/" className="text-xl font-semibold text-gray-800">
          📚 Busca de Livros
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
