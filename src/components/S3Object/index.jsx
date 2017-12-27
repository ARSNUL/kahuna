import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class S3Object extends Component {
  render() {
    let strClass = '';
    if (this.props.params.blocked === true) {
      strClass = 's3objectred s3objects';
    } else if (this.props.params.email_verified === true) {
      strClass = 's3objectgreen s3objects';
    } else {
      strClass = 's3objectyellow s3objects';
    }
    return (
      <li key={this.props.params.email} className={strClass}>{this.props.params.email}</li>
    );
  }
}

S3Object.propTypes = {
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

S3Object.defaultProps = {
  params: {},
};

export default S3Object;
