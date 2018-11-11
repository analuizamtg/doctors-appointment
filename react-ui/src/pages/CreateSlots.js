import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { compose, graphql } from "react-apollo";
import getSlots from "../graphql/GetSlots.js";
import createSlots from "../graphql/CreateSlots.js";
import AvailableTimes from "react-available-times";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import Button from "../components/Button";
import PropTypes from "prop-types";

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
        console.log(slots);
      });
  };

  render() {
    const { slots, loading } = this.props.slotsData;
    const initialSelections = this.convertIntoDateObject();

    if (!slots || loading) {
      return (
        <SpinnerContainer>
          <Loader type="TailSpin" color="#00BFFF" height="100" width="100" />;
        </SpinnerContainer>
      );
    }
    return (
      <div>
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
        <ButtonContainer>
          <Button onClick={this.handleClick} label="create" />
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

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 4rem;
`;

const ButtonContainer = styled.div`
  width: 15%;
  margin: auto;
  padding-top: 2rem;
`;
CreateSlots.propTypes = {
  slotsData: PropTypes.object
};

export default compose(
  getSlotsQuery,
  createSlotsMutation
)(CreateSlots);
