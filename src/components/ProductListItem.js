import React from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const Item = styled.div`
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  cursor: pointer;
`;

const ProductListItem = ({ productName, onClick }) => {
  return <Item onClick={onClick}>{productName}</Item>;
};

export default ProductListItem;
