import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSiteInfo } from "../actions/SiteActions";
import ListItem from "../components/ListItem";
import Input from "../components/Input";
import { MainContainer } from "../components/MainContainer";
import TextArea from "../components/TextArea";
import ToggleButton from "../components/ToggleButton";
import Button from "../components/Button";

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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 10px;
  .title {
    font-size: 24px;
    color: #2c3d50;
  }
  .form,
  .test {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .sending {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    column-gap: 10px;
  }
`;

const CrawlingPage = () => {
  const sites = useSelector((state) => state.site);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");

  const [sitename, setSitename] = useState("");
  const [encoding, setEncoding] = useState("");
  const [match, setMatch] = useState("");
  const [url, setUrl] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isIframe, setIsIframe] = useState(false);
  const [status, setStatus] = useState(false);

  const [currentSite, setCurrentSite] = useState();

  useEffect(() => {
    dispatch(getSiteInfo(token));
  }, []);

  useEffect(() => {
    console.log(currentSite, sites[currentSite]?.sitename);
  }, [currentSite]);
  return (
    <MainContainer>
      <ListContainer>
        <span
          style={{
            color: "gray",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          리스트
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              setCurrentSite();
              setSitename("");
              setUrl("");
              setMatch("");
              setEncoding("");
              setInstruction("");
              setIsIframe(false);
              setStatus(false);
            }}
          >
            추가
          </span>
        </span>

        {sites.map((site, i) => {
          return (
            <ListItem
              title={site.sitename}
              key={i}
              status={site.status}
              onClick={() => setCurrentSite(i)}
            />
          );
        })}
      </ListContainer>
      <Container>
        {currentSite || currentSite === 0 ? (
          <div className="form">
            <span className="title">수정</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                columnGap: "10px",
              }}
            >
              <Input
                placeholder="사이트 명"
                value={sitename}
                onChange={(e) => setSitename(e.target.value)}
              />
              <Input
                placeholder="Encoding"
                value={encoding}
                onChange={(e) => setEncoding(e.target.value)}
              />
              <Input
                placeholder="match"
                value={match}
                onChange={(e) => setMatch(e.target.value)}
              />
            </div>
            <Input
              placeholder="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextArea
              placeholder="비고"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
            <div className="sending">
              <span>
                iframe :{" "}
                <ToggleButton
                  onClick={() => setIsIframe(!isIframe)}
                  toggle={isIframe}
                >
                  {isIframe ? "YES" : " NO "}
                </ToggleButton>
              </span>
              <span>
                status :{" "}
                <ToggleButton
                  onClick={() => setStatus(!status)}
                  toggle={status}
                >
                  {status ? "성공" : "실패"}
                </ToggleButton>
              </span>
              <Button
                onClick={() => {
                  setSitename("");
                  setUrl("");
                  setMatch("");
                  setEncoding("");
                  setInstruction("");
                  setIsIframe(false);
                  setStatus(false);
                }}
              >
                취소
              </Button>
              <Button>수정</Button>
            </div>
          </div>
        ) : (
          <div className="form">
            <span className="title">추가</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                columnGap: "10px",
              }}
            >
              <Input
                placeholder="사이트 명"
                value={sitename}
                onChange={(e) => setSitename(e.target.value)}
              />
              <Input
                placeholder="Encoding"
                value={encoding}
                onChange={(e) => setEncoding(e.target.value)}
              />
              <Input
                placeholder="match"
                value={match}
                onChange={(e) => setMatch(e.target.value)}
              />
            </div>
            <Input
              placeholder="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextArea
              placeholder="비고"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
            <div className="sending">
              <span>
                iframe :{" "}
                <ToggleButton
                  onClick={() => setIsIframe(!isIframe)}
                  toggle={isIframe}
                >
                  {isIframe ? "YES" : " NO "}
                </ToggleButton>
              </span>
              <span>
                status :{" "}
                <ToggleButton
                  onClick={() => setStatus(!status)}
                  toggle={status}
                >
                  {status ? "성공" : "실패"}
                </ToggleButton>
              </span>
              <Button
                onClick={() => {
                  setSitename("");
                  setUrl("");
                  setMatch("");
                  setEncoding("");
                  setInstruction("");
                  setIsIframe(false);
                  setStatus(false);
                }}
              >
                취소
              </Button>
              <Button>추가</Button>
            </div>
          </div>
        )}
        <div className="test">
          <span className="title">테스트</span>
          <Input placeholder={"상품 url"} />
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button>Go</Button>
          </span>
        </div>
      </Container>
    </MainContainer>
  );
};

export default CrawlingPage;
