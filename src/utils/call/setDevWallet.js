export const setDevWalletIdo = async (idoContract, devWalletAddress) => {
    
    try {
        const tx = await idoContract.setDevWallet(devWalletAddress)
        const receipt = await tx.wait()
        return receipt.status
    } catch (error) {
        console.log(error)
    }
}