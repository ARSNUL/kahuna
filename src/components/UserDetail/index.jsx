import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserById } from '../../actions/users';
import './index.css';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { params: {} };
    // this.state.params = { email: '' };
  }

  componentWillMount() {
    const objUser = this.props.getUserById(this.props.idUser);
    this.setState({ params: objUser[this.props.idUser] });
  }

  render() {
    if (this.state.params === undefined) {
      return (
        <div className="UserDetail" />
      );
    }
    return (
      <div className="UserDetail">
        <p>{this.state.params.user_id}</p>
        <p>{this.state.params.email}</p>
        <p>{this.state.params.email_verified}</p>
        <p>{this.state.params.blocked}</p>
        <p>{this.state.params.created_at}</p>
        <p>{this.state.params.last_ip}</p>
        <p>{this.state.params.last_login}</p>
        <p>{this.state.params.last_password_reset}</p>
        <p>{this.state.params.logins_count}</p>
        <p>{this.state.params.name}</p>
        <p>{this.state.params.nickname}</p>
        <p>{this.state.params.updated_at}</p>
      </div>
    );
  }
}

UserDetail.propTypes = {
  idUser: PropTypes.string,
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
  idUser: null,
  params: {},
};

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps, { getUserById })(UserDetail));
