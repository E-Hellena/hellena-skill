import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillPath = resolve(root, "SKILL.md");
const skill = await readFile(skillPath, "utf8");

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

async function walkMarkdown(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkMarkdown(path));
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".md") {
      files.push(path);
    }
  }
  return files;
}

const markdownFiles = [
  skillPath,
  ...await walkMarkdown(resolve(root, "references")),
  ...await walkMarkdown(resolve(root, "examples")).catch(() => []),
  resolve(root, "README.md"),
];

for (const markdownPath of markdownFiles) {
  let content: string;
  try {
    content = await readFile(markdownPath, "utf8");
  } catch {
    fail("documento Markdown esperado não encontrado: " + markdownPath);
  }

  const links = [...content.matchAll(/!?(?:\[[^\]]*\])\(([^)]+)\)/g)].map((match) => match[1].trim());
  for (const rawLink of links) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(rawLink)) continue;
    const linkPath = decodeURIComponent(rawLink.split("#", 1)[0].split("?", 1)[0]);
    if (!linkPath || isAbsolute(linkPath)) continue;
    const resolvedLink = resolve(dirname(markdownPath), linkPath);
    const relativePath = relative(root, resolvedLink);
    if (relativePath === ".." || relativePath.startsWith(".." + sep) || isAbsolute(relativePath)) {
      fail("link local sai da pasta do projeto em " + markdownPath + ": " + rawLink);
    }
    try {
      await stat(resolvedLink);
    } catch {
      fail("link local não encontrado em " + markdownPath + ": " + rawLink);
    }
  }
}

console.log(`Skill Hellena válida: frontmatter, nome, limites e links locais verificados em ${markdownFiles.length} documentos Markdown.`);
