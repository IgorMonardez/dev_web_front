interface Props {
  texto?: string;
}

const LoadingLivros = ({ texto = "Pesquisando..." }: Props) => {
  return (
    <div className="mt-5 flex items-end gap-3" role="status" aria-label={texto}>
      <div className="loading-estante" aria-hidden="true">
        <span className="livro-pulando" />
        <span className="livro-pulando" />
        <span className="livro-pulando" />
      </div>
      <span className="pb-1 text-[#7b4f2c]">{texto}</span>
    </div>
  );
};

export default LoadingLivros;
