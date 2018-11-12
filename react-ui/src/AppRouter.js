import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateAppointment from "./pages/CreateAppointment";
import ManageSlots from "./pages/ManageSlots";
import ViewAppointments from "./pages/ViewAppointments";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={CreateAppointment} />
      <Route
        path="/admin/appointments"
        exact={true}
        component={ViewAppointments}
      />
      <Route path="/admin" exact={true} component={ManageSlots} />
    </Switch>
  );
};

export default AppRouter;
