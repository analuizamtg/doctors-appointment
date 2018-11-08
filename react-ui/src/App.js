import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import Input from "./components/Input";
import Dropdown from "./components/Dropdown";

class App extends Component {
  render() {
    return (
      <Container>
        <Div>
          <Input label={"Full name"} />
          <Input label={"E-mail"} type={"email"} />
          <Dropdown
            options={[{ label: "19:30", value: new Date() }]}
            label={"Time"}
          />
        </Div>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 40%;
  border-style: solid;
  border-width: 0.125rem;
  border-color: #e3e4e6;
  border-radius: 0.25rem;
  margin: auto;
`;

const Div = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export default App;
