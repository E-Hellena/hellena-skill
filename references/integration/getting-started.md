# Instalação e configuração

## Instalar o pacote

Num projeto que consome o SDK publicado:

```bash
npm install @hellena-sdk/hellena
```

Neste repositório, compila primeiro o SDK:

```bash
bun install
bun run build
```

## Criar o cliente

### Consumir o pacote instalado

```ts
import { HellenaClient } from "@hellena-sdk/hellena";

const hellena = new HellenaClient(process.env.HELLENA_API_KEY!);
```

### Usar o código compilado deste repositório

Os exemplos em `docs/examples/` importam diretamente de `../../dist/main.js`:

```js
import { HellenaClient } from "../../dist/main.js";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define a variável HELLENA_API_KEY.");

const hellena = new HellenaClient(apiKey);
```

Define a variável antes de executar um exemplo, por exemplo:

```bash
export HELLENA_API_KEY="a-tua-chave"
node docs/examples/products.mjs
```

No Windows PowerShell, define-a com `$env:HELLENA_API_KEY="a-tua-chave"`.

## Opções do cliente

```ts
import { HellenaClient } from "@hellena-sdk/hellena";

const hellena = new HellenaClient(process.env.HELLENA_API_KEY!, {
  apiUrl: "https://api.hellena.app",
  apiVersion: "v1",
  timeout: 30_000,
});
```

- `apiUrl`: URL base da API. O padrão é `https://api.hellena.app`.
- `apiVersion`: versão REST. O padrão é `v1`.
- `timeout`: tempo limite por pedido, em milissegundos. O padrão é 30 segundos.

A autenticação é enviada no cabeçalho `x-hellena-api-key`.

## Exemplo mínimo

```js
import { HellenaClient } from "../../dist/main.js";

const hellena = new HellenaClient(process.env.HELLENA_API_KEY);
const result = await hellena.product.listProducts({ page: 1, limit: 10 });
console.log(result.data);
```
