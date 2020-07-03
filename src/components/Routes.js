import React from "react";
// https://reacttraining.com/react-router/
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Notes from "../pages/Notes";
import NotFound from "../pages/NotFound";

const Routes = () => {
  return (
    // https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html#simple-redirects-and-rewrites
    // Required for routes to work correctly (Redirects for Single Page Web Apps)
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/Notes">
        <Notes />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
