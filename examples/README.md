# Exemplos TypeScript — Hellena SDK

Estes exemplos ficam na raiz do repositório, na pasta `examples/`, e estão escritos em TypeScript. Importam o SDK compilado a partir de `../dist/main.js`.

## Preparar o ambiente

Na raiz do projeto:

```bash
bun install
bun run build
```

Os exemplos usam dados demonstrativos diretamente no código. Só precisas de definir a API Key; substitui os IDs fictícios por IDs existentes no teu ambiente quando quiseres obter resultados reais.

Define a API Key no ambiente antes de executar os exemplos.

Linux/macOS:

```bash
export HELLENA_API_KEY="a-tua-chave"
bun run examples/products.ts
```

PowerShell:

```powershell
$env:HELLENA_API_KEY="a-tua-chave"
bun run examples/products.ts
```

## Exemplos disponíveis

```bash
bun run examples/products.ts
bun run examples/orders.ts
bun run examples/comments.ts
bun run examples/ratings.ts
bun run examples/payments.ts
bun run examples/organization.ts
bun run examples/graphql.ts
```

Os dados de demonstração (produto, cliente, encomenda, cupão e URLs) estão definidos nos próprios ficheiros. Não precisas de configurar variáveis de ambiente para esses dados.

## Operações que alteram dados

Por segurança, operações de escrita não são executadas por defeito. Para ativar os blocos de escrita:

```bash
export HELLENA_ALLOW_WRITES=true
```

No PowerShell:

```powershell
$env:HELLENA_ALLOW_WRITES="true"
```

Usa esta opção apenas quando compreenderes os efeitos e tiveres substituído os valores de exemplo por dados apropriados. O exemplo de encomendas pode criar uma encomenda real e o de pagamentos pode iniciar um pagamento. A API Key deve ter as permissões necessárias e nunca deve ser colocada em código frontend ou publicada.
