import { useMemo } from 'react'
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'

export const useProviderOrSigner = (withSignerIfPossible = true) => {
  const { chain } = useNetwork()
  
  const provider = useProvider({ chain })
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()

  return useMemo(
    () => (withSignerIfPossible && address && isConnected && signer ? signer : provider),
    [address, isConnected, provider, signer, withSignerIfPossible],
  )
}
