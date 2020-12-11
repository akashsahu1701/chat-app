import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./components/App.css";
import App from "./components/App";
import Alert from "./components/Alert";
import Dashboard from "./components/layout/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
//  Redux
import { Provider } from "react-redux";
import store from "./store";
import { getUser } from "./actions/auth";

const Root = () => {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* authenticated routes */}
          <Route exact path="/" component={App} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
