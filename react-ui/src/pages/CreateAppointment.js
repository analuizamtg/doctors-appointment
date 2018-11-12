import React, { Component } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import { compose, graphql } from "react-apollo";
import getSlotsByDate from "../graphql/GetSlotsByDate.js";
import createAppointment from "../graphql/CreateAppointment.js";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Header from "../components/Header";

const APPOINTMENT_DURATION_IN_MINUTES = 30;

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: moment(),
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

  handleDateChange = date => {
    this.setState({ selectedDay: date, isLoading: true });
    this.props.slotsData
      .refetch({
        date: date._d
      })
      .then(data => {
        this.setState({ slots: data.data.slotsByDate }, () => {
          return this.getPossibleAppointmentTimes();
        });
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.slotsData.slotsByDate !== this.props.slotsData.slotsByDate) {
      this.setState({ slots: nextProps.slotsData.slotsByDate }, () => {
        return this.getPossibleAppointmentTimes();
      });
    }
  }

  getPossibleAppointmentTimes() {
    const availableTimes = [];
    const { slots } = this.state;
    if (slots && slots.length > 0) {
      for (var i = 0; i < slots.length; i++) {
        var startTime = new Date(parseInt(slots[i].start));
        const endTime = new Date(parseInt(slots[i].end));
        while (startTime < endTime) {
          availableTimes.push({
            value: startTime,
            label: moment(startTime).format("hh:mm A")
          });
          startTime = moment(startTime)
            .add(APPOINTMENT_DURATION_IN_MINUTES, "m")
            .toDate();
        }
      }
    }
    this.setState({ availableTimes: availableTimes, isLoading: false });
  }

  render() {
    const { isLoading, date, availableTimes, selectedDay } = this.state;
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
            <DateTimeContainer>
              <DatePickerContainer>
                <DatePicker
                  customInput={<Input label={"Date"} />}
                  selected={selectedDay}
                  onChange={this.handleDateChange}
                />
              </DatePickerContainer>
              {isLoading && (
                <SpinnerContainer>
                  <Loader type="Oval" color="#00BFFF" height="20" width="20" />
                </SpinnerContainer>
              )}
              <DropdownContainer>
                <Dropdown
                  onChange={(e, value) => {
                    this.setState({ date: value });
                  }}
                  options={availableTimes}
                  disabled={isLoading || availableTimes.length === 0}
                  errorMessage={
                    availableTimes &&
                    availableTimes.length === 0 &&
                    "No available times this day."
                  }
                  placeholder={"Select one slot"}
                  value={date}
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

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DatePickerContainer = styled.div`
  padding-right: 1.5rem;
`;

const DropdownContainer = styled.div`
  width: 100%;
`;

const SpinnerContainer = styled.div`
  padding-top: 1.5rem;
  padding-right: 0.5rem;
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
)(CreateAppointment);
