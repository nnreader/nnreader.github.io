import { ZipReader, TextWriter, Uint8ArrayReader, Uint8ArrayWriter } from "@zip.js/zip.js";
import axios from "axios";
import zipURL from "../../books/books.zip";

let cachedZip: ZipReader<unknown> | void;

type onProgress = (percent: number) => void;

async function readZipFile(filePath: string, onProgress?: onProgress): Promise<ZipReader<unknown>> {
  const password = sessionStorage.getItem("password") ?? window.prompt("请输入密码");

  if (!password) {
    alert("未输入密码");

    throw new Error("未输入密码");
  }

  const resp = await axios.get<ArrayBuffer>(filePath, {
    responseType: "arraybuffer",
    onDownloadProgress: (e) => {
      const percent = e.total ? Math.floor((e.loaded / e.total) * 100) : 0;

      onProgress?.(percent);
    },
  });

  const decode = (buff: Uint8Array) => {
    if (!password) throw new Error("invalid password");

    const zip = new ZipReader(new Uint8ArrayReader(buff), { filenameEncoding: "utf8", password: password });

    return zip;
  };

  const outerZip = decode(new Uint8Array(resp.data));

  const entries = await outerZip.getEntries();

  const entry = entries[0];

  const writer = new Uint8ArrayWriter();

  await entry.getData?.(writer);

  const blob = await writer.getData();

  const innerZip = decode(blob);

  sessionStorage.setItem("password", password);

  cachedZip = innerZip;

  return innerZip;
}

export async function getBooks(onProgress?: onProgress): Promise<string[]> {
  const zip = cachedZip ?? (await readZipFile(zipURL, onProgress));

  const entries = await zip.getEntries();

  return entries.map((v) => v.filename);
}

export async function getBookContent(bookName: string, onProgress?: onProgress): Promise<string> {
  const zip = cachedZip ?? (await readZipFile(zipURL, onProgress));

  const entries = await zip.getEntries();

  const entry = entries.find((v) => v.filename === bookName);

  if (!entry) {
    throw new Error(`can not found book '${bookName}'`);
  }

  const writer = new TextWriter();

  await entry.getData?.(writer);

  return writer.getData();
}
