import React from "react";
import styled from "styled-components";

const Input = ({ placeholder, value, onChange, type, onKeyPress }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

const StyledInput = styled.input`
  width: 100%;
  border-radius: 10px;
  height: 24px;
  outline: none;
  border: none;
  padding: 15px;
  box-sizing: border-box;
`;

export default Input;
