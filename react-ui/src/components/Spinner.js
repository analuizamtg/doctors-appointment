import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Loader type="TailSpin" color="#00BFFF" height="100" width="100" />;
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 4rem;
`;

export default Spinner;
