import React, { useEffect, useState } from "react";
import "./App.css";
import { getStartTime, getEndTime } from "./hooks/getPaymentTime";
import { getBoughtSlots } from "./hooks/getBoughtSlot";
import { getStageInfo } from "./hooks/getStageInfo";
import { setDevWallet } from "./hooks/setDevWallet";
import { buyIdo } from "./hooks/buyIdo";
import { getApprove } from "./hooks/getApprove";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isInitialized, setInitial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startTimePayment, setStartTimePayment] = useState("");
  const [endTimePayment, setEndTimePayment] = useState("");
  const [boughtSlots, setBoughtSlots] = useState(0);
  const [stageInfo, setStageInfo] = useState([]);

  // const fetchStageInfo = async () => {
  //   try {
  //     const stageId = 1; // Số hiệu giai đoạn cần truy vấn
  //     const result = await contract.methods.getStageInfo(stageId).call();
  //     // console.log('Kết quả truy vấn:', result);
  //     setStageInfo(result);
  //   } catch (error) {
  //     console.error('Lỗi khi truy vấn thông tin giai đoạn:', error);
  //   }
  // };

  const connectWallet = async () => {
    let provider = window.ethereum;

    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          // selectedAccount = accounts[0];
          setWalletAddress(accounts[0]);
          console.log(`Selected account is ${walletAddress}`);
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      window.ethereum.on("accountsChanged", function (accounts) {
        // selectedAccount = accounts[0];
        setWalletAddress(accounts[0]);
        console.log(`Selected account changed to ${walletAddress}`);
      });
    }
    setInitial(true);
  };

  const handleDevWallet = async () => {
    return setDevWallet(walletAddress);
  };
  const handleApprove = async () => {
    await getApprove(walletAddress);
  };

  const handleBuyIDO = async (quantity) => {
    await buyIdo(walletAddress, quantity);
    await handleBoughtSlots();
  };

  const handleBoughtSlots = async () => {
    const boughtSlots = await getBoughtSlots();
    setBoughtSlots(boughtSlots);
  };

  const handleStageInfo = async () => {
    const stages = await getStageInfo();
    console.log("stages", stages);
    setStageInfo(stages);
  };

  const fetchInformations = async () => {
    try {
      const startTime = await getStartTime();
      setStartTimePayment(startTime);
      const endTime = await getEndTime();
      setEndTimePayment(endTime);
      handleBoughtSlots();
      handleStageInfo();
      setIsLoading(false);
    } catch (error) {
      // Handle error
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInformations();
  }, []);

  useEffect(() => {
    connectWallet();
    // setDevWallet();
  }, [walletAddress]);

  return (
    <div className="App">
      {walletAddress ? (
        <button onClick={handleApprove}>Approve</button>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      <button onClick={() => handleBuyIDO(1)}>Buy IDO</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Start Time: {startTimePayment.toString()}</p>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>End Time: {endTimePayment.toString()}</p>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Purchased: {boughtSlots.toString()}</p>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Available: {(4000 - boughtSlots).toString()}</p>
      )}

      <h1>Truy vấn thông tin giai đoạn</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* <p>Số hiệu giai đoạn: {stageInfo[0].toString()}</p>
          <p>Thời gian bắt đầu: {stageInfo[1].toString()}</p>
          <p>Thời gian kết thúc: {stageInfo[2].toString()}</p>
          <p>Số lượng truy cập: {stageInfo[3].toString()}</p> */}
        </div>
      )}
    </div>
  );
}

export default App;
