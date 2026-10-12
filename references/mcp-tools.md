# Hellena MCP — proposta de tools para agentes

> **Estado: fictício / proposta de contrato.** Os nomes e schemas abaixo servem para desenhar a integração futura. Não correspondem a um servidor MCP ativo e não devem ser apresentados como tools já disponíveis. Ao implementar o servidor, os schemas finais devem derivar dos DTOs exportados pelo SDK e dos contratos do backend.

## Convenções

- Namespace lógico: hellena.
- Todas as tools operam apenas no âmbito da organização autorizado pelas credenciais/contexto do servidor MCP.
- O servidor deve validar entradas com schemas estritos e nunca aceitar API keys fornecidas pelo modelo como argumentos de tool.
- Argumentos chamados data correspondem ao DTO atual do SDK; não criar uma segunda versão do contrato.
- A resposta de cada tool deve devolver dados estruturados e erros tipados. Não devolver secrets, headers de autenticação ou stack traces.
- Os nomes usam verbos explícitos e devem mapear um-para-um para métodos públicos do SDK sempre que possível.

## Catálogo proposto

| Tool proposta | Método SDK | Tipo | Finalidade |
| --- | --- | --- | --- |
| hellena.products.list | product.listProducts(params?) | Leitura | Listar produtos com paginação |
| hellena.products.search | product.searchProducts(params) | Leitura | Pesquisar por critérios suportados |
| hellena.products.get | product.getProductByIdOrSlug(id) | Leitura | Consultar produto por ID ou slug |
| hellena.orders.calculate_shipping | order.calculateShippingCost(data) | Cálculo | Calcular portes sem criar encomenda |
| hellena.orders.calculate_coupon_discount | order.calculateCouponDiscount(data) | Cálculo | Calcular desconto sem criar encomenda |
| hellena.orders.create | order.createOrder(data) | Escrita | Criar encomenda |
| hellena.orders.renew_transaction_id | order.renewOrderTransactionId(id) | Escrita | Renovar ID de transação |
| hellena.payments.list_methods | payment.listAvailablePaymentMethods() | Leitura | Listar métodos configurados |
| hellena.payments.create_wipay_payment | payment.createWiPayPayment(data) | Financeira | Criar sessão de pagamento WiPay |
| hellena.comments.list_product | comment.listProductComments(params) | Leitura | Listar comentários de produto |
| hellena.comments.get | comment.getCommentById(id) | Leitura | Obter comentário |
| hellena.comments.create | comment.createComment(data) | Escrita | Criar comentário |
| hellena.comments.update | comment.updateComment(id, data) | Escrita | Atualizar comentário |
| hellena.comments.delete | comment.deleteComment(id) | Destrutiva | Eliminar comentário |
| hellena.ratings.get_product_summary | rating.getProductRatingSummary(stockId) | Leitura | Obter resumo das avaliações |
| hellena.ratings.get_customer_product_rating | rating.getCustomerProductRating(params) | Leitura | Obter avaliação de cliente/produto |
| hellena.ratings.create | rating.createProductRating(data) | Escrita | Criar avaliação |
| hellena.ratings.delete | rating.deleteProductRating(id) | Destrutiva | Eliminar avaliação |
| hellena.organization.get_info | organization.getOrganizationInfo() | Leitura | Obter informações da organização atual |
| hellena.organization.get_social_links | organization.getOrganizationSocialLinks() | Leitura | Obter links sociais |

## Schemas de input conceptuais

Estes schemas são orientações, não JSON Schema final. A implementação deve importar/reutilizar os DTOs e tipos do pacote SDK.

### Produtos
- hellena.products.list: { page?: number, limit?: number, ...ProductListParams }
- hellena.products.search: ProductSearchParams
- hellena.products.get: { id: string }

### Encomendas
- hellena.orders.calculate_shipping: GetFreteDTO
- hellena.orders.calculate_coupon_discount: CouponDiscountDTO
- hellena.orders.create: OrderDTO
- hellena.orders.renew_transaction_id: { id: string }

O SDK atual define o payload de encomenda com campos como info, items, coupon, frete e localization, conforme os DTOs. Não suportar aliases legados como cupon nem traduzir silenciosamente payloads antigos.

### Pagamentos
- hellena.payments.list_methods: sem argumentos.
- hellena.payments.create_wipay_payment: CreateWiPayPaymentDTO.

A resposta de criação de sessão de pagamento não deve ser interpretada como confirmação de pagamento liquidado. Só um estado confirmado pela API/webhook oficial permite afirmar que o pagamento foi concluído.

### Comentários e avaliações
- hellena.comments.list_product: { stockId: string, page?: number, limit?: number }
- hellena.comments.get: { id: string }
- hellena.comments.create: AddCommentDTO
- hellena.comments.update: { id: string, data: UpdateCommentDTO }
- hellena.comments.delete: { id: string }
- hellena.ratings.get_product_summary: { stockId: string }
- hellena.ratings.get_customer_product_rating: { stockId: string, customerId: string }
- hellena.ratings.create: AddRatingDTO
- hellena.ratings.delete: { id: string }

### Organização
- hellena.organization.get_info: sem argumentos; usa a organização autorizada pela credencial atual.
- hellena.organization.get_social_links: sem argumentos; usa a organização autorizada pela credencial atual.

## Política de confirmação do agente

- Leituras e cálculos sem efeitos laterais podem ser chamados quando o utilizador os solicitar.
- Antes de orders.create, apresenta os artigos, quantidades, localização, desconto/portes calculados e o resumo final. Exige confirmação explícita se o utilizador ainda não autorizou claramente a compra.
- Antes de payments.create_wipay_payment, confirma que o utilizador pretende iniciar o pagamento e que o resumo da encomenda está correto.
- Antes de renovar um ID de transação, criar/atualizar comentários ou criar/eliminar avaliações, confirma intenção e identidade/IDs necessários.
- Antes de eliminar comentários ou avaliações, pede confirmação explícita.
- Não repitas chamadas de escrita depois de timeout sem consultar primeiro um estado verificável.

## Modelo de resposta recomendado

A implementação pode padronizar a resposta neste formato, preservando o payload do SDK:

    {
      "ok": true,
      "data": {},
      "error": null,
      "requestId": "identificador-nao-sensivel"
    }

Em caso de falha:

    {
      "ok": false,
      "data": null,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Descrição segura para o agente"
      },
      "requestId": "identificador-nao-sensivel"
    }

Os objetos são exemplos ilustrativos; não são respostas reais de um servidor Hellena MCP.