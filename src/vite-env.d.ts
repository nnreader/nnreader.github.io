/// <reference types="vite/client" />

declare module "*.encrypted" {
  const content: string;

  export default content;
}

declare module "*.data" {
  const content: string;

  export default content;
}