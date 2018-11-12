import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Header = ({ title, width, paddingBottom }) => {
  return (
    <OuterContainer paddingBottom={paddingBottom}>
      <Container width={width}>
        <InnerContainer>{title}</InnerContainer>
      </Container>
    </OuterContainer>
  );
};

const Container = styled.div`
  width: ${props => props.width || "80%"};
  background-color: #f2f4f5;
  padding: 2rem;
  margin: auto;
`;

const OuterContainer = styled.div`
  padding-top: 2rem;
  padding-bottom ${props => props.paddingBottom || 0};
`;

const InnerContainer = styled.div`
  font-weight: 600;
  font-size: 2.25rem;
`;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.string,
  paddingBottom: PropTypes.string
};

export default Header;
