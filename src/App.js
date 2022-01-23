import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./libs/consts";
import MainPage from "./pages/MainPage";
import LeftMenu from "./components/LeftMenu";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import CrawlingPage from "./pages/CrawlingPage";
import OcrPage from "./pages/OcrPage";
import ProductsDb from "./pages/ProductsDb";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const getIsLoggedIn = async (token) => {
    try {
      await axios
        .get(`${API}/api/user/`, {
          withCredentials: true,
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIsLoggedIn(true);
          }
        });
    } catch (error) {
      if (
        error.response.status === 401 ||
        error.response.status === 400 ||
        error.response.status
      ) {
        console.log("not authorized");
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    console.log(token);
    getIsLoggedIn(token);
  });
  return (
    <Router>
      {isLoggedIn ? (
        <>
          <div style={{ display: "flex" }}>
            <LeftMenu />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/crawling" element={<CrawlingPage />} />
              <Route path="/ocr" element={<OcrPage />} />
              <Route path="/productsdb" element={<ProductsDb />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/*" element={<AuthPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
