import gql from "graphql-tag";

const createAppointment = gql`
  mutation createAppointment(
    $user: UserInput
    $dateAndTime: String
    $endDateAndTime: String
  ) {
    createAppointment(
      user: $user
      dateAndTime: $dateAndTime
      endDateAndTime: $endDateAndTime
    ) {
      dateAndTime
      endDateAndTime
    }
  }
`;
export default createAppointment;
