import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="mx-auto mt-20 max-w-2xl text-center">
      <h1 className="text-3xl font-bold text-gray-800">Ops! Algo deu errado.</h1>
      <p className="mt-2 text-gray-600">
        A página que você procura não existe ou ocorreu um erro inesperado.
      </p>
      <Link to="/" className="btn-primary mt-6 inline-block">
        Voltar para a pesquisa
      </Link>
    </div>
  );
};

export default ErrorPage;
