interface Props {
  texto?: string;
}

const LoadingLivros = ({ texto = "Pesquisando..." }: Props) => {
  return (
    <div className="mt-3 flex items-center gap-3" role="status" aria-label={texto}>
      <div className="loading-livros" aria-hidden="true">
        <span className="livro-pulando" />
        <span className="livro-pulando" />
        <span className="livro-pulando" />
      </div>
      <span className="text-[#7b4f2c]">{texto}</span>
    </div>
  );
};

export default LoadingLivros;
