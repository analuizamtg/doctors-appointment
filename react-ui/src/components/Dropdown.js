import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { angleDown } from "react-icons-kit/fa/angleDown";

class Dropdown extends Component {
  handleChange = e => {
    const { onChange } = this.props;
    const {
      target: { value }
    } = e;
    onChange(e, value);
  };

  render() {
    const { label, placeholder, options } = this.props;
    return (
      <label>
        {label && <Span>{label}</Span>}
        <Div>
          <PlaceholderDiv>
            <FlexDiv>
              <Placeholder>{placeholder}</Placeholder>
              <IconDiv>
                <Icon icon={angleDown} size={13} color={"blue"} />
              </IconDiv>
            </FlexDiv>
          </PlaceholderDiv>
          <Select
            onChange={this.handleChange}
            style={{
              // safari select height fix
              WebkitAppearance: "menulist-button"
            }}
          >
            >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Div>
      </label>
    );
  }
}

const Select = styled.select`
  position: absolute;
  opacity: 0;
  bottom: 0;
  top: 0;
  cursor: pointer;
  font-size: 0.875rem;
  opacity: 0;
  width: 35%;
`;

const Span = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 0.875rem;
`;

const Div = styled.div`
  border-radius: 0.25rem;
  border-style: solid;
  border-color: #e3e4e6;
  border-width: 0.125rem;
  &:hover {
    border-color: #cacbcc;
  }
`;

const PlaceholderDiv = styled.div`
  border-style: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: #979899;
  background-color: transparent;
  padding-top: 0.23rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 0.75rem;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const Placeholder = styled.div`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
text-align: left
flex: 1 1 auto;
min-width: 0;
min-height: 0;
`;

const IconDiv = styled.div`
  align-items: center;
  flex: none;
  display: flex;
  color: #368df7;
`;

Dropdown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default Dropdown;
