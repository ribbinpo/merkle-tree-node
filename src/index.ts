import { hashPair, toPairs } from "./utils/convert";
import { merkleProof, merkleProofRoot } from "./utils/merkle";

const fetchLastBlock = async () => {
  const r = await fetch("https://blockchain.info/q/latesthash?cors=true");
  return await r.text();
};

const fetchMerkleRootAndTransactions = async (blockHash: string) => {
  const raw = await fetch(
    `https://blockchain.info/rawblock/${blockHash}?cors=true`
  );
  const res = await raw.json();
  const data = [res.mrkl_root, res.tx.map((tx: any) => tx.hash)];
  return data;
};

const random = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const main = async () => {
  const hash = await fetchLastBlock();
  const txData = await fetchMerkleRootAndTransactions(hash);
  const tx = random(txData[1]);
  const proof = merkleProof(txData[1], tx);
  const isValid = merkleProofRoot(proof, tx) === txData[0];

  console.log(merkleProofRoot(proof, tx), txData[0]);
  console.log(`Transaction: ${tx} is ${isValid ? "valid" : "invalid"}`);
};

main();
