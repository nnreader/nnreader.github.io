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
      const result = fn.apply(null, arguments);

      sessionStorage.setItem("password", password);

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

async function _getBooks(): Promise<Book[]> {
  const books: Book[] = JSON.parse(rc4.decrypt(meta, password as string).toString(Utf8));

  return books;
}

export const getBooks = successWrap(_getBooks);

async function _getBookInfo(bookIndex: string, onProgress?: onProgress): Promise<{ info: Book; content: string }> {
  const books: Book[] = JSON.parse(rc4.decrypt(meta, password as string).toString(Utf8));

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
    content: rc4.decrypt(resp.data, password as string).toString(Utf8),
  };
}

export const getBookInfo = successWrap(_getBookInfo);
