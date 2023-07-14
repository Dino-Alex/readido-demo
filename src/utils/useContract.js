import { useMemo } from "react"
import useActiveWeb3React from "./useActiveWeb3React"
import { getIdoContract } from "./contractHelpers"

export const useIdo = (contractAddress) => {
    const { library } = useActiveWeb3React()
    return useMemo(() => getIdoContract(library, contractAddress), [contractAddress, library])
}