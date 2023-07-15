import { getContract } from "../utils/web3Client";

export const getStageInfo = async () => {
  //   const stageNumber = await contract.methods.totalStages().call();
  //   console.log("stageNumber", stageNumber);
  const stages = [];
  const contract = await getContract();
  for (let index = 0; index < 4; index++) {
    const stage = await contract.methods.getStageInfo(index).call();
    console.log("stage ", stage);
    stages.push(stage);
  }
  return stages;
};
