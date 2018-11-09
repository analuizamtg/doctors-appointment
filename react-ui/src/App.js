import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import Input from "./components/Input";
import Dropdown from "./components/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./components/Button";
import { compose, graphql } from "react-apollo";
import getSlotsByDate from "./graphql/GetSlotsByDate.js";
import createAppointment from "./graphql/CreateAppointment.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      slots: []
    };
  }

  handleClick = () => {
    const { name, email, date } = this.state;
    console.log("aquiiii");
    this.props
      .createAppointment({
        variables: {
          dateAndTime: new Date(),
          user: { name: name, email: email }
        }
      })
      .then(appointment => {
        console.log("aquiiiiiii");
      });
  };

  handleDateChange = date => {
    this.setState({ date: date });
    this.props.slotsData
      .refetch({
        date: date._d
      })
      .then(data => {
        console.log(data);
      });
  };

  render() {
    return (
      <div>
        <Container>
          <h2>Schedule your appointment</h2>
          <Div>
            <Input
              label={"Full name"}
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            />
            <Input
              label={"E-mail"}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              type={"email"}
            />
            <DateTimeContainer>
              <DatePickerContainer>
                <DatePicker
                  customInput={<Input label={"Date"} />}
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                />
              </DatePickerContainer>
              <DropdownContainer>
                <Dropdown
                  onChange={() => {}}
                  options={[{ label: "19:30", value: new Date() }]}
                  label={"Time"}
                />
              </DropdownContainer>
            </DateTimeContainer>
            <Button onClick={this.handleClick} label={"schedule"} />
          </Div>
        </Container>
      </div>
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
  padding-top: 1rem;
`;

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DatePickerContainer = styled.div`
  padding-right: 2rem;
`;

const DropdownContainer = styled.div`
  width: 100%;
`;

const Div = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const createCollectionMutation = graphql(createAppointment, {
  name: "createAppointment"
});

const getSlotsByDateQuery = graphql(getSlotsByDate, {
  name: "slotsData",
  options() {
    return {
      variables: {
        date: new moment()._d
      }
    };
  }
});

export default compose(
  createCollectionMutation,
  getSlotsByDateQuery
)(App);
