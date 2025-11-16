import { readdir, rm } from "fs/promises";
import { join } from "path";

async function removeNodeModules(dir: string) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    // Если нашли node_modules — удаляем полностью
    if (entry.isDirectory() && entry.name === "node_modules") {
      console.log("Removing:", fullPath);
      await rm(fullPath, { recursive: true, force: true });
      continue;
    }

    // Рекурсивно обходим вложенные директории
    if (entry.isDirectory()) {
      try {
        await removeNodeModules(fullPath);
      } catch {
        // Игнорируем ошибки (например, права)
      }
    }
  }
}

// Запуск из корня проекта
removeNodeModules(process.cwd())
  .then(() => console.log("Done!"))
  .catch((err) => console.error(err));
