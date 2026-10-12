/**
 * Exemplo ilustrativo para testar uma leitura através do SDK Hellena.
 * Executar apenas num ambiente configurado com uma API key de teste autorizada.
 * Não imprime a API key e não cria encomendas nem inicia pagamentos.
 */
import { HellenaClient } from "@hellena-sdk/hellena";

const apiKey = process.env.HELLENA_API_KEY;

if (!apiKey) {
  throw new Error("Define HELLENA_API_KEY no ambiente do servidor.");
}

const hellena = new HellenaClient(apiKey);

async function main() {
  // Confirma os parâmetros aceites na versão instalada do SDK.
  const result = await hellena.product.listProducts({});
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error: unknown) => {
  // Evita despejar headers/payloads potencialmente sensíveis.
  const message = error instanceof Error ? error.message : "Erro desconhecido";
  console.error("Não foi possível consultar produtos:", message);
  process.exitCode = 1;
});
