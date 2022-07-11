import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  outline: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  background: white;
`;

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
