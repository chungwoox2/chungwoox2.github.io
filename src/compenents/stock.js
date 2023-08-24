import React, { useState, useEffect } from "react";
import Theme from "./theme";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "../pages/css/App.css";

const formatPrice = (price) => {
  const trillion = 1000000000000;
  const billion = 100000000;

  if (price >= trillion) {
    return `${(price / trillion).toFixed(0)}조 ${(price % trillion / billion).toFixed(0)}억`;
  } else if (price >= billion) {
    return `${(price / billion).toFixed(0)}억`;
  } else {
    return `${price}원`;
  }
};

function Stock({ chartData, rim }) {
  const [codeName, setCodeName] = useState("");
  const [code, setCode] = useState("");
  const [filteredRim, setFilteredRim] = useState([]);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const codeName = chartData[0].code_name;
      setCodeName(codeName);
      const code = chartData[0].code;
      setCode(code);
    }

    const filteredRim = rim && rim.filter((item1) => item1.종목명 === codeName);
    setFilteredRim(filteredRim);
  }, [rim]);

  return (
    <div className="stockInfo">
      <div className="stockLogo">
        <img src={stockLogo} alt="stock" />
        <div className="stockContent">
          <p>{codeName}</p>
          <p className="cospi">종목번호 {code}</p>
        </div>
      </div>
      <div className="themeLayout">
        <Theme />
      </div>
      <table className="stockTable">
        <tbody>
          <tr>
            <td>적정주가</td>
            {filteredRim && filteredRim.map((item1, index) => (
              <p key={index}>{item1.S_RIM_10} 원</p>
            ))}
          </tr>
          <tr>
            <td>[현재가 / 매수적정가] 괴리율</td>
            {filteredRim && filteredRim.map((item1, index) => (
              <p key={index}>{item1.S_RIM_difr.toFixed(2)} %</p>
            ))}
          </tr>
          <tr>
            <td>거래대금</td>
            {filteredRim && filteredRim.map((item1, index) => (
              <p key={index}>{formatPrice(item1.거래대금)}원</p>
            ))}
          </tr>
          <tr>
            <td>업종</td>
            {filteredRim && filteredRim.map((item1, index) => (
              <p key={index}>{item1.업종}</p>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Stock;




