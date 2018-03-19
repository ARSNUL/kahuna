import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import User from '../../components/User';
import './index.css';

class Users extends PureComponent {
  render() {
    const users = this.props.users.map(user =>
      <User key={user.user_id} params={user} />);
    return (
      <div className="Users">
        <div className="U2">
          <table cellSpacing="0" cellPadding="0">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Created</th>
                <th>Last Login</th>
                <th>Email Verified</th>
              </tr>
            </thead>
            <tbody>
              {users}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    blocked: PropTypes.bool,
    created_at: PropTypes.string,
    email: PropTypes.string,
    email_verified: PropTypes.bool,
    last_ip: PropTypes.string,
    last_login: PropTypes.string,
    last_password_reset: PropTypes.string,
    logins_count: PropTypes.number,
    name: PropTypes.string,
    nickname: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
    given_name: PropTypes.string,
    family_name: PropTypes.string,
  })),
};

Users.defaultProps = {
  users: [
    {
      blocked: false,
      created_at: null,
      email: null,
      email_verified: false,
      last_ip: null,
      last_login: null,
      last_password_reset: null,
      logins_count: 0,
      name: null,
      nickname: null,
      updated_at: null,
      user_id: null,
      given_name: '<EMPTY>',
      family_name: '<EMPTY>',
    },
  ],
};

export default Users;
