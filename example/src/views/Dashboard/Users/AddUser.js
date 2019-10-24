import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "@jbknowledge/react-form";

import { Input, Button } from "src/common";

const AddUser = ({ addUserAsync }) => (
  <Form
    onSubmit={({ formValid, values: user, resetInputs }) => {
      if (formValid) {
        addUserAsync(user);
        resetInputs();
      }
    }}
  >
    <Input
      name="firstName"
      regex="^(?!\s*$).+"
      defaultErrorMessage="First name required"
      label="First Name"
    />
    <Input
      name="lastName"
      regex="^(?!\s*$).+"
      defaultErrorMessage="Last name required"
      label="Last Name"
    />
    <Button type="submit">Add User</Button>
  </Form>
);

const mapDispatch = ({ users: { addUserAsync } }) => ({ addUserAsync });

AddUser.propTypes = { addUserAsync: PropTypes.func };

export default connect(
  null,
  mapDispatch
)(AddUser);
