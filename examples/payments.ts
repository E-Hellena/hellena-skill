import { HellenaClient } from "../dist/main.js";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define HELLENA_API_KEY antes de executar este exemplo.");
const hellena = new HellenaClient(apiKey);

async function main(): Promise<void> {
  console.log("Métodos de pagamento:", await hellena.payment.listAvailablePaymentMethods());

  if (process.env.HELLENA_ALLOW_WRITES !== "true") {
    console.log("Criação de pagamento desativada. Define HELLENA_ALLOW_WRITES=true para ativar.");
    return;
  }

  // Dados demonstrativos: substitui a referência por uma encomenda válida antes de testar.
  const customer = "maria@example.com";
  const reference = "encomenda-demo-001";

  const payment = await hellena.payment.createWiPayPayment({
    customer,
    reference,
    failure_url: "https://example.com/payment/failure",
    success_url: "https://example.com/payment/success",
  });
  console.log("URL do pagamento:", payment.url);
}

main().catch((error: unknown) => {
  console.error("Erro nos métodos de pagamento:", error);
  process.exitCode = 1;
});
