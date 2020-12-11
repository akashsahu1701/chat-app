import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "../../Firebase";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { getUser } from "../../actions/auth";

const Login = ({ setAlert, getUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((signedInUser) => {
        getUser();
        setAlert("Login Successfully", "success");
      })
      .catch((err) => {
        console.error(err);
        setAlert(err.message, "danger");
      });
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }} color="black">
        <Header as="h2" icon color="blue" textAlign="center">
          <Link to="/">
            <Icon name="address card outline" color="blue" />
            Login To Chat
          </Link>
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              value={email}
              icon="mail"
              iconPosition="left"
              placeholder="Enter Email"
              onChange={(e) => onChange(e)}
              type="email"
              required
            />
            <Form.Input
              fluid
              name="password"
              value={password}
              icon="lock"
              iconPosition="left"
              placeholder="Enter Password"
              onChange={(e) => onChange(e)}
              type="password"
              required
            />

            <Button color="blue" fluid size="large" type="submit">
              Login
            </Button>
            <Message>
              New To The Site ? <Link to="/register">Register Here</Link>
            </Message>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, getUser })(Login);
