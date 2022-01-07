import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "../functions/LogOut";

const Container = styled.div`
  width: 20%;
  background: #2c3e50;
  height: 100vh;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  position: relative;
  .logo {
    color: white;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    column-gap: 10px;
    cursor: pointer;
  }
  .logout {
    background-color: #34495e;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: whitesmoke;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    column-gap: 10px;
    padding: 20px;
    cursor: pointer;
  }
  .menus {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .title {
    font-size: 20px;
    color: #7f8c8d;
  }
  .link {
    margin-left: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  .link:hover {
    color: whitesmoke;
  }
  .logout:hover {
    background-color: #2c3e50;
  }
  #${(props) => props.location} {
    color: whitesmoke;
  }
`;

const LeftMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const here = location.pathname.slice(1);
  return (
    <Container location={here}>
      <span className="logo" onClick={() => navigate("/")}>
        <RiAdminLine />
        Siffer 관리자 페이지
      </span>
      <div className="menus">
        <span className="title">Borderless</span>
        <span className="link" id="users" onClick={() => navigate("/users")}>
          유저 관리
        </span>
        <span
          className="link"
          id="products"
          onClick={() => navigate("/products")}
        >
          상품 관리
        </span>
        <span className="link" id="orders" onClick={() => navigate("/orders")}>
          주문 관리
        </span>
        <span className="title">Siffer API 학습</span>
        <span
          className="link"
          id="crawling"
          onClick={() => navigate("/crawling")}
        >
          웹 크롤링 학습
        </span>
        <span className="link" id="ocr" onClick={() => navigate("/ocr")}>
          OCR 학습
        </span>
        <span
          className="link"
          id="productsdb"
          onClick={() => navigate("/productsdb")}
        >
          상품 DB 축적
        </span>
      </div>
      <div
        className="logout"
        onClick={() => {
          LogOut();
          navigate(0);
        }}
      >
        <FiLogOut />
        로그아웃
      </div>
    </Container>
  );
};

export default LeftMenu;
