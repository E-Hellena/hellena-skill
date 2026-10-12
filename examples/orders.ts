import { HellenaClient } from "../dist/main.js";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define HELLENA_API_KEY antes de executar este exemplo.");

const hellena = new HellenaClient(apiKey);
const items = [{
  productId: "produto-demo-001",
  name: "Produto de exemplo",
  quantity: 1,
  price: 1000,
}];

async function main(): Promise<void> {
  const shipping = await hellena.order.calculateShippingCost({
    localization: "Luanda",
    lat: -8.8389,
    long: 13.2894,
    items,
  });
  console.log("Portes de entrega:", shipping);

  if (process.env.HELLENA_ALLOW_WRITES === "true") {
    console.log("Desconto:", await hellena.order.calculateCouponDiscount({
      code: "PROMO-DEMO",
      items,
      customerEmail: "maria@example.com",
    }));

    // ATENÇÃO: esta chamada pode criar uma encomenda real.
    const order = await hellena.order.createOrder({
      info: {
        customerName: "Maria Exemplo",
        customerEmail: "maria@example.com",
        address: "Luanda",
        lat: -8.8389,
        lng: 13.2894,
      },
      items,
      localization: "Luanda",
    });
    console.log("Encomenda criada:", order);
  } else {
    console.log("Criação de encomendas desativada. Define HELLENA_ALLOW_WRITES=true para ativar.");
  }

  if (process.env.HELLENA_ALLOW_WRITES === "true") {
    // ID ilustrativo: substitui por uma encomenda existente antes de testar.
    console.log("Nova transação:", await hellena.order.renewOrderTransactionId("encomenda-demo-001"));
  }
}

main().catch((error: unknown) => {
  console.error("Erro nas operações de encomenda:", error);
  process.exitCode = 1;
});
