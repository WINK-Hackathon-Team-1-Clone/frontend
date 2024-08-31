import  { React, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import axios from 'axios';


function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
