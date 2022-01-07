import React, { useState } from "react";
import styled from "styled-components";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { API } from "../libs/consts";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #5328ca, #2decc2);
  .content {
    display: flex;
    width: 400px;
    box-sizing: border-box;
    flex-direction: column;
    row-gap: 12px;
  }
  .logo {
    color: white;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    column-gap: 10px;
  }
  .form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
  }
`;

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nativate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(`${API}/accounts/login/`, {
        email,
        password,
      });
      const {
        status,
        data: { access_token, refresh_token },
      } = response;
      if (status === 200) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        nativate(0);
      }
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        console.log("이메일 혹은 비밀번호가 틀립니다.");
      }
    }
  };

  return (
    <Container>
      <div className="content">
        <span className="logo">
          <RiAdminLine />
          Siffer 관리자 페이지
        </span>
        <span className="form">
          <Input
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
          />
        </span>
        <span className="buttons">
          <Button>회원가입</Button>
          <Button onClick={login}>로그인</Button>
        </span>
      </div>
    </Container>
  );
};

export default AuthPage;
