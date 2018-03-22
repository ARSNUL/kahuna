import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class DLObject extends Component {
  static handleClick() {
    // console.warn(e);
  }

  static handleKeyDown() {
    // console.warn(e);
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const strClass = 'dlobjectnormal dlobjects';
    return (
      <li
        key={this.props.params.sourceKey}
        className={strClass}
      >
        <button
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {this.props.params.destinationKey}
        </button>
      </li>
    );
  }
}

DLObject.propTypes = {
  params: PropTypes.shape({
    sourceKey: PropTypes.string,
    destinationKey: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

DLObject.defaultProps = {
  params: {},
};

export default DLObject;
