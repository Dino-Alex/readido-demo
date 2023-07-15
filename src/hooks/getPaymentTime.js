import { getContract } from "../utils/web3Client";

export const getStartTime = async () => {
  const contract = await getContract();
  return contract.methods.startTimePayment().call();
};

export const getEndTime = async () => {
  const contract = await getContract();
  return contract.methods.endTimePayment().call();
};
