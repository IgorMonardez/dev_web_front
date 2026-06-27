# dev_web_front — Frontend

Interface web para pesquisa de livros com exibição de avaliações e preços em tempo real.

## Tecnologias

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Query v5 (@tanstack/react-query) — cache e requisições assíncronas
- React Router v7

## Como rodar

### Pré-requisitos

- Node.js instalado
- Backend (`DevWeb`) rodando em `http://localhost:8080`

### Instalar e iniciar

```bash
npm install
npm run dev
```

O app abre em `http://localhost:5173`.

## Funcionalidades implementadas

- **Pesquisa de livros**: campo de busca que consulta o backend, exibe indicador de carregamento e mensagens de erro
- **Grid de resultados**: cards exibidos em grade responsiva (1 coluna → 2 → 3 conforme a tela)
- **Capa do livro**: imagem carregada via Open Library Covers API
- **Carregamento paralelo**: os cards aparecem assim que a busca retorna; notas e preços carregam independentemente em cada card
- **Avaliações**: exibe nota do Open Library com logo, data de coleta e link para a fonte
- **Preços**: exibe preços do Mercado Livre com link direto para o produto
- **Retry com backoff exponencial**:
  - Notas: até 10 tentativas, delay de `min(1000 * 2^n, 60000)` ms
  - Preços: até 4 tentativas, mesmo backoff
- **Distinção de estados de nota**: `not_available` (sem avaliação no Open Library) vs `error` (falha de conexão — dispara retry)
- **Cache**: resultados de busca válidos por 5 min, notas e preços por 10 min, sem refetch ao focar a aba

## Estrutura do projeto

```
src/
├── components/
│   ├── CardLivro.tsx          # Card de livro com notas e preços (componente principal)
│   ├── BarraDePesquisa.tsx    # Input de pesquisa
│   └── NavBar.tsx             # Barra de navegação
├── hooks/livro/
│   ├── usePesquisarLivros.ts          # Busca lista de livros no backend
│   ├── useRecuperarNotasPorOlid.ts    # Busca notas de um livro (por card)
│   └── useRecuperarPrecos.ts          # Busca preços de um livro (por card)
├── interfaces/
│   ├── Livro.ts               # Tipo do livro
│   ├── Nota.ts                # Tipo de uma avaliação
│   ├── NotasResponse.ts       # Envelope de notas (status + lista)
│   ├── Preco.ts               # Tipo de um preço
│   └── PrecosResponse.ts      # Envelope de preços (status + lista)
├── pages/
│   ├── HomePage.tsx           # Página principal (pesquisa + grid de cards)
│   ├── LivroPage.tsx          # Página individual do livro (não implementada)
│   └── ErrorPage.tsx          # Página de erro de rota
├── routes/
│   ├── router.tsx             # Definição de rotas
│   └── Layout.tsx             # Layout com NavBar
└── util/
    └── constantes.ts          # URL_BASE do backend
```

## O que ainda falta implementar

- **Página individual do livro** (`LivroPage.tsx`): a rota existe mas a página está vazia. A ideia é exibir todos os detalhes do livro ao clicar em um card.
- **`useRecuperarLivroPorIsbn`**: hook esboçado mas não conectado a nenhuma tela.
- **`BookCard.tsx`**: componente mais antigo/mock ainda presente na pasta, pode ser removido ou substituído pelo `CardLivro`.
- **Paginação / scroll infinito**: a busca retorna todos os resultados de uma vez sem paginação no frontend.
- **Filtros e ordenação**: não há como filtrar por ano, autor ou ordenar por nota/preço.
- **Testes**: nenhum teste implementado.
