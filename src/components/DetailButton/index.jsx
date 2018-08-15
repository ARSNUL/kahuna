import React from 'react';
import { PropTypes } from 'prop-types';
import './index.css';

function DetailButton(props) {
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

DetailButton.propTypes = {
  handler: PropTypes.func,
  value: PropTypes.string,
};

DetailButton.defaultProps = {
  handler: null,
  value: 'cancel',
};

export default DetailButton;
