import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSiteInfo } from "../actions/SiteActions";
import ListItem from "../components/ListItem";
import { MainContainer } from "../components/MainContainer";

const ListContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  row-gap: 10px;
  border-right: 1px solid gray;
  height: 100%;
`;
const Container = styled.div`
  width: 80%;
`;
const CrawlingPage = () => {
  const sites = useSelector((state) => state.site);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    dispatch(getSiteInfo(token));
  }, []);
  return (
    <MainContainer>
      <ListContainer>
        <span style={{ color: "gray" }}>리스트</span>
        <ListItem title="무신사" status="fail" />
        <ListItem title="소녀나라" status="success" />
      </ListContainer>
      <Container></Container>
    </MainContainer>
  );
};

export default CrawlingPage;
