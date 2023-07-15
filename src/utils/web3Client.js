import Web3 from "web3";
import abi from "../abi/abi.json";
import paymentAbi from "../abi/paymentAbi.json";

export const getContract = async () => {
  const contractAddress = "0x56F803CDe2c37883a5D20aEd7Cb7C8d24F03e295";
  const web3 = new Web3(window.ethereum);

  const networkId = await web3.eth.net.getId();
  console.log(networkId);

  const contract = new web3.eth.Contract(abi, contractAddress);
  return contract;
};

export const getPaymentContract = async () => {
  const contractAddress = "0x1d9214523f53CEF4D4770D404a5d8cce4Ef43C5d";
  const web3 = new Web3(window.ethereum);

  const paymentContract = new web3.eth.Contract(paymentAbi, contractAddress);
  return paymentContract;
};
