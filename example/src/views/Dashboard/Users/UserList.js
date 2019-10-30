import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserList = ({ users }) => (
  <div>
    <ul style={{ listStyle: "none", paddingInlineStart: 0 }}>
      {users.map(user => (
        <li key={user.id}>
          {user.firstName} {user.lastName}
        </li>
      ))}
    </ul>
  </div>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  )
};

const mapState = state => ({ users: state.users });

export default connect(mapState)(UserList);
