import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../../Firebase";
import md5 from "md5";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

const Register = ({ setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const { username, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password is not matched", "danger");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          setAlert("User Created ", "success");

          createdUser.user.updateProfile({
            displayName: username,
            photoURL: `https://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`,
          });
        })
        .catch((err) => {
          console.error(err);
          setAlert(err.message, "danger");
        });
      setFormData({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
    }
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }} color="black">
        <Header as="h2" icon color="blue" textAlign="center">
          <Link to="/">
            <Icon name="address card outline" color="blue" />
            Register For Chat
          </Link>
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              value={username}
              icon="user"
              iconPosition="left"
              placeholder="Enter Username"
              onChange={(e) => onChange(e)}
              type="text"
              required
            />
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
            <Form.Input
              fluid
              name="password2"
              value={password2}
              icon="lock"
              iconPosition="left"
              placeholder="Enter Password Again"
              onChange={(e) => onChange(e)}
              type="password"
              required
            />
            <Button color="blue" fluid size="large" type="submit">
              Submit
            </Button>
            <Message>
              Already a user ? <Link to="/login">Login</Link>
            </Message>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(Register);
