import React from 'react';
import { PropTypes } from 'prop-types';
import './index.css';

function UserDetailButton(props) {
  const { handler } = props;
  const { value } = props;
  return (
    <input
      type="button"
      onClick={handler}
      value={value}
    />
  );
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
