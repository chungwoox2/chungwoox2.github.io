import React, { useState, useEffect } from "react";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/css/App.css";
    
const FinancialInfo = ({ finance, chartData }) => {
  const [data, setData] = useState([]);
  const columns = ["IFRS", "2020/12", "2021/12", "2022/12", "2023/12(E)"];
  const [codeName, setCodeName] = useState("");
  useEffect(() => {
    const extractedData = finance.map((row) => ({
      IFRS: row.IFRS,
      "2020/12": row["2020/12"],
      "2021/12": row["2021/12"],
      "2022/12": row["2022/12"],
      "2023/12(E)": row["2023/12(E)"],
    }));
    setData(extractedData);
  }, [finance]);
  useEffect(() => {
    if (chartData && chartData.length > 0){
      const codeName = chartData[0].code_name;
      setCodeName(codeName);
    }
  }, [chartData]);
  return (
    <div id="FinancialInfo">
      <div className="stockLogo_small">
        <img src={stockLogo} alt="stock" />
        <div className="stockContent">
          <p>{codeName}</p>
        </div>
      </div>
      <table className="stockTable">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};    
export default FinancialInfo;