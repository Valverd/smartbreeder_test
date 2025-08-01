# Lista de Produtos - React + TypeScript

Aplicação web desenvolvida com React e TypeScript que permite visualizar, filtrar, favoritar e explorar detalhes de produtos de forma simples e interativa.

<img width="1481" height="775" alt="image" src="https://github.com/user-attachments/assets/d22f0ad0-8120-4cd2-9aee-d78eba6b7023" />

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

<img width="1498" height="712" alt="image" src="https://github.com/user-attachments/assets/178b07ca-0218-4671-a62f-0db9a7721334" />


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
