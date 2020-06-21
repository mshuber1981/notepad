import React from "react";
import ReactDOM from "react-dom";
// https://reacttraining.com/react-router/
import { BrowserRouter as Router } from "react-router-dom";
// https://docs.amplify.aws/start/q/integration/react
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

Amplify.configure(aws_exports);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
