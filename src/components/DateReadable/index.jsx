import React from 'react';
import { PropTypes } from 'prop-types';
import './index.css';

function DateReadable(props) {
  const { value, id } = props;
  let strDateReadable = '';
  if (value !== null) {
    const diffTime = parseInt((Date.now() - props.value) / 1000, 10);
    if (diffTime < 60) {
      strDateReadable = `~${diffTime} seconds ago`;
    } else if (diffTime < (60 * 60)) {
      strDateReadable = `~${Math.round(diffTime / 60)} minutes ago`;
    } else if (diffTime < (60 * 60 * 24)) {
      strDateReadable = `~${Math.round(diffTime / 60 / 60)} hours ago`;
    } else if (diffTime < (60 * 60 * 24 * 30)) {
      strDateReadable = `~${Math.round(diffTime / 60 / 60 / 24)} days ago`;
    } else {
      strDateReadable = `~${Math.round(diffTime / 60 / 60 / 24 / 30)} months ago`;
    }
  } else {
    strDateReadable = '-';
  }
  return (
    <span id={id}>
      {strDateReadable}
    </span>
  );
}

DateReadable.propTypes = {
  id: PropTypes.string,
  value: PropTypes.instanceOf(Date),
};

DateReadable.defaultProps = {
  id: null,
  value: null,
};

export default DateReadable;
