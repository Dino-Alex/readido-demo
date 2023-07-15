import { useCallback } from "react";
import { getBoughtSlots } from "../utils/call/boughtSlots";
import { useIdo } from "../utils/useContract";

const useBoughSlot = (contractAddress) => {
  const idoContract = useIdo(contractAddress);

  const handleBoughtSlot = useCallback(async () => {
    await getBoughtSlots(idoContract);
  }, [idoContract]);

  return { onGetBoughtSlots: handleBoughtSlot };
};

export default useBoughSlot;
