/// <reference types="vite/client" />

declare module "*.encrypted" {
  const content: string;

  export default content;
}

declare module "*.zip" {
  const content: string;

  export default content;
}