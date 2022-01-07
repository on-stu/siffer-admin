import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  width: 100px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #3498db;
  color: white;
  :active {
    background-color: #2980b9;
  }
`;
export default Button;
