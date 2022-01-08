import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { API } from "../libs/consts";
import { useNavigate } from "react-router-dom";
import { constructTable } from "../functions/constructTable";

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

  const resultRef = useRef();
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const [sitename, setSitename] = useState("");
  const [encoding, setEncoding] = useState("utf-8");
  const [className, setClassName] = useState("");
  const [match, setMatch] = useState("");
  const [url, setUrl] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isIframe, setIsIframe] = useState(false);
  const [status, setStatus] = useState(false);
  const [currentSite, setCurrentSite] = useState();

  const [testUrl, setTestUrl] = useState("");

  const addSite = async () => {
    if (encoding !== "utf-8" && encoding !== "euc-kr") {
      return alert("encoding은 utf-8 혹은 euc-kr로 설정되어야 합니다.");
    }
    const response = await axios.post(
      `${API}/api/site/`,
      {
        sitename,
        iframe: isIframe,
        match,
        url,
        instruction,
        encoding,
        classname: className,
        status: status ? "success" : "failed",
      },
      config
    );
    if (response.status === 201) {
      navigate(0);
    }
  };

  const modifySite = async () => {
    if (encoding !== "utf-8" && encoding !== "euc-kr") {
      return alert("encoding은 utf-8 혹은 euc-kr로 설정되어야 합니다.");
    }
    const response = await axios.put(
      `${API}/api/site/${sites[currentSite]?.id}/`,
      {
        sitename,
        iframe: isIframe,
        match,
        url,
        instruction,
        classname: className,
        encoding,
        status: status ? "success" : "failed",
      },
      config
    );
    if (response.status === 200) {
      dispatch(getSiteInfo(token));
    }
  };

  const deleteSite = async () => {
    const response = await axios.delete(
      `${API}/api/site/${sites[currentSite]?.id}/`,
      config
    );

    if (response.status === 204) {
      dispatch(getSiteInfo(token));
    }
  };

  const testGetSize = async () => {
    const response = await axios.post(
      `${API}/api/getsize/`,
      {
        url: testUrl,
      },
      config
    );
    console.log(response);
    resultRef.current.innerText = "";
    if (response.status == 200) {
      constructTable(response.data.result, resultRef.current);
    }
  };

  const setSiteInput = (siteInfo) => {
    setSitename(siteInfo.sitename);
    setEncoding(siteInfo.encoding);
    setIsIframe(siteInfo.iframe);
    setInstruction(siteInfo.instruction);
    setClassName(siteInfo.classname);
    setMatch(siteInfo.match);
    setStatus(siteInfo.status === "success" ? true : false);
    setUrl(siteInfo.url);
  };

  useEffect(() => {
    dispatch(getSiteInfo(token));
  }, [dispatch, token]);

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
              setEncoding("utf-8");
              setInstruction("");
              setClassName("");
              setIsIframe(false);
              setStatus(false);
            }}
          >
            추가
          </span>
        </span>

        {sites &&
          sites.map((site, i) => {
            return (
              <ListItem
                title={site.sitename}
                key={i}
                status={site.status}
                onClick={() => {
                  setCurrentSite(i);
                  setSiteInput(site);
                }}
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
                gridTemplateColumns: "repeat(4, 1fr)",
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
              <Input
                placeholder="class name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
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
              <Button backColor={"#E74B3C"} onClick={deleteSite}>
                삭제
              </Button>
              <Button
                onClick={() => {
                  setCurrentSite();
                  setSitename("");
                  setUrl("");
                  setMatch("");
                  setEncoding("utf-8");
                  setClassName("");
                  setInstruction("");
                  setIsIframe(false);
                  setStatus(false);
                }}
              >
                취소
              </Button>
              <Button onClick={modifySite}>수정</Button>
            </div>
          </div>
        ) : (
          <div className="form">
            <span className="title">추가</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
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
              <Input
                placeholder="class name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
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
                  setEncoding("utf-8");
                  setInstruction("");
                  setClassName("");
                  setIsIframe(false);
                  setStatus(false);
                }}
              >
                취소
              </Button>
              <Button onClick={addSite}>추가</Button>
            </div>
          </div>
        )}
        <div className="test">
          <span className="title">테스트</span>
          <Input
            placeholder={"상품 url"}
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
          />
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={testGetSize}>Go</Button>
          </span>
          <table ref={resultRef}></table>
        </div>
      </Container>
    </MainContainer>
  );
};

export default CrawlingPage;
