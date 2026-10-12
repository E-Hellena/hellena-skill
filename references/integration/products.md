# Produtos

Os métodos de produtos estão disponíveis em `hellena.product`.

## `product.listProducts(params?)`

Lista produtos com paginação. A página começa em 1 e o limite máximo documentado no SDK é 100.

```ts
const result = await hellena.product.listProducts({ page: 1, limit: 20 });
console.log(result.data);       // lista de produtos
console.log(result.meta);       // total, página, limites e navegação
console.log(result.meta.hasNextPage);
```

Parâmetros opcionais: `page`, `limit`.

Endpoint: `GET /v1/products/all?page=1&limit=20`.

## `product.searchProducts(params)`

Pesquisa por referência textual. A API pode procurar por ID, slug, nome, código de barras, categoria, marca ou descrição.

```ts
const result = await hellena.product.searchProducts({
  ref: "ténis",
  page: 1,
  limit: 10,
});
console.log(result.data);
```

`ref` é obrigatório; `page` e `limit` são opcionais.

Endpoint: `GET /v1/products/search?ref=ténis&page=1&limit=10`.

## `product.getProductByIdOrSlug(id)`

Obtém um produto pelo ID ou slug.

```ts
const product = await hellena.product.getProductByIdOrSlug("produto-ou-slug");
console.log(product.name, product.prices);
```

Endpoint: `GET /v1/products/:ref`.

## Formato de resposta

Os métodos `listProducts` e `searchProducts` devolvem um objeto com `data` e `meta`. Cada produto pode incluir `id`, `slug`, `name`, `description`, `image`, `category`, `brand`, `quantity`, `prices` e variantes. Cada preço pode conter `quantity`, `price` e `priceType`.

## Exemplo executável

Executa `node docs/examples/products.mjs`. O exemplo usa o código compilado em `dist/main.js`.
