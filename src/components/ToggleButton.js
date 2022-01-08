import React from "react";
import styled from "styled-components";

const ToggleButton = ({ children, onClick, toggle }) => {
  return (
    <StyledButton onClick={onClick} toggle={toggle}>
      {children}
    </StyledButton>
  );
};
const StyledButton = styled.button`
  border: none;
  outline: none;
  color: white;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  ${(props) =>
    props.toggle
      ? "background-color : #3498db;"
      : "background-color : #e74c3c;"}
`;

export default ToggleButton;
