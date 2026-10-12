# Referência do SDK JavaScript Hellena

Esta referência resume a superfície pública confirmada no repositório @hellena-sdk/hellena. Confirma sempre os tipos e a versão instalada antes de gerar código para um projeto específico.

## Instalação e inicialização

Instala a dependência no projeto:

    npm install @hellena-sdk/hellena

Usa a API key apenas no servidor:

    import { HellenaClient } from "@hellena-sdk/hellena";

    const apiKey = process.env.HELLENA_API_KEY;
    if (!apiKey) {
      throw new Error("A variável HELLENA_API_KEY não está definida.");
    }

    export const hellena = new HellenaClient(apiKey);

Configuração documentada por omissão:

- API base: https://api.hellena.app
- Versão REST: v1
- Timeout: 30 segundos
- Autenticação: header x-hellena-api-key

O construtor recebe a API key e, opcionalmente, um objeto de opções. Confirma HellenaClientOptions na versão instalada para os nomes e tipos exatos das opções.

## Produtos

    const page = await hellena.product.listProducts({
      page: 1,
      limit: 10,
    });

    const matches = await hellena.product.searchProducts({
      ref: "ténis",
      page: 1,
      limit: 10,
    });

    const product = await hellena.product.getProductByIdOrSlug("product-id-ou-slug");

- listProducts(params?): lista produtos com paginação.
- searchProducts(params): pesquisa por ID, slug, nome, código de barras, categoria, marca ou descrição.
- getProductByIdOrSlug(id): consulta detalhes por ID ou slug.

Usa os preços e os dados devolvidos pela API. Não assumes que um produto está disponível apenas porque aparece na pesquisa.

## Encomendas e checkout

Métodos públicos confirmados:

- hellena.order.createOrder(data)
- hellena.order.renewOrderTransactionId(id)
- hellena.order.calculateShippingCost(data)
- hellena.order.calculateCouponDiscount(data)

Exemplo de cálculo de portes:

    const shipping = await hellena.order.calculateShippingCost({
      localization: "Luanda",
      items: [
        {
          productId: "product-id",
          name: "Produto de exemplo",
          quantity: 1,
          price: 5000,
        },
      ],
    });

Exemplo de cálculo de cupão:

    const discount = await hellena.order.calculateCouponDiscount({
      code: "PROMO",
      items: [
        {
          productId: "product-id",
          name: "Produto de exemplo",
          quantity: 1,
          price: 5000,
        },
      ],
    });

Os valores acima são dados ilustrativos, não IDs ou preços reais. Consulta os DTOs da versão instalada para obter o contrato completo. Antes de criar uma encomenda, usa o formato atual OrderDTO (incluindo info, items, coupon, frete e localization, conforme aplicável); não inventes campos nem uses formatos legados. Não repitas a criação automaticamente após um timeout.

## Comentários

- hellena.comment.listProductComments({ stockId, page?, limit? })
- hellena.comment.getCommentById(id)
- hellena.comment.createComment(data)
- hellena.comment.updateComment(id, data)
- hellena.comment.deleteComment(id)

Antes de criar, atualizar ou eliminar, confirma o conteúdo/ID e a autorização aplicável.

## Avaliações

- hellena.rating.getProductRatingSummary(stockId)
- hellena.rating.getCustomerProductRating({ stockId, customerId })
- hellena.rating.createProductRating(data)
- hellena.rating.deleteProductRating(id)

A consulta da avaliação do cliente pode devolver null quando não existe avaliação.

## Pagamentos

- hellena.payment.listAvailablePaymentMethods()
- hellena.payment.createWiPayPayment(data)

A criação de pagamento inicia um fluxo; não prova que o pagamento foi liquidado. Segue apenas o URL e o estado devolvidos pelo serviço e não peças dados completos de cartão no chat.

## Organização

- hellena.organization.getOrganizationInfo()
- hellena.organization.getOrganizationSocialLinks()

As informações correspondem à organização associada à API key/contexto atual. Não uses a API key de uma organização para tentar consultar outra.

## REST e GraphQL

A interface pública do cliente também inclui:

- hellena.graphql<T>(query, variables?)
- hellena.sendRestRequest<T>(path, options?)

Usa REST/GraphQL genéricos apenas quando a operação, o schema, os headers e as permissões estiverem documentados ou confirmados no código. Não inventes endpoints ou nomes de operações. Para uma funcionalidade já coberta por um método específico do SDK, prefere esse método.

## Fonte da verdade

O código público e os tipos da versão instalada são a fonte da verdade para as assinaturas. Esta referência é um resumo operacional, não substitui os DTOs, a documentação completa nem as validações do backend.
