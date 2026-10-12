# Comentários

Os métodos de comentários estão disponíveis em `hellena.comment`. Os comentários estão associados a um produto através de `stockId`.

## `comment.listProductComments(params)`

Lista comentários de um produto com paginação.

```ts
const result = await hellena.comment.listProductComments({
  stockId: "product-id",
  page: 1,
  limit: 10,
});
console.log(result.data, result.meta);
```

`stockId` é obrigatório; `page` e `limit` são opcionais.

Endpoint: `GET /v1/comments?stockId=...&page=1&limit=10`.

## `comment.getCommentById(id)`

Obtém um comentário pelo identificador.

```ts
const comment = await hellena.comment.getCommentById("comment-id");
console.log(comment.content);
```

Endpoint: `GET /v1/comments/:id`.

## `comment.createComment(data)`

Cria um comentário.

```ts
const comment = await hellena.comment.createComment({
  stockId: "product-id",
  content: "Produto excelente!",
  customerId: "customer-id",
  customerName: "Maria",
  customerEmail: "maria@example.com",
});
```

Obrigatórios: `stockId`, `content`. Os dados do cliente, `parentId` (para resposta a outro comentário) e `reactions` são opcionais.

Endpoint: `POST /v1/comments`.

## `comment.updateComment(id, data)`

Atualiza os campos editáveis aceites pelo SDK, `content` e/ou `reactions`.

```ts
await hellena.comment.updateComment("comment-id", {
  content: "Texto atualizado",
});
```

Endpoint: `PATCH /v1/comments/:id`.

## `comment.deleteComment(id)`

Elimina um comentário.

```ts
const result = await hellena.comment.deleteComment("comment-id");
console.log(result.success);
```

Endpoint: `DELETE /v1/comments/:id`.

## Exemplo executável

Executa `node docs/examples/comments.mjs`. Operações de criação, edição e remoção estão protegidas por uma variável de confirmação no exemplo.
