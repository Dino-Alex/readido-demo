import contract from '../ido';

export const buyIDO = async (quantity, wallet) => {
  try {
    console.log('buyWallet',wallet);
    await contract.methods.buyIDO(quantity).send({ from: wallet });
    return 'Transaction successful';
  } catch (error) {
    console.error('Error buying IDO:', error);
    return 'Transaction failed';
  }
};
