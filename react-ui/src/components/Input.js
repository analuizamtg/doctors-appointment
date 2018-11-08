import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-color: #e3e4e6;
  &:hover {
    border-color: #cacbcc;
  }
  border-width: 0.125rem;
  border-style: solid;
  border-radius: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const Label = styled.label`
  width: 100%;
`;

const Span = styled.span`
  width: 100%;
  display: block;
  font-weight: 5;
  font-size: 0.875rem;
`;

const Div = styled.div`
  position: relative;
  display: flex;
  padding-bottom: 2rem;
`;

const Input = ({ label, placeholder, type = "text" }) => {
  return (
    <Label>
      {label && <Span>{label}</Span>}
      <Div>
        <StyledInput placeholder={placeholder} type={type} />
      </Div>
    </Label>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

export default Input;
