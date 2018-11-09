import gql from "graphql-tag";

const getSlotsByDate = gql`
  query getSlotsByDate($date: String) {
    slots(date: $date) {
      dateAndTime
      endDateAndTime
    }
  }
`;
export default getSlotsByDate;
