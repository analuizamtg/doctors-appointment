import gql from "graphql-tag";

const getSlotsByDate = gql`
  query getSlotsByDate($date: String) {
    slotsByDate(date: $date) {
      start
      end
    }
  }
`;
export default getSlotsByDate;
