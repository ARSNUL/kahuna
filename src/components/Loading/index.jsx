import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './index.css';
import { addUsers, getAllUsers } from '../../actions/users';

class Loading extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { loading: this.props.loading };
    // this.state = { users: [] };
    // this.state.qs = queryString.parse(this.props.location.search);
  }

  componentWillMount() {
    console.warn(this.state);
  }

  render() {
    let strVisibility = 'hidden';
    if (this.state.loading === true) {
      strVisibility = 'visible';
    }
    return (
      <div
        className="Loading"
        style={{ visibility: strVisibility }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }
}

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: false,
};

function mapStateToProps(state) {
  return {
  };
}

export default withRouter(connect(mapStateToProps)(Loading));
