# Lista de Produtos - React + TypeScript

Aplicação web desenvolvida com React e TypeScript que permite visualizar, filtrar, favoritar e explorar detalhes de produtos de forma simples e interativa.

---

## Funcionalidades

### Listagem de Produtos
- Exibição de uma lista de produtos com nome, preço e categorias.

### Favoritos
- Cada produto pode ser favoritado ou removido dos favoritos.
- Limite de dois produtos favoritados por categoria.
  - Ao favoritar um terceiro produto da mesma categoria, o mais antigo é removido automaticamente.
  - Produtos com múltiplas categorias são contabilizados em todas.
- Página dedicada para visualizar apenas os produtos favoritados.
- Contador de favoritos exibido no cabeçalho, atualizado em tempo real.

### Filtros e Busca
- Filtro por nome do produto.
- Filtro por categoria.
- Filtro por preço (mínimo e máximo).

### Modal de Detalhes
- Modal com informações completas do produto.
- Visualização de variantes (ex: cor, tamanho), se existirem.
- Ações de favoritar ou desfavoritar diretamente no modal.

### Paginação
- Paginação de produtos na página inicial.
- Navegação entre páginas com botões para próxima, anterior e número da página.

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Context API
- Framer Motion
- React Icons

---

## Como Executar

```bash
# Instale as dependências
npm install

# Inicie o projeto localmente
npm run dev
