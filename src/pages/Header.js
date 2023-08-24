import React, { useEffect, useState } from 'react';
import SearchModal from "../compenents/searchmodal";
import logo from "./img/YUlogo.png";
import { Link } from "react-router-dom";
import "./css/App.css";

/*
    로고는 직접만들라고 했으나 창의력의 한계로 인해 어차피 영남대학교 졸업작품이니 영대로고를 png로 다운로드 받아서 배경만 지워서 사용했습니당
    Header에 있는 'YUlogo' 혹은 'Omega Route'를 클릭시에는 firstpage로 이동이 된다.
*/

function Header(props) {
  const [visible,setVisible] = useState(props.disabledQ);
  return (
    <div id="header">
      <div className="header_container">
        <div className="logo">
          <Link to={props.link}>
            <div className="LogoMain">
              <img src={logo} alt="logo"></img>
              <p>개미집</p>
            </div>
          </Link>
        </div>
      </div>
      <form>
        {visible&&<SearchModal onDataUpdate={props.onDataUpdate}/>}
      </form>
    </div>
  );
}

export default Header;

