// tests/ui/buy/data/products.ts
export const products = {
  idea:  { name: 'IntelliJ IDEA', url: 'https://www.jetbrains.com/idea/buy/' },
  clion: { name: 'CLion',         url: 'https://www.jetbrains.com/clion/buy/' },
} as const;

export type ProductKey = keyof typeof products;
