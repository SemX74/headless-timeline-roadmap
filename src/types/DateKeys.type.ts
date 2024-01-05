export type DateKeys<T> = {
  [K in keyof T]: T[K] extends Date ? K : never;
}[keyof T];
