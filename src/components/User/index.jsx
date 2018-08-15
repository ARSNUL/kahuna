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
    window.location = `/Users/Users?id=${id}`;
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
    const { hovered } = this.state;
    if (hovered) {
      return 'User Hovered';
    }
    return 'User';
  }

  style() {
    const { hovered } = this.state;
    if (hovered) {
      return { backgroundColor: '#dadada' };
    }
    return { backgroundColor: 'white' };
  }

  render() {
    const { params } = this.props;
    const id = params.user_id;
    const { showUserDetail } = this.state;
    if (showUserDetail) {
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
      >
        <td className="User Email">{params.email}</td>
        <td className="User GivenName">
          {params.given_name}
          &nbsp;
          {params.family_name}
        </td>
        <td className="User CreatedAt">
          <DateReadable id="created_at" value={params.created_at} />
        </td>
        <td className="User LastLogin">
          <DateReadable id="last_login" value={params.last_login} />
        </td>
        <td className="User EmailVerified">{params.email_verified}</td>
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
