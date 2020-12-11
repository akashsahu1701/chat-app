import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Grid, Button, Header, Icon, Message } from "semantic-ui-react";

const App = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 600 }} color="black">
        <Header as="h2" icon color="blue" textAlign="center">
          <Icon name="chat" color="blue" />
          Welcome To Free Chat
        </Header>
        <Message color="black" />
        <Button
          color="yellow"
          fluid
          size="large"
          style={{ marginTop: 10, fontSize: 20 }}
          type="submit"
          className="button"
        >
          <Link to="/login">Login</Link>
        </Button>

        <Button
          color="yellow"
          fluid
          style={{ marginTop: 10, fontSize: 20 }}
          size="large"
          type="submit"
          className="button"
        >
          <Link to="/register">Sign up</Link>
        </Button>
      </Grid.Column>
    </Grid>
  );
};

App.propType = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
