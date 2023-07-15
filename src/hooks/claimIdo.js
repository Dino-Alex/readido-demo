import { getContract } from "../utils/web3Client";

export const claimIdo = async (walletAddress, stageId) => {
  const contract = await getContract();
  return contract.methods.claimIDO(stageId).send({ from: walletAddress });
};
