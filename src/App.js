import * as React from "react";
import "./pages/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Firstpage from "./pages/firstpage";
import Main from "./pages/Main";
/*
  일단 제일처음에 firstpage부터 실행되고 Link to 로 Firstpage애서 Main으로만 변경이 되는 구조이다.
  그리고 Header에 있는 'YUlogo' 혹은 'Omega Route'를 클릭시에는 firstpage로 이동이 된다.
*/

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={`/`} element={<Firstpage />} />
        <Route path={`/main`} element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
