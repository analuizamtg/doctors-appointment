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

  getOptionFromValue = value => {
    const { options } = this.props;
    const option = options.filter(option => option.value == value)[0];
    if (!option) return null;
    return option;
  };

  getSelectedOption = () => {
    return this.getOptionFromValue(this.props.value);
  };

  getPlaceholder = () => {
    const { placeholder, label, helpText } = this.props;
    const placeholderValue = placeholder || label || helpText || "";

    return placeholderValue;
  };

  getValueLabel() {
    const selectedOption = this.getSelectedOption();
    return selectedOption ? selectedOption.label : this.getPlaceholder();
  }

  render() {
    const valueLabel = this.getValueLabel();
    const {
      label,
      placeholder,
      options,
      disabled,
      value,
      errorMessage
    } = this.props;
    return (
      <div>
        <label>
          {label && <Span>{label}</Span>}
          <Div>
            <Container
              disabled={disabled}
              value={value}
              placeholder={placeholder}
            >
              <FlexDiv>
                <Placeholder>{!disabled && valueLabel}</Placeholder>
                <IconDiv>
                  <Icon icon={angleDown} size={13} color={"blue"} />
                </IconDiv>
              </FlexDiv>
            </Container>
            <Select
              onChange={this.handleChange}
              value={value}
              disabled={disabled}
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
        {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
      </div>
    );
  }
}

const Select = styled.select`
  position: absolute;
  opacity: 0;
  bottom: 0;
  left: 0;
  top: 0;
  cursor: ${props => !props.disabled && "pointer"};
  font-size: 0.875rem;
  opacity: 0;
  width: 100%;
`;

const Span = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 0.875rem;
`;

const ErrorContainer = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #ff4c4c;
  margin-top: 0.25rem;
`;

const Div = styled.div`
  position: relative;
  border-radius: 0.25rem;
  border-style: solid;
  border-color: #e3e4e6;
  border-width: 0.125rem;
  &:hover {
    border-color: #cacbcc;
  }
`;

const Container = styled.div`
  border-style: none;
  border-width: 0;
  cursor: ${props => !props.disabled && "pointer"}
  font-size: 0.875rem;
  color: ${props => props.placeholder && !props.value && "#979899"};
  background-color: ${props => (props.disabled ? "#E3E4E6" : "transparent")};
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
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
};

export default Dropdown;
