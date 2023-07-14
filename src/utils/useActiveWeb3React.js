import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import { ethers } from 'ethers'



/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const [provider, setprovider] = useState()

  useEffect(() => {
   (async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    setprovider(signer)
   })()
  }, [])

  return { library: provider }
}

export default useActiveWeb3React
