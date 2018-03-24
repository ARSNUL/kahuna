import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import UserDetail from '../UserDetail';
import './index.css';
import { addUsers, getAllUsers } from '../../actions/users';
import DateReadable from '../DateReadable';

class User extends Component {
  static handleClick(id) {
    window.location = `/admin/Users?id=${id}`;
    // this.setState({ showUserDetail: true });
  }

  constructor(props) {
    super(props);
    this.state = { showUserDetail: false };
    this.handleClick = User.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
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
    // if (this.props.params.last_login === undefined) {
    //   this.props.params.last_login = 0;
    // }
    console.log(this.props.params.created_at);
    // console.log(this.props.params.last_login);
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
      >
        <td className="User Email">{this.props.params.email}</td>
        <td className="User GivenName">{this.props.params.given_name}&nbsp;{this.props.params.family_name}</td>
        <td className="User CreatedAt">
          <DateReadable id="created_at" value={this.props.params.created_at} />
        </td>
        <td className="User LastLogin">
          <DateReadable id="last_login" value={this.props.params.last_login} />
        </td>
        <td className="User EmailVerified">{this.props.params.email_verified}</td>
      </tr>
    );
  }
}

User.propTypes = {
  params: PropTypes.shape({
    blocked: PropTypes.bool,
    created_at: PropTypes.instanceOf(Date),
    email: PropTypes.string,
    email_verified: PropTypes.bool,
    last_ip: PropTypes.string,
    last_login: PropTypes.instanceOf(Date),
    last_password_reset: PropTypes.string,
    logins_count: PropTypes.number,
    name: PropTypes.string,
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    nickname: PropTypes.string,
    updated_at: PropTypes.instanceOf(Date),
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
