import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import useIdoContract from './hooks/ido';
import contract from './ido';
import { buyIDO } from './utils/buyIdo';

function App() {
  const [stageInfo, setStageInfo] = useState(null);
  const [slotsPerUser, setSlotsPerUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const contractAddress = "0x56F803CDe2c37883a5D20aEd7Cb7C8d24F03e295"
  const handleConnectWallet = async () => {
    const connectedAddress = await connectWallet();
    if (connectedAddress) {
      setWalletAddress(connectedAddress);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        return null;
      }
    } else {
      console.error('No wallet detected');
      return null;
    }
  };
  const { onSetDevWallet } = useIdoContract("0x2F096f22209Eb6d824203686335b3816762C782d", contractAddress)

  const handleBuyIDO = async () => {
    if (walletAddress) {
      const status = await buyIDO(2,walletAddress);
      console.log(status);
      // setTransactionStatus(status);
    } else {
      console.error('No wallet connected');
    }
  };

  const fetchSlotsPerUser = async () => {
    // const walletAddress = await getConnectedWalletAddress();
    try {
      const result = await contract.methods.slotsPerUser(walletAddress).call();
      console.log('wallet', walletAddress);
      console.log('result', result);
      setSlotsPerUser(result);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const fetchStageInfo = async () => {
    try {
      const stageId = 1; // Số hiệu giai đoạn cần truy vấn
      const result = await contract.methods.getStageInfo(stageId).call();
      // console.log('Kết quả truy vấn:', result);
      setStageInfo(result);
    } catch (error) {
      console.error('Lỗi khi truy vấn thông tin giai đoạn:', error);
    }
  };

  useEffect(() => {
    fetchSlotsPerUser();
    fetchStageInfo();
  }, [walletAddress]);

  return (
    <div className="App">
      {walletAddress ? (
        <p>Connected Wallet Address: {walletAddress}</p>
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}
      <button onClick={onSetDevWallet}>Buy</button>
      <h1>Slots Per User</h1>
      {slotsPerUser && console.log('slots', slotsPerUser)}
      {slotsPerUser ? (<p>{slotsPerUser.toString()}</p>) : (<p>0</p>)}
      <h1>Truy vấn thông tin giai đoạn</h1>
      {stageInfo && (
        <div>
          <p>Số hiệu giai đoạn: {stageInfo[0].toString()}</p>
          <p>Thời gian bắt đầu: {stageInfo[1].toString()}</p>
          <p>Thời gian kết thúc: {stageInfo[2].toString()}</p>
          <p>Số lượng truy cập: {stageInfo[3].toString()}</p>
        </div>
      )}
    </div>
  );
}


export default App;
