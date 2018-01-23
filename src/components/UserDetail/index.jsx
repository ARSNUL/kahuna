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
    this.state.accountVisibility = 'hidden';
    this.state.editName = false;
    this.handleClick = this.handleClick.bind(this);
    this.handleClickName = this.handleClickName.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
  }

  componentWillMount() {
    const objUser = this.props.getUserById(this.props.idUser);
    this.setState({ params: objUser[this.props.idUser] });
  }

  handleOnChangeEmail(event) {
    this.state.params.email = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleOnChangeName(event) {
    this.state.params.name = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleClickName() {
    this.setState({ editName: true });
  }

  handleClick() {
    this.setState({ accountVisibility: 'visible' });
  }

  render() {
    console.log(this.state.params);

    let elName;
    if (this.state.editName === true) {
      elName = (
        <form className="emk_t3" style={{ visibility: this.state.accountVisibility }}>
          <p>Basic Information</p>
          <div>
            <label htmlFor="username">Name&nbsp;
              <input
                id="username"
                type="text"
                value={this.state.params.name}
                onChange={e => this.handleOnChangeName(e)}
              />
            </label>
            <input type="submit" />
          </div>
          <div>
            <label htmlFor="useremail">Email&nbsp;
              <input
                id="useremail"
                type="text"
                value={this.state.params.email}
                onChange={e => this.handleOnChangeName(e)}
              />
            </label>
            <input type="submit" />
          </div>
          <div>
            <label htmlFor="emailverified">Email Verified&nbsp;
              <span>{this.state.params.email_verified ? 'yes' : 'no'}</span>
            </label>
          </div>
          <div>
            <label htmlFor="createdat">Created At&nbsp;
              <span id="createdat">{this.state.params.created_at}</span>
            </label>
          </div>
          <div>
            <label htmlFor="updatedat">Updated At&nbsp;
              <span id="updatedat">{this.state.params.updated_at}</span>
            </label>
          </div>
          <div>
            <label htmlFor="lastip">Last IP&nbsp;
              <span id="lastip">{this.state.params.last_ip}</span>
            </label>
          </div>
          <div>
            <label htmlFor="lastlogin">Last Login&nbsp;
              <span id="lastlogin">{this.state.params.last_login}</span>
            </label>
          </div>
          <div>
            <label htmlFor="loginscount">Logins Count&nbsp;
              <span id="loginscount">{this.state.params.logins_count}</span>
            </label>
          </div>
          <div>
            <label htmlFor="userid">User ID&nbsp;
              <span id="userid">{this.state.params.user_id}</span>
            </label>
          </div>
        </form>);
    } else {
      elName = (
        <form
          className="emk_t3"
          style={{ visibility: this.state.accountVisibility }}
        >
          <p>Basic Information</p>
          <div onClick={e => this.handleClickName(e)} role="presentation">
            <label htmlFor="username">Name&nbsp;
              <span id="username">{this.state.params.name}</span>
            </label>
          </div>
          <div onClick={e => this.handleClickName(e)} role="presentation">
            <label htmlFor="useremail">Email&nbsp;
              <span id="useremail">{this.state.params.email}</span>
            </label>
          </div>
          <div>
            <label htmlFor="emailverified">Email Verified&nbsp;
              <span>{this.state.params.email_verified ? 'yes' : 'no'}</span>
            </label>
          </div>
          <div>
            <label htmlFor="createdat">Created At&nbsp;
              <span id="createdat">{this.state.params.created_at}</span>
            </label>
          </div>
          <div>
            <label htmlFor="updatedat">Updated At&nbsp;
              <span id="updatedat">{this.state.params.updated_at}</span>
            </label>
          </div>
          <div>
            <label htmlFor="lastip">Last IP&nbsp;
              <span id="lastip">{this.state.params.last_ip}</span>
            </label>
          </div>
          <div>
            <label htmlFor="lastlogin">Last Login&nbsp;
              <span id="lastlogin">{this.state.params.last_login}</span>
            </label>
          </div>
          <div>
            <label htmlFor="loginscount">Logins Count&nbsp;
              <span id="loginscount">{this.state.params.logins_count}</span>
            </label>
          </div>
          <div>
            <label htmlFor="userid">User ID&nbsp;
              <span id="userid">{this.state.params.user_id}</span>
            </label>
          </div>
        </form>
      );
    }

    if (this.state.params === undefined) {
      return (
        <div className="UserDetail" />
      );
    }
    return (
      <div className="UserDetail emk_t4">
        <div className="UDSummary">
          <div className="UDControls">
            <img alt="Reset Password" src="/reset-password-24.svg" />
          </div>
          <div className="UDIcon"><br /></div>
          <div className="UDSumCont">
            <div className="">{this.state.params.name}</div>
            <div className="">{this.state.params.email}</div>
            <div className="">{this.state.params.last_login}</div>
            <div className="">{this.state.params.blocked}</div>
          </div>
        </div>
        <div
          className="emk_t5"
          onClick={e => this.handleClick(e)}
          role="presentation"
        >
          <div>
            <h3>Account</h3>
            <p>View and modify user profile</p>
            {elName}
          </div>
        </div>
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