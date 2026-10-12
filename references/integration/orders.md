# Encomendas e checkout

Os métodos de checkout estão disponíveis em `hellena.order`. Os campos e preços de exemplo são ilustrativos; utiliza os identificadores e valores reais da tua loja.

## `order.createOrder(data)`

Cria uma encomenda.

```ts
const order = await hellena.order.createOrder({
  info: {
    customerId: "customer-id",
    customerName: "Maria",
    customerEmail: "maria@example.com",
    customerPhone: "+244900000000",
    address: "Luanda",
    lat: -8.8389,
    lng: 13.2894,
    notes: "Entregar à tarde",
  },
  items: [{
    productId: "product-id",
    name: "Produto de exemplo",
    quantity: 2,
    price: 5000,
  }],
  coupon: "PROMO",
  frete: 0,
  localization: "Luanda",
});
console.log(order.id, order.status, order.amount);
```

Campos principais:
- `items`: obrigatório; lista de itens com `productId`, `name`, `quantity` e `price`.
- `info`: informação opcional do cliente e da entrega.
- `coupon`, `frete`, `localization`: dados opcionais de checkout.

Os dados do cliente e da entrega devem ser enviados dentro de `info`; utiliza `coupon` para indicar o cupão.

Endpoint: `POST /v1/orders/new`.

## `order.calculateShippingCost(data)`

Calcula se a entrega é necessária e o respetivo preço.

```ts
const shipping = await hellena.order.calculateShippingCost({
  localization: "Luanda",
  lat: -8.8389,
  long: 13.2894,
  items: [{
    productId: "product-id",
    name: "Produto de exemplo",
    quantity: 2,
    price: 5000,
  }],
});
console.log(shipping.required, shipping.price, shipping.isFreeShipping);
```

A resposta tipada inclui `required`, `price`, `isFreeShipping` e uma mensagem opcional.

Endpoint: `POST /v1/orders/checkout/frete`.

## `order.calculateCouponDiscount(data)`

Valida um cupão e calcula o desconto estimado para os itens fornecidos.

```ts
const discount = await hellena.order.calculateCouponDiscount({
  code: "PROMO",
  customerEmail: "maria@example.com",
  fretePrice: 1500,
  items: [{
    productId: "product-id",
    name: "Produto de exemplo",
    quantity: 2,
    price: 5000,
  }],
});
console.log(discount.valid, discount.discountAmount, discount.finalAmount);
```

`code` e `items` são obrigatórios. `customerId`, `customerEmail` e `fretePrice` são opcionais.

Endpoint: `POST /v1/orders/checkout/coupon-discount`.

## `order.renewOrderTransactionId(id)`

Pede à API um novo identificador de transação para uma encomenda.

```ts
const transaction = await hellena.order.renewOrderTransactionId("order-id");
console.log(transaction.id, transaction.transactionId);
```

Endpoint: `POST /v1/orders/:id/renew-transaction`.

## Exemplo executável

Executa `node docs/examples/orders.mjs`. Por criar uma encomenda, o exemplo está comentado por defeito para evitar operações acidentais; ativa explicitamente o bloco quando estiveres pronto para testar.
