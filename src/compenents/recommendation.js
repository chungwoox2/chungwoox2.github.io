import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
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

function Recommendation({recommend}) {
  console.log(recommend);
  return (
    <div id="Recommendation">
      <div className="left">
        {/* <div id="RecommendationResult">Good!</div> */}
        <div id="RecommendationOther">
          <span>거래대금 상위 3개 종목</span>
          <div id="stockLogo_reco">
          {recommend.map((item, index) => (
              <div className="stockLogo" key={index}>
                <img src={stockLogo} alt="stock" />
                <div className="stockContent">
                  <p key={index}>{item.종목명} {formatPrice(item.거래대금)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;