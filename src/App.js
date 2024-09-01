import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import EditInfo from "./pages/EditInfo";
import Map from "./pages/Map";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";


function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/pages/Login" element={<Login/>}></Route>
          <Route path="/pages/SignUp" element={<SignUp/>}></Route>
          <Route path="/pages/MyPage" element={<MyPage/>}></Route>
          <Route path="/pages/EditInfo" element={<EditInfo/>}></Route>
          <Route path="/pages/Map" element={<Map />}></Route>
          <Route path="/pages/ArticleList" element={<ArticleList />}></Route>
          <Route path="/pages/ArticleDetail/:id" element={<ArticleDetail />}></Route>


        </Routes>
      </BrowserRouter>
  );
}

export default App;
