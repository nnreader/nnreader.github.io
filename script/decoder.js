import { createCipheriv, createDecipheriv } from "node:crypto";

export class Decoder {
  constructor(algorithm, iv = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef])) {
    this.algorithm = algorithm;
    this.iv = iv;
  }

  #normalizeKey(key) {
    return new TextEncoder().encode(key.padEnd(32, " "));
  }

  /**
   *
   * @param {Uint8Array} text
   * @param {string} key
   * @returns {Uint8Array}
   */
  encrypt(text, key) {
    const cipher = createCipheriv(this.algorithm, this.#normalizeKey(key), this.iv);
    return combineUint8Arrays(new Uint8Array(cipher.update(text)), new Uint8Array(cipher.final()));
  }

  /**
   *
   * @param {Uint8Array} encryptedText
   * @param {string} key
   * @returns {Uint8Array}
   */
  decrypt(encryptedText, key) {
    const decipher = createDecipheriv(this.algorithm, this.#normalizeKey(key), this.iv);
    return combineUint8Arrays(new Uint8Array(decipher.update(encryptedText)), new Uint8Array(decipher.final()));
  }
}

/**
 *
 * @param  {...Uint8Array} arrays
 */
function combineUint8Arrays(...arrays) {
  const length = arrays.reduce((acc, cur) => acc + cur.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (let i = 0; i < arrays.length; i++) {
    result.set(arrays[i], offset);
    offset += arrays[i].length;
  }
  return result;
}

export default new Decoder("aes-256-cbc");
