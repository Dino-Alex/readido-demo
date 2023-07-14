import { ethers } from 'ethers'
import { simpleRpcProvider } from './providers'
import idoAbi from "../idoAbi.json"

const getContract = (abi, address, signer) => {
    const signerOrProvider = signer ?? simpleRpcProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}

export const getIdoContract = (signer, contractAddress) => {
    return getContract(idoAbi, contractAddress, signer)
}