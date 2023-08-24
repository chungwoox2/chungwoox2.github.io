import React, {useState, useEffect} from "react";

const Price = ({rim , chartData}) => {
  const [codeName, setCodeName] = useState("");
  const [filteredRim, setFilteredRim] = useState([]);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const codeName = chartData[0].code_name;
      setCodeName(codeName);

      const filteredRim = rim.filter((item) => item.종목명 === codeName);
      setFilteredRim(filteredRim);
    }
  }, [chartData, rim, codeName]);

  return (
    <div>
      <div className="presentPrice">
        <p>현재가 : </p>
        {filteredRim.map((item, index) => (
          <p key={index}>{item.종가} 원</p>
        ))}
      </div>
      <div className="buyPrice">
        <p>매수적정가 : </p>
        {filteredRim.map((item, index) => (
          <p key={index}>{item.S_RIM_20} 원</p>
        ))}
      </div>
      <div className="sellPrice">
        <p>매도적정가 : </p>
        {filteredRim.map((item, index) => (
          <p key={index}>{item.S_RIM} 원</p>
        ))}
      </div>
    </div>
  );
};

export default Price;
