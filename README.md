# Hellena Agent Skill

Skill compatível com o formato aberto [Agent Skills](https://agentskills.io/specification), destinada a agentes de IA que precisam de trabalhar com os serviços da plataforma Hellena.

## Conteúdo

    hellena-skill/
    ├── SKILL.md
    ├── references/
    │   ├── integration-and-security.md
    │   └── sdk-reference.md
    ├── scripts/
    │   └── validate-skill.ts
    ├── package.json
    └── README.md

## O que ensina ao agente

- Como escolher entre tools/MCP disponíveis, SDK JavaScript e APIs documentadas.
- Como usar as operações públicas do SDK para produtos, encomendas, portes, cupões, comentários, avaliações, pagamentos e organização.
- Como proteger API keys e dados de clientes.
- Como lidar com operações de escrita, erros e resultados ambíguos sem duplicar encomendas ou pagamentos.
- Como distinguir resultados reais da API de exemplos ou suposições.

## Validação local

Requisitos: Bun.

    bun install
    bun run validate

O validador verifica o frontmatter obrigatório, o nome da skill, limites definidos pela especificação e os links relativos para referências locais. Para validação adicional, podes usar a ferramenta de referência indicada em https://agentskills.io/specification.

## Utilização

A estrutura desta pasta é a skill. Copia a pasta para o diretório de skills reconhecido pelo teu agente, ou aponta o agente para esta pasta segundo as instruções do cliente utilizado. A instalação exata depende do agente; o formato da skill não configura automaticamente credenciais, ferramentas MCP ou permissões da API.

## Segurança

Nunca coloques API keys ou ficheiros .env no repositório. As operações reais dependem das credenciais, ferramentas e permissões configuradas no ambiente do agente.
# hellena-skill

## Assets de teste

- `examples/mock-playground.html`: playground visual autónomo para pesquisar produtos mock, filtrar stock e experimentar respostas de tools conceptuais. Abre o ficheiro diretamente no browser; não faz chamadas à API.
- `examples/sdk-read-products.ts`: exemplo de leitura pelo SDK oficial, para ambiente de servidor com `HELLENA_API_KEY` configurada.
- `assets/fixtures/products.json`: catálogo fictício para testes de agentes e interfaces.
- `assets/fixtures/order-calculation.json`: cenário mock de cálculo de portes e desconto.
- `tests/agent-test-cases.md`: casos para testar segurança, chamadas simuladas, erros e fluxos de encomenda.

**Importante:** fixtures e playground são exclusivamente de demonstração. Nunca usar os seus preços, stock, IDs ou totais como dados reais, nem enviar automaticamente estes fixtures para a API de produção.
