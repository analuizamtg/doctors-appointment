import gql from "graphql-tag";

const createSlots = gql`
  mutation createSlots($slots: [SlotInput]) {
    createSlots(slots: $slots) {
      start
      end
    }
  }
`;
export default createSlots;
