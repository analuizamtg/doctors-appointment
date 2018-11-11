import gql from "graphql-tag";

const getSlots = gql`
  query getSlots {
    slots {
      start
      end
    }
  }
`;
export default getSlots;
