import { getContract } from "../utils/web3Client";

export const buyIdo = async (walletAddress, quantity) => {
  const quantityInt = parseInt(quantity);
  if (quantityInt == 0) {
    return 0;
  }
  const contract = await getContract();
  const slots = parseInt(
    await contract.methods.slotsPerUser(walletAddress).call()
  );
  if (slots + quantityInt > 10) {
    return 11;
  }
  return await contract.methods
    .buyIDO(quantityInt)
    .send({ from: walletAddress });
};
