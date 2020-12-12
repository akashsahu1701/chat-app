import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Menu, Icon, Modal, Form, Button, Input } from "semantic-ui-react";
import { database } from "../../../Firebase";
import { uuid } from "uuid/dist/v4";

const Channel = ({ user }) => {
  const [channels, setChannel] = useState([]);
  const [formData, setFormData] = useState({
    channelName: "",
    channelDetails: "",
  });
  const { channelName, channelDetails } = formData;
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const AddChannel = () => {
    const newChannel = {
      id: uuid,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    database
      .ref("channels")
      .update(newChannel)
      .then(() => {
        setFormData({
          channelName: "",
          channelDetails: "",
        });
        console.log("channel Added");
      });
  };

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {/* Channels */}
      </Menu.Menu>

      {/* Add Channel Modal */}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                value={channelName}
                required
                onChange={(e) => onChange(e)}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                value={channelDetails}
                name="channelDetails"
                required
                onChange={(e) => onChange(e)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={AddChannel}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

Channel.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Channel);
