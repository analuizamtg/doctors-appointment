import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { compose, graphql } from "react-apollo";
import getSlotsByDate from "../graphql/GetSlotsByDate.js";
import Loader from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.min.css";
import { APPOINTMENT_DURATION_IN_MINUTES } from "../constants";

class DateHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [],
      availableTimes: []
    };
  }

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

  handleDateChange = date => {
    this.props.onDateChange(date);
  };

  render() {
    const { isLoading, availableTimes } = this.state;
    const { date, onDateChange, slotsData } = this.props;
    const { loading } = slotsData;
    return (
      <div>
        <DateTimeContainer>
          <DatePickerContainer>
            <DatePicker
              customInput={<Input label={"Date"} />}
              selected={this.props.date}
              onChange={this.handleDateChange}
            />
          </DatePickerContainer>
          {loading && (
            <SpinnerContainer>
              <Loader type="Oval" color="#00BFFF" height="20" width="20" />
            </SpinnerContainer>
          )}
          <DropdownContainer>
            <Dropdown
              onChange={e => onDateChange(e.target.value)}
              options={availableTimes}
              disabled={isLoading || availableTimes.length === 0}
              errorMessage={
                availableTimes &&
                availableTimes.length === 0 &&
                "No available times this day."
              }
              placeholder={"Select one slot"}
              value={date._i}
              label={"Time"}
            />
          </DropdownContainer>
        </DateTimeContainer>
      </div>
    );
  }
}

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

const getSlotsByDateQuery = graphql(getSlotsByDate, {
  name: "slotsData",
  options({ date }) {
    return {
      variables: {
        date: date._d
      }
    };
  }
});

DateHandler.propTypes = {
  date: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  slotsData: PropTypes.object
};

export default compose(getSlotsByDateQuery)(DateHandler);
