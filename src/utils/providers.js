import { ethers } from 'ethers'



const rpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
// 
export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl)

export default null
