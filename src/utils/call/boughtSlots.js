export const getBoughtSlots = async (idoContract) => {
  try {
    const slots = await idoContract.boughtSlots();
    // const receipt = await tx.wait();
    // return receipt.status;
    return slots;
  } catch (error) {
    console.log(error);
  }
};
