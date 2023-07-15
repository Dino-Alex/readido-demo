import { getPaymentContract } from "../utils/web3Client";

export const getApprove = async (walletAddress) => {
  const contract = await getPaymentContract();
  //   const weiValue = web3.utils.toWei(1, "ether");
  const transaction = await contract.methods
    .approve("0x56F803CDe2c37883a5D20aEd7Cb7C8d24F03e295", 1)
    .send({ from: walletAddress });
  console.log("Transaction", transaction);
  return transaction;
};
