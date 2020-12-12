import React from "react";
import { connect } from "react-redux";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { auth } from "../../../Firebase";
import Channel from "../channel/Channel";

const UserPanel = ({ user }) => {
  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={() => auth.signOut()}>Sign Out</span>,
    },
  ];
  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>Chat</Header.Content>
          </Header>
        </Grid.Row>

        {/* User Dropdown  */}
        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown
            trigger={
              <span>
                <Image src={user.photoURL} spaced="right" avatar />
                {user.displayName}
              </span>
            }
            options={dropdownOptions()}
          />
        </Header>
        <Channel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserPanel);
