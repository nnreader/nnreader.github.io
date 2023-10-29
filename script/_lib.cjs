/* eslint-disable */
const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const rc4 = require("crypto-js/rc4");
const Utf8 = require("crypto-js/enc-utf8");

const ROOT_DIR = path.join(__dirname, "..");
const RESOURCE = path.join(ROOT_DIR, "resources");
const outputAssetsDir = path.join(ROOT_DIR, "public", "resources");
const META_FILE_PATH = path.join(ROOT_DIR, "src", "assets", "meta.data");

const meta = [];
const password = process.env.BOOK_PASSWORD;

if (!password) throw new Error('not found password')

async function generate() {
  const items = fs
    .readdirSync(RESOURCE)
    .filter((v) => /\.txt$/.test(v))
    .sort();

  if (fs.existsSync(outputAssetsDir)) fs.rmdirSync(outputAssetsDir, { recursive: true });
  fs.mkdirSync(outputAssetsDir);

  for (const item of items) {
    const filePath = path.join(RESOURCE, item);

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
    fs.rmdirSync(RESOURCE);
  } else {
    fs.mkdirSync(RESOURCE);
  }

  console.log(RESOURCE)

  for (const item of meta) {
    const rawContent = fs.readFileSync(path.join(outputAssetsDir, item.index + ".txt"), { encoding: "utf-8" });

    const content = decrypt(rawContent);

    const dest = path.join(RESOURCE, item.name);

    fs.writeFileSync(dest, content);
  }
}

function encrypt(content) {
  return rc4.encrypt(content, password).toString();
}

function decrypt(content) {
  return rc4.decrypt(content, password).toString(Utf8);
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
