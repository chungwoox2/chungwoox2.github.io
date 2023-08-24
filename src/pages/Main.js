import React, { useState } from "react";
import Chart from "../compenents/chart";
import Stock from "../compenents/stock";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import "./css/App.css";
import BalGul from "../compenents/balgul";
import Price from "../compenents/price";
import Test from "../compenents/test";
import FinancialInfo from "../compenents/financialinfo";
import Recommendation from "../compenents/recommendation";
import Categoryfilter from "../compenents/categoryfilter";
//import SearchModal from '../compenents/searchmodal';
/*
    종목분석과 발굴분석은 알파스퀘어를 최대한 모방할건데
    한 페이지로 한꺼번에 볼 수 있도록만 변경한다.
*/

function Main() {
  const [chartData, setChartData] = useState([]);
  const [finance, setfinance] = useState([]);
  const [recommend, setrecommend] = useState([]);
  const [rim, setrim] = useState([]);
  const handleDataUpdate = (results, finance, recommend, rim) => {
    setChartData(results);
    setfinance(finance);
    setrecommend(recommend);
    setrim(rim);
  };
  console.log(recommend);
  return (
    <div>
      <Header link="/" onDataUpdate={handleDataUpdate} disabledQ="true" />
      <div className="main">
        <div className="main_container">
          <div className="Left">
            <Price rim={rim} chartData={chartData}/>
            <div className="Graph">
              <Chart chartData={chartData} />
            </div>
            <div>
              <Recommendation recommend={recommend} />
            </div>
          </div>
          <div className="Right">
            <div className="first">
              <div className="first_name">종목정보</div>
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="종목요약">
                  <Stock chartData={chartData} rim={rim} />
                </Tab>
                <Tab eventKey="profile" title="재무정보">
                  <FinancialInfo finance={finance} chartData={chartData} recommend={recommend}/>
                </Tab>
              </Tabs>
            </div>
            <div className="second">
              <div className="second_name">발굴분석</div>
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="profile" title="종목필터">
                  <Categoryfilter />
                </Tab>
                <Tab eventKey="home" title="테마종목">
                  <BalGul />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;