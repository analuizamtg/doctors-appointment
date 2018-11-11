import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class Input extends Component {
  handleChange = event => {
    this.props.onChange && this.props.onChange(event);
  };

  onClick = event => {
    this.props.onClick && this.props.onClick(event);
  };

  render() {
    const { label, placeholder, type = "text", name } = this.props;
    return (
      <Label>
        {label && <Span>{label}</Span>}
        <Div>
          <StyledInput
            name={name}
            placeholder={placeholder}
            type={type}
            onChange={this.handleChange}
            onClick={this.onClick}
            value={this.props.value}
          />
        </Div>
      </Label>
    );
  }
}

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

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string
};

export default Input;
