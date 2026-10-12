# REST genérico, GraphQL e erros

## `hellena.sendRestRequest(path, options?)`

Permite chamar um endpoint REST que ainda não tenha um método de alto nível. O SDK acrescenta o URL base, a versão configurada (por padrão `/v1`) e o cabeçalho de autenticação.

```ts
const result = await hellena.sendRestRequest<{ ok: boolean }>("algum-endpoint", {
  method: "GET",
  query: { page: 1, includeInactive: false },
});
```

Opções suportadas:
- `method`: `GET`, `POST`, `PUT`, `PATCH` ou `DELETE`.
- `query`: parâmetros de URL; valores `null` e `undefined` são omitidos.
- `body`: corpo JSON.
- `headers`: cabeçalhos adicionais.
- `signal`: `AbortSignal` para cancelamento.

Exemplo POST:

```ts
const result = await hellena.sendRestRequest("algum-endpoint", {
  method: "POST",
  body: { enabled: true },
});
```

Usa caminhos relativos, por exemplo `"products/all"`, sem repetir `/v1`.

## `hellena.graphql<T>(query, variables?)`

Envia uma query ou mutation para `/graphql` com autenticação.

```ts
type ProductQuery = {
  products: {
    data: Array<{ id: string; name: string }>;
    meta: { total: number; page: number; limit: number };
  };
};

const result = await hellena.graphql<ProductQuery>(
  `query Products($page: Int, $limit: Int) {
    products(page: $page, limit: $limit) {
      data { id name }
      meta { total page limit }
    }
  }`,
  { page: 1, limit: 10 },
);
console.log(result.products.data);
```

O tipo genérico `T` serve para tipar a resposta no teu código; não valida automaticamente o esquema recebido.

## Erros HTTP

Os pedidos feitos através de `sendRestRequest()` e dos recursos REST que usam esse transporte lançam `HellenaAPIError` quando a API devolve uma resposta HTTP não bem-sucedida.

```ts
import { HellenaAPIError } from "@hellena-sdk/hellena";

try {
  await hellena.product.getProductByIdOrSlug("id-inexistente");
} catch (error) {
  if (error instanceof HellenaAPIError) {
    console.error("HTTP:", error.status);
    console.error("Mensagem:", error.message);
    console.error("URL:", error.path);
    console.error("Resposta:", error.response);
  } else {
    console.error("Erro de rede, timeout ou outro:", error);
  }
}
```

O cliente tem timeout por padrão de 30 segundos. Timeout, cancelamento e falhas de rede são reportados como `Error`. O método `graphql()` também lança `HellenaAPIError` para erros HTTP ou erros devolvidos no payload GraphQL.

## Segurança

- Nunca exponhas a API Key no frontend/browser.
- Não registes dados pessoais ou payloads sensíveis em logs de produção.
- Usa a chave através de variáveis de ambiente.


