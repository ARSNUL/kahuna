import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './index.css';

class UserDetailButton extends Component {
  render() {
    const { handler } = this.props;
    const { value } = this.props;
    return (
      <input
        type="button"
        onClick={handler}
        value={value}
      />
    );
  }
}

UserDetailButton.propTypes = {
  handler: PropTypes.func,
  value: PropTypes.string,
};

UserDetailButton.defaultProps = {
  handler: null,
  value: 'cancel',
};

export default UserDetailButton;
