import { hashPair, toPairs } from "./convert";

const merkleProof = (
  txs: string[],
  tx: string,
  proof: [number, string][] = []
): [number, string][] => {
  if (txs.length === 1) {
    return proof;
  }

  const tree: string[] = [];

  toPairs(txs).forEach((pair: string[]) => {
    const hash: string = hashPair(pair[0], pair[1]);

    if (pair.includes(tx)) {
      const idx: number = pair[0] === tx ? 1 : 0;
      proof.push([idx, pair[idx]]);
      console.log(pair);
      console.log('idx', idx);
      console.log('hash', tx);
      tx = hash;
    }

    tree.push(hash);
  });

  return merkleProof(tree, tx, proof);
};

const merkleProofRoot = (proof: [number, string][], tx: string): string =>
  proof.reduce(
    (root, [idx, tx]) => (idx ? hashPair(root, tx) : hashPair(tx, root)),
    tx
  );

export { merkleProof, merkleProofRoot };
