import { strict as assert } from "assert";
import test from "node:test";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";

import "browserify-aes";
import decoder from "./decoder.js";
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("Decoder class", async (t) => {
  const key = "my-secret-key-1234567890123456"; // 密钥必须是 32 字节（256 位）
  const text = "Hello, this is a secret message!";
  const textUint8Array = new TextEncoder().encode(text);

  await t.test("should encrypt and decrypt text correctly", () => {
    // 加密
    const encrypted = decoder.encrypt(textUint8Array, key);
    assert(encrypted instanceof Uint8Array, "Encrypted result should be a Uint8Array");

    // 解密
    const decrypted = decoder.decrypt(encrypted, key);
    const decryptedText = new TextDecoder().decode(decrypted);
    assert.strictEqual(decryptedText, text, "Decrypted text should match the original text");
  });

  await t.test("should handle different keys correctly", () => {
    const wrongKey = "wrong-secret-key-1234567890123456";

    // 加密
    const encrypted = decoder.encrypt(textUint8Array, key);

    // 解密使用错误的密钥
    assert.throws(
      () => {
        decoder.decrypt(encrypted, wrongKey);
      },
      /error/i,
      "Decryption with wrong key should throw an error"
    );
  });
});

test("Decoder via read file", () => {
  const key = process.env.BOOK_PASSWORD;
  const text = readFileSync(path.join(__dirname, "../public/resources/0b2260c463e21b4c59a5581beae77691.txt"));
  const text2 = readFileSync(path.join(__dirname, "../public/resources/0b2260c463e21b4c59a5581beae77691.txt"), "utf-8");

  const textUint8Array = new Uint8Array(text);
  console.log(textUint8Array, new Uint8Array(Buffer.from(text2, "utf-8")), new TextEncoder().encode(text2));

  const decrypted = decoder.decrypt(textUint8Array, key);
  const decryptedText = new TextDecoder().decode(decrypted);

  assert(typeof decryptedText, "string");
});
