import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { compose, graphql } from "react-apollo";
import getAppointments from "../graphql/GetAppointments";
import Spinner from "../components/Spinner.js";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import Header from "../components/Header";

class ViewAppointments extends Component {
  render() {
    const columns = [
      {
        id: "date",
        Header: "Date",
        accessor: d =>
          moment(new Date(parseInt(d.dateAndTime))).format("MMM Do YY")
      },
      {
        id: "time",
        Header: "Time",
        accessor: d =>
          moment(new Date(parseInt(d.dateAndTime))).format("hh:mm A")
      },
      {
        id: "name",
        Header: "Patient name",
        accessor: d => d.user.name
      },
      {
        id: "email",
        Header: "Patient email",
        accessor: d => d.user.email
      }
    ];
    const { appointments, loading } = this.props.appointmentsData;

    if (!appointments || loading) {
      return <Spinner />;
    }

    return (
      <div>
        <Header width={"955px"} title={"Appointments"} />
        <TableContainer>
          <ReactTable data={appointments} columns={columns} />
        </TableContainer>
      </div>
    );
  }
}

const appointmentsQuery = graphql(getAppointments, {
  name: "appointmentsData"
});

ViewAppointments.propTypes = {
  appointmentsData: PropTypes.object
};

const TableContainer = styled.div`
  width: 80%;
  margin: auto;
  padding-top: 2rem;
`;

export default compose(appointmentsQuery)(ViewAppointments);
