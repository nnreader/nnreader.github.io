import axios, { AxiosProgressEvent } from "axios";
import metaURL from "../assets/meta.data?url";

import decoder from "../../script/decoder";

export interface Book {
  index: string;
  name: string;
  size: number;
  atime: string;
  mtime: string;
}

type onProgress = (event: AxiosProgressEvent) => void;

let password: string = "";

function requirePassword() {
  password = sessionStorage.getItem("password") ?? window.prompt("请输入密码") ?? "";

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
  const resp = await axios.get(metaURL, { responseType: "arraybuffer" });

  const raw = decoder.decrypt(new Uint8Array(resp.data), password);

  const books: Book[] = JSON.parse(new TextDecoder().decode(raw));

  return books.sort((a, b) => new Date(a.mtime).getTime() - new Date(b.mtime).getTime() > 0 ? -1 : 1);
}

export const getBooks = successWrap(_getBooks);

async function _getBookInfo(bookIndex: string, onProgress?: onProgress): Promise<{ info: Book; content: string }> {
  const books = await _getBooks();

  const bookInfo = books.find((v) => v.index === bookIndex);

  if (!bookInfo) throw new Error("未找到数据");

  const base = process.env.NODE_ENV === "production" ? "https://cdn.jsdelivr.net/gh/nnreader/nnreader.github.io@gh-pages/" : location.origin;

  const url = new URL(`resources/${bookIndex}.txt`, base).toString();

  const resp = await axios.get<Uint8Array>(url, {
    onDownloadProgress: (e) => {
      onProgress?.(e);
    },
    responseType: "arraybuffer",
  });

  return {
    info: bookInfo,
    content: new TextDecoder().decode(decoder.decrypt(new Uint8Array(resp.data), password)),
  };
}

export const getBookInfo = successWrap(_getBookInfo);
