import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import User from '../../components/User';

class Users extends PureComponent {
  render() {
    console.log(this.props.users);
    const listUsers = [];
    this.props.users.forEach((user) => {
      listUsers.push(<User params={user} />);
    });

    const classUl = 'something';
    return (
      <ul className={classUl}>
        {listUsers}
      </ul>
    );
  }
}

Users.propTypes = {
  users: PropTypes.shape([
  ]),
};

Users.defaultProps = {
  users: [],
};

export default Users;
