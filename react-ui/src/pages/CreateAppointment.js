import React, { Component } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import { compose, graphql } from "react-apollo";
import createAppointment from "../graphql/CreateAppointment.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Header from "../components/Header";
import DateHandler from "../components/DateHandler";
import { APPOINTMENT_DURATION_IN_MINUTES } from "../constants";

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      isLoading: false,
      slots: [],
      availableTimes: []
    };
  }

  handleClick = () => {
    const { name, email, date } = this.state;
    this.props
      .createAppointment({
        variables: {
          dateAndTime: date,
          endDateAndTime: moment(date).add(
            APPOINTMENT_DURATION_IN_MINUTES,
            "m"
          ),
          user: { name: name, email: email }
        }
      })
      .then(appointment => {
        toast.success("Appointment successfully created!", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000
        });
      })
      .catch(e => {
        toast.error(e && e.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: false
        });
      });
  };

  render() {
    return (
      <div>
        <Header title={"Create Appointment"} paddingBottom={"2rem;"} />
        <Container>
          <ToastContainer />
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
            <DateHandler
              date={this.state.date}
              onDateChange={date => {
                this.setState({ date: moment(date) });
              }}
            />
            <Button onClick={this.handleClick} label={"schedule"} />
          </Div>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  border-style: solid;
  border-width: 0.125rem;
  border-color: #e3e4e6;
  border-radius: 0.25rem;
  margin: auto;
  padding-top: 1rem;
  @media (max-width: 640px) {
    width: 90%;
  }
  @media (min-width: 640px) {
    width: 40%;
  }
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

export default compose(createCollectionMutation)(CreateAppointment);
