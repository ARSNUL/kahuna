import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import UserDetail from '../UserDetail';
import './index.css';
import { addUsers, getAllUsers } from '../../actions/users';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { showUserDetail: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleClick(id) {
    window.location = `/admin/Users?id=${id}`;
    // this.setState({ showUserDetail: true });
  }

  handleKeyDown() {
    this.setState({ showUserDetail: true });
  }

  handleMouseOver() {
    this.setState({ hovered: true });
  }

  handleMouseOut() {
    this.setState({ hovered: false });
  }

  theClass() {
    if (this.state.hovered) {
      return 'User Hovered';
    }
    return 'User';
  }

  style() {
    if (this.state.hovered) {
      return { backgroundColor: '#dadada' };
    }
    return { backgroundColor: 'white' };
  }

  render() {
    const id = this.props.params.user_id;
    if (this.state.showUserDetail) {
      return <UserDetail idUser={id} />;
    }
    return (
      <tr
        className={this.theClass()}
        onMouseOver={this.handleMouseOver}
        onFocus={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onBlur={this.handleMouseOut}
        onClick={e => this.handleClick(id, e)}
        onKeyDown={this.handleKeyDown}
        role="presentation"
        // style={this.style()}
      >
        <td>{this.props.params.given_name}&nbsp;{this.props.params.family_name}</td>
        <td>{this.props.params.email}</td>
        <td>{this.props.params.last_login}</td>
        <td>{this.props.params.created_at}</td>
        <td>{this.props.params.email_verified}</td>
      </tr>
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
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    nickname: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
  }),
};

User.defaultProps = {
  params: {},
};

function mapStateToProps(state) {
  return { state };
}

export default withRouter(connect(mapStateToProps, { addUsers, getAllUsers })(User));
