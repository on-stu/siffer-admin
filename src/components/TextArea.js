import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  resize: none;
  border: none;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  overflow-y: auto;
`;

const TextArea = ({ placeholder, value, onChange }) => {
  return (
    <StyledTextArea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    ></StyledTextArea>
  );
};

export default TextArea;
