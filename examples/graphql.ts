import { HellenaAPIError, HellenaClient } from "../dist/main.js";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define HELLENA_API_KEY antes de executar este exemplo.");
const hellena = new HellenaClient(apiKey);

async function main(): Promise<void> {
  const query = `query Products($page: Int, $limit: Int) {
    products(page: $page, limit: $limit) {
      data { id name }
      meta { total page limit }
    }
  }`;

  try {
    const result = await hellena.graphql(query, { page: 1, limit: 5 });
    console.log("Resposta GraphQL:", result);
  } catch (error: unknown) {
    if (error instanceof HellenaAPIError) {
      console.error("Erro da API:", error.status, error.message, error.response);
    } else {
      console.error("Erro inesperado:", error);
    }
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error("Não foi possível executar o exemplo GraphQL:", error);
  process.exitCode = 1;
});
