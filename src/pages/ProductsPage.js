import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProductInfo } from "../actions/ProductActions";
import Button from "../components/Button";
import ImageBox from "../components/ImageBox";
import Input from "../components/Input";
import { MainContainer } from "../components/MainContainer";
import ProductListItem from "../components/ProductListItem";
import TextArea from "../components/TextArea";
import { API } from "../libs/consts";

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

const ProductsPage = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const [request, setRequest] = useState({});
  const [currentProduct, setCurrentProduct] = useState();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [mainPhoto, setMainPhoto] = useState([]);
  const [size, setSize] = useState([]);
  const [madeOf, setMadeOf] = useState([]);
  const [modelSize, setModelSize] = useState([]);

  useEffect(() => {
    setRequest({
      ...request,
      mainPhoto: JSON.stringify(mainPhoto),
      madeOf: JSON.stringify(madeOf),
      size: JSON.stringify(size),
      modelSize: JSON.stringify(modelSize),
    });
  }, [mainPhoto, size, madeOf, modelSize]);

  const addSite = async () => {
    const response = await axios.post(
      `${API}/api/product/`,
      { ...request },
      config
    );
    if (response.status === 201) {
      dispatch(getProductInfo(token));
    }
  };

  const modifySite = async () => {
    const response = await axios.put(
      `${API}/api/product/${products[currentProduct]?.id}/`,
      request,
      config
    );
    if (response.status === 200) {
      dispatch(getProductInfo(token));
    }
  };

  const deleteSite = async () => {
    const response = await axios.delete(
      `${API}/api/product/${products[currentProduct]?.id}/`,
      config
    );

    if (response.status === 204) {
      setCurrentProduct();
      dispatch(getProductInfo(token));
    }
  };

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setRequest({ ...request, photoURL: reader.result });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  useEffect(() => {
    dispatch(getProductInfo(token));
  }, [dispatch]);

  useEffect(() => {
    if (currentProduct || currentProduct === 0) {
      setRequest(products[currentProduct]);
    } else {
      setRequest({});
    }
  }, [currentProduct]);

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
              setCurrentProduct();
              setRequest({});
            }}
          >
            추가
          </span>
        </span>

        {products &&
          products.map((product, i) => {
            return (
              <ProductListItem
                onClick={() => setCurrentProduct(i)}
                productName={product.productName}
                key={i}
              />
            );
          })}
      </ListContainer>
      <Container>
        {currentProduct || currentProduct === 0 ? (
          <div className="form">
            <span className="title">수정</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                columnGap: "10px",
              }}
            >
              <Input
                placeholder="제품명"
                value={request.productName || ""}
                onChange={(e) =>
                  setRequest({ ...request, productName: e.target.value })
                }
              />

              <Input
                placeholder="가격"
                value={request.price || ""}
                onChange={(e) =>
                  setRequest({ ...request, price: e.target.value })
                }
              />
            </div>
            <ImageBox photoURL={request?.photoURL} />
            <input type="file" onChange={(e) => getBase64(e.target.files[0])} />
            <TextArea
              placeholder="비고"
              value={request.instruction || ""}
              onChange={(e) =>
                setRequest({ ...request, instruction: e.target.value })
              }
            />
            <div className="sending">
              <Button backColor={"#E74B3C"} onClick={deleteSite}>
                삭제
              </Button>
              <Button
                onClick={() => {
                  setRequest({});
                  setCurrentProduct();
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
                gridTemplateColumns: "repeat(2, 1fr)",
                columnGap: "10px",
              }}
            >
              <Input
                placeholder="제품명"
                value={request.productName || ""}
                onChange={(e) =>
                  setRequest({ ...request, productName: e.target.value })
                }
              />

              <Input
                placeholder="가격"
                value={request.price || ""}
                onChange={(e) =>
                  setRequest({ ...request, price: e.target.value })
                }
              />
            </div>
            <ImageBox photoURL={request?.photoURL} />
            <input type="file" onChange={(e) => getBase64(e.target.files[0])} />

            <TextArea
              placeholder="비고"
              value={request.instruction || ""}
              onChange={(e) =>
                setRequest({ ...request, instruction: e.target.value })
              }
            />
            <div className="sending">
              <Button
                onClick={() => {
                  setRequest({});
                }}
              >
                취소
              </Button>
              <Button onClick={addSite}>추가</Button>
            </div>
          </div>
        )}
      </Container>
    </MainContainer>
  );
};

export default ProductsPage;
