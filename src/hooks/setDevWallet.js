import { getContract } from "../utils/web3Client";

export const setDevWallet = async (walletAddress) => {
  const contract = await getContract();
  const res = await contract.methods
    .setDevWallet("0x2F096f22209Eb6d824203686335b3816762C782d")
    .send({ from: walletAddress });
  console.log("res", res);
};
