import { sha256 } from 'js-sha256';

const toBytes = (hex: string) => {
  return hex
    .match(/../g)
    ?.reduce<number[]>((acc, hex) => [...acc, parseInt(hex, 16)], []);
};

const toHex = (bytes: number[]) => {
  return bytes.reduce<string>(
    (acc, byte) => acc + byte.toString(16).padStart(2, "0"),
    ""
  );
};

const toPairs = (arr: string[]) => {
  return Array.from(Array(Math.ceil(arr.length / 2)), (_: number, i: number) =>
    arr.slice(i * 2, i * 2 + 2)
  );
};

const hashPair = (a: string, b: string = a): string => {
  const bytes = toBytes(`${b}${a}`)?.reverse();
  if (!bytes) throw new Error("Invalid bytes");
  const hashed = sha256.array(sha256.array(bytes));
  return toHex(hashed.reverse());
}

export { toBytes, toHex, toPairs, hashPair };