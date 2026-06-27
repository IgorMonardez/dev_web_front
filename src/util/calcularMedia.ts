import type { Nota } from "../interfaces/Nota";

export const calcularMedia = (notas: Nota[]) => {
  if (notas.length === 0) return 0;
  const total = notas.reduce((soma, n) => soma + parseFloat(n.nota), 0);
  return total / notas.length;
};
