import { BlobReader, ZipReader, TextWriter, BlobWriter } from "@zip.js/zip.js";
import zipURL from "../../books/books.zip";

let cachedZip: ZipReader<unknown> | void;

async function readZipFile(filePath: string): Promise<ZipReader<unknown>> {
  const response = await fetch(filePath);

  const password = sessionStorage.getItem("password") ?? window.prompt("请输入密码");

  if (!password) {
    alert("未输入密码");

    throw new Error("未输入密码");
  }

  const decode = (zipBlob: Blob) => {
    if (!password) throw new Error("invalid password");

    const zip = new ZipReader(new BlobReader(zipBlob), { filenameEncoding: "utf8", password: password });

    return zip;
  };

  const outerZip = decode(await response.blob());

  const entries = await outerZip.getEntries();

  const entry = entries[0];

  const writer = new BlobWriter();

  await entry.getData?.(writer);

  const blob = await writer.getData();

  const innerZip = decode(blob);

  sessionStorage.setItem("password", password);

  cachedZip = innerZip;

  return innerZip;
}

export async function getBooks(): Promise<string[]> {
  const zip = cachedZip ?? (await readZipFile(zipURL));

  const entries = await zip.getEntries();

  return entries.map((v) => v.filename);
}

export async function getBookContent(bookName: string): Promise<string> {
  const zip = cachedZip ?? (await readZipFile(zipURL));

  const entries = await zip.getEntries();

  const entry = entries.find((v) => v.filename === bookName);

  if (!entry) {
    throw new Error(`can not found book '${bookName}'`);
  }

  const writer = new TextWriter();

  await entry.getData?.(writer);

  return writer.getData();
}
