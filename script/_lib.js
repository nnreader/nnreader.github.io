import { readdirSync, existsSync, rmSync, mkdirSync, renameSync, readFileSync, writeFileSync, statSync, utimesSync, createReadStream } from "node:fs";
import { stat as _stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import process from "node:process";

import decoder from "./decoder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, "..");
const RESOURCE = join(ROOT_DIR, "resources");
const outputAssetsDir = join(ROOT_DIR, "public", "resources");
const META_FILE_PATH = join(ROOT_DIR, "src", "assets", "meta.data");

const meta = [];
const password = process.env.BOOK_PASSWORD;

if (!password) throw new Error("not found password");

export async function generate() {
  const items = readdirSync(RESOURCE)
    .filter((v) => /\.txt$/.test(v))
    .sort();

  if (existsSync(outputAssetsDir)) rmSync(outputAssetsDir, { recursive: true });
  mkdirSync(outputAssetsDir);

  for (let item of items) {
    let filePath = join(RESOURCE, item);

    if (item.startsWith(" ") || item.endsWith(" ") || (item.includes("《") && item.includes("》")) || (item.includes("【") && item.includes("】"))) {
      item = item.replace(/(《|【)(.*?)(》|】)/, (match, p1, p2) => p2).trim();

      const newFilePath = join(RESOURCE, item);

      renameSync(filePath, newFilePath);

      filePath = newFilePath;
    }

    const stat = await _stat(filePath);
    const hash = await md5(filePath);

    meta.push({
      index: hash,
      name: item,
      size: stat.size,
      atime: stat.atime,
      mtime: stat.mtime,
    });

    const fileContent = readFileSync(filePath);

    writeFileSync(join(outputAssetsDir, hash + ".txt"), decoder.encrypt(new Uint8Array(fileContent), password));
  }

  const plaintext = JSON.stringify(meta);

  writeFileSync(META_FILE_PATH, decoder.encrypt(new TextEncoder().encode(plaintext), password));
}

export async function restore() {
  const metaContent = readFileSync(META_FILE_PATH);

  const meta = JSON.parse(new TextDecoder().decode(decoder.decrypt(new Uint8Array(metaContent), password)));

  if (existsSync(RESOURCE)) {
    rmSync(RESOURCE, { recursive: true });
  } else {
    mkdirSync(RESOURCE);
  }

  for (const item of meta) {
    const rawContent = readFileSync(join(outputAssetsDir, item.index + ".txt"));

    const content = decoder.decrypt(new Uint8Array(rawContent), password);

    const dest = join(RESOURCE, item.name);

    try {
      statSync(RESOURCE);
    } catch {
      mkdirSync(RESOURCE);
    }

    writeFileSync(dest, content);

    utimesSync(dest, new Date(item.atime), new Date(item.mtime));
  }
}

function md5(filePath) {
  const hash = createHash("md5");
  const readStream = createReadStream(filePath);

  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  return new Promise((resolve, reject) => {
    readStream.on("end", () => {
      const md5Hash = hash.digest("hex");
      resolve(md5Hash);
    });

    readStream.on("error", reject);
  });
}
