export declare class Decoder {
  encrypt(text: Uint8Array, key: string): Uint8Array;

  decrypt(text: Uint8Array, key: string): Uint8Array;
}

declare const decoder: Decoder;

export default decoder;
