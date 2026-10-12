import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skill = await readFile(resolve(root, "SKILL.md"), "utf8");

function fail(message: string): never {
  console.error("Skill inválida: " + message);
  process.exit(1);
}

if (!skill.startsWith("---\n")) fail("falta o início do frontmatter YAML.");
const end = skill.indexOf("\n---\n", 4);
if (end === -1) fail("falta o fecho do frontmatter YAML.");

const frontmatter = skill.slice(4, end);
const name = frontmatter.match(/^name:\s*([^\n]+)$/m)?.[1]?.trim();
const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim();

if (!name) fail("o campo name é obrigatório.");
if (!description) fail("o campo description é obrigatório.");
if (name.length > 64) fail("name ultrapassa 64 caracteres.");
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  fail("name deve usar minúsculas, números e hífen simples.");
}
if (name !== "hellena-skill") fail("name deve corresponder ao diretório desta skill (hellena-skill).");
if (description.length > 1024) fail("description ultrapassa 1024 caracteres.");
if (skill.split("\n").length - 1 > 500) fail("SKILL.md ultrapassa o limite recomendado de 500 linhas.");

const body = skill.slice(end + 5);
const links = [...body.matchAll(/\[[^\]]+\]\((references\/[^)]+)\)/g)].map((match) => match[1]);
for (const link of links) {
  try {
    await readFile(resolve(root, link), "utf8");
  } catch {
    fail("referência local não encontrada: " + link);
  }
}

console.log("Skill Hellena válida: frontmatter, nome, descrição e referências locais verificados.");
