import axios from "axios";
import rc4 from "crypto-js/rc4";
import Utf8 from "crypto-js/enc-utf8";
import meta from "../assets/meta.data?raw";

export interface Book {
  index: string;
  name: string;
  size: number;
}

type onProgress = (percent: number) => void;

let password: string | null = null;

// 固定IV值，与Node.js中相同
const fixedIV = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]);

const iv = Utf8.parse(new TextDecoder().decode(fixedIV).toString());

function decrypt(content: string): string {
  const key = Utf8.parse(password as string);
  return rc4.decrypt(content, key, { iv: iv }).toString(Utf8);
}

function requirePassword() {
  password = sessionStorage.getItem("password") ?? window.prompt("请输入密码");

  if (!password) {
    alert("未输入密码");

    throw new Error("未输入密码");
  }

  return password;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function successWrap<T extends Function>(fn: T): T {
  // @ts-expect-error ignore
  return async function () {
    password = requirePassword();

    try {
      // eslint-disable-next-line prefer-spread, prefer-rest-params
      const result = await fn.apply(null, arguments);

      sessionStorage.setItem("password", password);

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

async function _getBooks(): Promise<Book[]> {
  const books: Book[] = JSON.parse(decrypt(meta));

  return books;
}

export const getBooks = successWrap(_getBooks);

async function _getBookInfo(bookIndex: string, onProgress?: onProgress): Promise<{ info: Book; content: string }> {
  const books: Book[] = JSON.parse(decrypt(meta));

  const bookInfo = books.find((v) => v.index === bookIndex);

  if (!bookInfo) throw new Error("未找到数据");

  const url = new URL(`resources/${bookIndex}.txt`, location.href).toString();

  const resp = await axios.get<string>(url, {
    onDownloadProgress: (e) => {
      const percent = e.total ? Math.floor((e.loaded / e.total) * 100) : 0;

      onProgress?.(percent);
    },
  });

  return {
    info: bookInfo,
    content: decrypt(resp.data),
  };
}

export const getBookInfo = successWrap(_getBookInfo);
