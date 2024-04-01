/* eslint-disable */
const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const CryptoJS = require("crypto-js");

const ROOT_DIR = path.join(__dirname, "..");
const RESOURCE = path.join(ROOT_DIR, "resources");
const outputAssetsDir = path.join(ROOT_DIR, "public", "resources");
const META_FILE_PATH = path.join(ROOT_DIR, "src", "assets", "meta.data");

const meta = [];
const password = process.env.BOOK_PASSWORD;

// 固定IV值，与Node.js中相同
const fixedIV = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]);

const iv = CryptoJS.enc.Utf8.parse(new TextDecoder().decode(fixedIV).toString());

if (!password) throw new Error("not found password");

async function generate() {
  const items = fs
    .readdirSync(RESOURCE)
    .filter((v) => /\.txt$/.test(v))
    .sort();

  if (fs.existsSync(outputAssetsDir)) fs.rmSync(outputAssetsDir, { recursive: true });
  fs.mkdirSync(outputAssetsDir);

  for (let item of items) {
    let filePath = path.join(RESOURCE, item);

    if ((item.includes("《") && item.includes("》")) || (item.includes("【") && item.includes("】"))) {
      item = item.replace(/(《|【)(.*?)(》|】)/, (match, p1, p2, p3) => {
        return p2;
      });

      const newFilePath = path.join(RESOURCE, item);

      fs.renameSync(filePath, newFilePath);

      filePath = newFilePath;
    }

    const stat = await fsPromise.stat(filePath);
    const hash = await md5(filePath);

    meta.push({
      index: hash,
      name: item,
      size: stat.size,
    });

    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    fs.writeFileSync(path.join(outputAssetsDir, hash + ".txt"), encrypt(fileContent));
  }

  const plaintext = JSON.stringify(meta);

  fs.writeFileSync(META_FILE_PATH, encrypt(plaintext));
}

async function restore() {
  const meta = JSON.parse(decrypt(fs.readFileSync(META_FILE_PATH, { encoding: "utf-8" })));

  if (fs.existsSync(RESOURCE)) {
    fs.rmSync(RESOURCE, { recursive: true});
  } else {
    fs.mkdirSync(RESOURCE);
  }

  for (const item of meta) {
    const rawContent = fs.readFileSync(path.join(outputAssetsDir, item.index + ".txt"), { encoding: "utf-8" });

    const content = decrypt(rawContent);

    const dest = path.join(RESOURCE, item.name);

    fs.writeFileSync(dest, content);
  }
}

function encrypt(content) {
  const key = CryptoJS.enc.Utf8.parse(password);
  return CryptoJS.RC4.encrypt(content, key, {
    iv: iv,
  }).toString();
}

function decrypt(content) {
  const key = CryptoJS.enc.Utf8.parse(password);
  return CryptoJS.RC4.decrypt(content, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);
}

function md5(filePath) {
  const hash = crypto.createHash("md5");
  const readStream = fs.createReadStream(filePath);

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

module.exports = {
  generate,
  restore,
};
