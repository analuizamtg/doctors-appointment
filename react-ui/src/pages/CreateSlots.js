import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import getSlots from "../graphql/GetSlots.js";
import createSlots from "../graphql/CreateSlots.js";
import AvailableTimes from "react-available-times";
import styled from "styled-components";
import Button from "../components/Button";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner.js";
import Header from "../components/Header.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class CreateSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selections: []
    };
  }

  convertIntoDateObject() {
    const { slots } = this.props.slotsData;
    return (
      slots &&
      slots.map(slot => {
        return {
          start: slot.start && new Date(parseInt(slot.start)),
          end: slot.end && new Date(parseInt(slot.end))
        };
      })
    );
  }

  handleSlotSelection = selections => {
    this.setState({ selections: selections });
  };

  handleClick = () => {
    const initialSelections = this.convertIntoDateObject();
    const filteredArray = this.state.selections.filter(selection => {
      return (
        initialSelections.filter(initialSelection => {
          return (
            selection.start &&
            selection.start.getTime() === initialSelection.start &&
            initialSelection.start.getTime() &&
            selection.end &&
            selection.end.getTime() === initialSelection.end &&
            initialSelection.end.getTime()
          );
        }).length === 0
      );
    });
    this.props
      .createSlots({
        variables: {
          slots: filteredArray
        }
      })
      .then(slots => {
        toast.success("Slots successfully updated!", {
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
    const { slots, loading } = this.props.slotsData;
    const initialSelections = this.convertIntoDateObject();

    if (!slots || loading) {
      return <Spinner />;
    }
    return (
      <div>
        <ToastContainer />
        <Header title={"Manage available slots"} width={"90%"} />
        <CalendarContainer>
          <AvailableTimes
            weekStartsOn="monday"
            calendars={[
              {
                id: "appointments",
                title: "appointments",
                foregroundColor: "#ff00ff",
                backgroundColor: "#f0f0f0",
                selected: true
              }
            ]}
            onChange={this.handleSlotSelection}
            height={400}
            recurring={false}
            initialSelections={initialSelections}
            availableDays={[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday"
            ]}
            availableHourRange={{ start: 7, end: 20 }}
          />
        </CalendarContainer>
        <ButtonContainer>
          <Button onClick={this.handleClick} label="submit" />
        </ButtonContainer>
      </div>
    );
  }
}

const getSlotsQuery = graphql(getSlots, {
  name: "slotsData"
});

const createSlotsMutation = graphql(createSlots, {
  name: "createSlots"
});

const ButtonContainer = styled.div`
  width: 15%;
  margin: auto;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

const CalendarContainer = styled.div`
  width: 95%;
  margin: auto;
`;

CreateSlots.propTypes = {
  slotsData: PropTypes.object
};

export default compose(
  getSlotsQuery,
  createSlotsMutation
)(CreateSlots);
