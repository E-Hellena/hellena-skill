# Hellena Agent Skill

Skill compatível com o formato aberto [Agent Skills](https://agentskills.io/specification), destinada a agentes de IA que precisam de trabalhar com os serviços da plataforma Hellena.

## Estrutura do projeto

```text
hellena-skill/
├── SKILL.md
├── index.ts
├── package.json
├── references/
│   ├── integration/
│   │   ├── README.md
│   │   ├── getting-started.md
│   │   ├── products.md
│   │   ├── orders.md
│   │   ├── comments.md
│   │   ├── ratings.md
│   │   ├── payments.md
│   │   ├── organization.md
│   │   └── rest-graphql-errors.md
│   ├── integration-and-security.md
│   ├── sdk-reference.md
│   └── mcp-tools.md
├── assets/
│   └── fixtures/
├── examples/
├── scripts/
└── tests/
```

## Documentação de integração

A documentação específica do SDK está em [references/integration/README.md](references/integration/README.md). Inclui instalação e configuração, produtos, encomendas, comentários, avaliações, pagamentos, organização, REST, GraphQL e tratamento de erros.

A referência geral, segurança e catálogo conceptual MCP estão disponíveis em [references/sdk-reference.md](references/sdk-reference.md), [references/integration-and-security.md](references/integration-and-security.md) e [references/mcp-tools.md](references/mcp-tools.md).

## O que ensina ao agente

- Como escolher entre tools/MCP disponíveis, SDK JavaScript e APIs documentadas.
- Como usar as operações públicas do SDK para produtos, encomendas, portes, cupões, comentários, avaliações, pagamentos e organização.
- Como proteger API keys e dados de clientes.
- Como lidar com operações de escrita, erros e resultados ambíguos sem duplicar encomendas ou pagamentos.
- Como distinguir resultados reais da API de exemplos ou suposições.

## Assets e exemplos

- `assets/fixtures/`: fixtures JSON para testes e demonstrações. Os conteúdos podem variar conforme os fixtures disponíveis no checkout; confirma sempre os ficheiros antes de os usar.
- `examples/`: exemplos TypeScript de integração; o índice e as instruções de execução estão em [examples/README.md](examples/README.md).
- `tests/agent-test-cases.md`: casos de teste para segurança, chamadas simuladas, erros e fluxos de encomenda.

Fixtures e exemplos são material de demonstração. Nunca uses preços, stock, IDs ou totais de exemplo como dados reais, nem envies automaticamente fixtures para a API de produção.

## Validação local

Requisitos: Bun.

```bash
bun install
bun run validate
npm run build
npm run pack
```

O validador verifica o frontmatter obrigatório, o nome da skill, os limites definidos pela especificação e os links relativos para ficheiros Markdown locais. O processo de empacotamento executa a validação e o build automaticamente.

## Instalação da skill com npx

Depois de publicar o pacote no npm, executa no projeto onde queres instalar a skill:

```bash
npx hellena-skill
```

A instalação cria `.agents/skills/hellena-skill/` e copia `SKILL.md`, `references/`, `assets/` e `examples/` que estejam incluídos no pacote. Por omissão, não substitui uma instalação existente. Para substituir intencionalmente:

```bash
npx hellena-skill --force
```

O pacote chama-se `hellena-skill` (nome npm não scoped). O executável requer Node.js 22.6 ou superior.

## Segurança

Nunca coloques API keys ou ficheiros `.env` no repositório. As operações reais dependem das credenciais, ferramentas e permissões configuradas no ambiente do agente.
