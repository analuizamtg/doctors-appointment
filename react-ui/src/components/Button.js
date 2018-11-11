import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class Button extends Component {
  onClick = event => {
    this.props.onClick && this.props.onClick(event);
  };

  render() {
    const { label } = this.props;
    return <StyledButton onClick={this.onClick}>{label}</StyledButton>;
  }
}

const StyledButton = styled.button`
  width: 100%;
  background-color: #368df7;
  border-width: 0.125rem;
  border-style: solid;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  border-color: #368df7;
  position: relative;
  text-transform: uppercase;
`;
Button.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
