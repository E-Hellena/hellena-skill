# Documentação do Hellena JavaScript SDK

Guia do SDK `@hellena-sdk/hellena`, organizado por recurso. Os exemplos de código importam a versão compilada em `dist/main.js`, para poderem ser executados neste repositório depois de `bun run build`.

## Conteúdo

- [Instalação e configuração](getting-started.md)
- [Produtos](products.md)
- [Encomendas e checkout](orders.md)
- [Comentários](comments.md)
- [Avaliações](ratings.md)
- [Pagamentos](payments.md)
- [Organização](organization.md)
- [REST, GraphQL e erros](rest-graphql-errors.md)
- [Exemplos TypeScript na raiz do repositório](../../examples/README.md)

## Recursos disponíveis

| Recurso | Métodos |
| --- | --- |
| `product` | `listProducts`, `searchProducts`, `getProductByIdOrSlug` |
| `order` | `createOrder`, `renewOrderTransactionId`, `calculateShippingCost`, `calculateCouponDiscount` |
| `comment` | `listProductComments`, `getCommentById`, `createComment`, `updateComment`, `deleteComment` |
| `rating` | `getProductRatingSummary`, `getCustomerProductRating`, `createProductRating`, `deleteProductRating` |
| `payment` | `listAvailablePaymentMethods`, `createWiPayPayment` |
| `organization` | `getOrganizationInfo`, `getOrganizationSocialLinks` |
| Cliente | `sendRestRequest`, `graphql` |

> A API Key é secreta. Executa estes exemplos no servidor e nunca a coloques em código enviado para o browser ou num repositório público.

Para cenários fictícios de teste, consulta `../../assets/fixtures/` na raiz do repositório. Os fixtures são opcionais e nunca representam estado real da API.
