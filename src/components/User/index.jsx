import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class User extends Component {
  render() {
    let strClass = '';
    if (this.props.params.blocked === true) {
      strClass = 'userred users';
    } else if (this.props.params.email_verified === true) {
      strClass = 'usergreen users';
    } else {
      strClass = 'useryellow users';
    }
    return (
      <li key={this.props.params.email} className={strClass}>{this.props.params.email}</li>
    );
  }
}

User.propTypes = {
  params: PropTypes.shape({
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
  }),
};

User.defaultProps = {
  params: {},
};

export default User;
