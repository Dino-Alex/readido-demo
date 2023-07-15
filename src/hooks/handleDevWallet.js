import { useCallback } from "react";
import { setDevWalletIdo } from "../utils/call/setDevWallet";
import { useIdo } from "../utils/useContract";

const useDevWallet = (devWallet, contractAddress) => {
  const idoContract = useIdo(contractAddress);

  const handleSetDevWallet = useCallback(async () => {
    await setDevWalletIdo(idoContract, devWallet);
  }, [devWallet, idoContract]);

  return { onSetDevWallet: handleSetDevWallet };
};

export default useDevWallet;
