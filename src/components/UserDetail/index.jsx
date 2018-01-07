import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './index.css';

class UserDetail extends Component {
  render() {
    return (
      <div className="UserDetail">
        <p>{this.props.params.email}</p>
      </div>
    );
  }
}

UserDetail.propTypes = {
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

UserDetail.defaultProps = {
  params: {},
};

export default UserDetail;
