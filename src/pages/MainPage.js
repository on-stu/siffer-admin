import React from "react";
import styled from "styled-components";
import { MainContainer } from "../components/MainContainer";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <Container>
        <div>
          <p>Siffer 관리자 페이지 입니다.</p>
          <p>왼쪽의 메뉴를 클릭해 이동해주세요.</p>
        </div>
      </Container>
    </MainContainer>
  );
};

export default MainPage;
