#!/usr/bin/env node
import { cp, mkdir, access, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = basename(scriptDirectory) === "dist"
  ? resolve(scriptDirectory, "..")
  : scriptDirectory;
const skillName = "hellena-skill";
const targetRoot = resolve(process.cwd(), ".agents", "skills", skillName);
const force = process.argv.includes("--force") || process.argv.includes("-f");
const help = process.argv.includes("--help") || process.argv.includes("-h");

function printHelp() {
  console.log("\nHellena Skill installer\n\nUso:\n  npx hellena-skill\n  npx hellena-skill --force\n\nInstala a Agent Skill em .agents/skills/hellena-skill no projeto atual.\nInclui referências de integração, exemplos e assets de demonstração.\nPor omissão, não substitui uma skill existente.\n");
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyDirectoryIfPresent(source: string, destination: string): Promise<void> {
  if (await exists(source)) {
    await cp(source, destination, { recursive: true });
  }
}

async function main() {
  if (help) {
    printHelp();
    return;
  }

  const sourceSkill = join(packageRoot, "SKILL.md");
  if (!(await exists(sourceSkill))) {
    console.error("Não foi possível encontrar SKILL.md no pacote instalado.");
    process.exitCode = 1;
    return;
  }

  if (await exists(targetRoot)) {
    if (!force) {
      console.error("A skill já existe em: " + targetRoot);
      console.error("Não alterei os ficheiros existentes. Para substituir, executa com --force.");
      process.exitCode = 1;
      return;
    }
    await rm(targetRoot, { recursive: true, force: true });
  }

  await mkdir(targetRoot, { recursive: true });
  await cp(sourceSkill, join(targetRoot, "SKILL.md"));
  await copyDirectoryIfPresent(join(packageRoot, "references"), join(targetRoot, "references"));
  await copyDirectoryIfPresent(join(packageRoot, "assets"), join(targetRoot, "assets"));
  await copyDirectoryIfPresent(join(packageRoot, "examples"), join(targetRoot, "examples"));

  console.log("Hellena Skill instalada com sucesso.");
  console.log("Destino: " + targetRoot);
  console.log("Incluídos: SKILL.md, referências, exemplos e assets (quando disponíveis no pacote).");
  console.log("O agente deve suportar Agent Skills e descobrir .agents/skills.");
}

main().catch((error: unknown) => {
  console.error("Falha ao instalar a Hellena Skill:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
