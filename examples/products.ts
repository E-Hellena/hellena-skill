import { HellenaClient } from "../dist/main.js";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define HELLENA_API_KEY antes de executar este exemplo.");

const hellena = new HellenaClient(apiKey);

async function main(): Promise<void> {
  const page = await hellena.product.listProducts({ page: 1, limit: 10 });
  console.log("Produtos:", page.data.map(({ id, name, prices }) => ({ id, name, prices })));
  console.log("Paginação:", page.meta);

  const matches = await hellena.product.searchProducts({ ref: "ténis", page: 1, limit: 10 });
  console.log("Resultados da pesquisa:", matches.data);

  // ID/slug ilustrativo: substitui por um produto existente para obter detalhes reais.
  console.log("Produto de exemplo:", await hellena.product.getProductByIdOrSlug("produto-demo-001"));
}

main().catch((error: unknown) => {
  console.error("Erro ao consultar produtos:", error);
  process.exitCode = 1;
});
