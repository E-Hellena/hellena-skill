# Pagamentos

Os métodos disponíveis estão em `hellena.payment`.

## `payment.listAvailablePaymentMethods()`

Obtém os métodos de pagamento disponibilizados pela API.

```ts
const methods = await hellena.payment.listAvailablePaymentMethods();
console.log(methods);
```

A resposta é uma lista com `id`, `method` e `testMode`.

Endpoint: `GET /v1/payment/methods`.

## `payment.createWiPayPayment(data)`

Cria uma sessão/pedido de pagamento WiPay e devolve o URL fornecido pela API.

```ts
const payment = await hellena.payment.createWiPayPayment({
  customer: "cliente@example.com",
  reference: "order-123",
  failure_url: "https://loja.example.com/pagamento/erro",
  success_url: "https://loja.example.com/pagamento/sucesso",
});
console.log(payment.url);
```

Todos os quatro campos são obrigatórios no DTO. Usa URLs de retorno pertencentes à tua aplicação e trata o URL de pagamento de forma segura.

Endpoint: `POST /v1/payment/wipay/create`.

## Exemplo executável

Executa `node docs/examples/payments.mjs`. A criação de pagamento só ocorre quando `HELLENA_ALLOW_WRITES=true`.
