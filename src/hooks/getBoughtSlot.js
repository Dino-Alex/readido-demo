import { getContract } from "../utils/web3Client";

export const getBoughtSlots = async () => {
  const contract = await getContract();
  const slots = await contract.methods.boughtSlots().call();
  return parseInt(slots);
};
