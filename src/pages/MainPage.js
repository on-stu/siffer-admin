import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogOut } from "../functions/LogOut";

const Container = styled.div`
  background-color: #ecf0f1;
  width: 80%;
`;

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <button
        onClick={() => {
          LogOut();
          navigate(0);
        }}
      >
        dffd
      </button>
    </Container>
  );
};

export default MainPage;
