import React, { useEffect,useState  } from 'react';
import './App.css';
import contract from './ido';

function App() {
  const [stageInfo, setStageInfo] = useState(null);

  useEffect(() => {
    const fetchStageInfo = async () => {
      try {
        const stageId = 1; // Số hiệu giai đoạn cần truy vấn
        const result = await contract.methods.getStageInfo(stageId).call();
        console.log('Kết quả truy vấn:', result);
        setStageInfo(result);
      } catch (error) {
        console.error('Lỗi khi truy vấn thông tin giai đoạn:', error);
      }
    };

    fetchStageInfo();
  }, []);

  return (
    <div className="App">
      <h1>Truy vấn thông tin giai đoạn</h1>
      {stageInfo && (
        <div>
          <p>Số hiệu giai đoạn: {stageInfo[0]}</p>
          <p>Thời gian bắt đầu: {stageInfo[1]}</p>
          <p>Thời gian kết thúc: {stageInfo[2]}</p>
          <p>Số lượng truy cập: {stageInfo[3]}</p>
        </div>
      )}
    </div>
  );
}


export default App;
