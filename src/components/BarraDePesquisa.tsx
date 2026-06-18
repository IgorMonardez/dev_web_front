import { useState, type FormEvent } from "react";

interface Props {
  tratarPesquisa: (termo: string) => void;
}

const BarraDePesquisa = ({ tratarPesquisa }: Props) => {
  const [termo, setTermo] = useState("");

  const submit = (evento: FormEvent) => {
    evento.preventDefault();
    tratarPesquisa(termo);
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="text"
        className="input"
        placeholder="Pesquise por título ou autor..."
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
      />
      <button type="submit" className="btn-primary whitespace-nowrap">
        Pesquisar
      </button>
    </form>
  );
};

export default BarraDePesquisa;
