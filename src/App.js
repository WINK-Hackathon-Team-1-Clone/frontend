import  { React, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import axios from 'axios';
import RealMain from "./pages/RealMain";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import EditInfo from "./pages/EditInfo";


function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/pages/Main" element={<RealMain/>}></Route>
          <Route path="/pages/SignUp" element={<SignUp/>}></Route>
          <Route path="/pages/MyPage" element={<MyPage/>}></Route>
          <Route path="/pages/EditInfo" element={<EditInfo/>}></Route>




        </Routes>
      </BrowserRouter>
  );
}

export default App;
