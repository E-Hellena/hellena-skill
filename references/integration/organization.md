# Organização

O recurso está disponível em `hellena.organization`.

> Estes dois métodos utilizam os caminhos `/organization/info` e `/organization/links` diretamente no URL base configurado no cliente, sem o prefixo de versão REST `/v1`. Confirma que estes endpoints estão publicados e acessíveis no ambiente da tua API.

## `organization.getOrganizationInfo()`

Obtém informações da organização, incluindo os campos tipados `id`, `name`, `slug`, dados opcionais de contacto e a informação de shopping quando disponível.

```ts
const organization = await hellena.organization.getOrganizationInfo();
console.log(organization.name, organization.slug, organization.shopping?.banners);
```

Endpoint usado: `GET /organization/info`.

## `organization.getOrganizationSocialLinks()`

Obtém a lista de links sociais da organização. Cada item tem `name` e `link`.

```ts
const links = await hellena.organization.getOrganizationSocialLinks();
for (const item of links) console.log(item.name, item.link);
```

Endpoint usado: `GET /organization/links`.

Estes métodos lançam um erro genérico com o código HTTP quando a resposta não é bem-sucedida; ao contrário do transporte REST comum, atualmente não lançam `HellenaAPIError`.

## Exemplo executável

Executa `node docs/examples/organization.mjs`.
