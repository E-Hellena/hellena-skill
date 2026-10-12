# Avaliações

Os métodos de avaliações estão disponíveis em `hellena.rating`.

## `rating.getProductRatingSummary(stockId)`

Devolve o resumo das avaliações do produto.

```ts
const summary = await hellena.rating.getProductRatingSummary("product-id");
console.log(summary.averageRating, summary.ratingCount, summary.commentsCount);
```

Endpoint: `GET /v1/ratings/products/:stockId/summary`.

## `rating.getCustomerProductRating({ stockId, customerId })`

Procura a avaliação de um cliente para um produto. A resposta é uma avaliação ou `null`, conforme a resposta da API.

```ts
const rating = await hellena.rating.getCustomerProductRating({
  stockId: "product-id",
  customerId: "customer-id",
});
console.log(rating);
```

Endpoint: `GET /v1/ratings/products/:stockId?customerId=...`.

## `rating.createProductRating(data)`

Cria uma avaliação.

```ts
const rating = await hellena.rating.createProductRating({
  stockId: "product-id",
  score: 5,
  customerId: "customer-id",
  customerName: "Maria",
});
```

Obrigatórios: `stockId`, `score`. Os dados de cliente são opcionais. Confirma as regras de pontuação aplicadas pela API antes de aceitar valores no teu formulário.

Endpoint: `POST /v1/ratings`.

## `rating.deleteProductRating(id)`

Remove uma avaliação pelo ID.

```ts
const result = await hellena.rating.deleteProductRating("rating-id");
console.log(result.success);
```

Endpoint: `DELETE /v1/ratings/:id`.

## Exemplo executável

Executa `node docs/examples/ratings.mjs`. Operações de escrita e remoção só são executadas se definires `HELLENA_ALLOW_WRITES=true`.
