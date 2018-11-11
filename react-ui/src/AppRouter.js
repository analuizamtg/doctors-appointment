import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateAppointment from "./pages/CreateAppointment";
import CreateSlots from "./pages/CreateSlots";
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
      <Route path="/admin" exact={true} component={CreateSlots} />
    </Switch>
  );
};

export default AppRouter;
