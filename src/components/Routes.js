import React from "react";
// https://reacttraining.com/react-router/
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Notes from "../pages/Notes";
import NotFound from "../pages/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/Notes">
        <Notes />
      </Route>
      <Route>
        {/* This route WILL reload the page */}
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
