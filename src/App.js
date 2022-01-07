import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./libs/consts";
import MainPage from "./pages/MainPage";
import LeftMenu from "./components/LeftMenu";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getIsLoggedIn = async (token) => {
    try {
      await axios.post(`${API}/api/token/verify/`, { token }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      });
    } catch (error) {
      if (error.response.status === 401 || error.response.status == 400) {
        console.log("not authorized");
        setIsLoggedIn(false);
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");

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
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
