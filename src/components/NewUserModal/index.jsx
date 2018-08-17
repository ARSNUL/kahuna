import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users';
import * as creatinguserActions from '../../actions/creatinguser';
import wrapper from '../../utils/cognito';
import './index.css';
import appConfig from '../../appConfig.json';

class NewUserModal extends Component {
  static responseFailure(err) {
    console.warn(err);
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.state.email = null;
    this.state.firstName = null;
    this.state.lastName = null;
    this.state.active = props.active;
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.responseSuccess = this.responseSuccess.bind(this);
    NewUserModal.responseFailure = NewUserModal.responseFailure.bind(this);
  }

  componentWillMount() {
    const { setIsCreating } = this.props;
    setIsCreating(true);
  }

  handleChange(e) {
    this.state[e.target.id] = e.target.value;
  }

  handleSave(e) {
    const { setIsCreating } = this.props;
    const { firstName, lastName, email } = this.state;
    setIsCreating(true);
    e.preventDefault();
    const objParams = {
      queryParams: {
        firstName: encodeURIComponent(firstName),
        lastName: encodeURIComponent(lastName),
      },
    };
    wrapper(
      `${appConfig.apis.newUser.uri}/${encodeURIComponent(email)}`,
      'POST',
      this.responseSuccess,
      this.responseFailure,
      objParams,
    );
  }

  responseSuccess(response) {
    console.log(response);
    const { setIsCreating } = this.props;
    setIsCreating(false);
  }

  render() {
    const { active, getIsCreating } = this.props;
    if (active !== true) {
      return null;
    }
    return (
      <div className="NewUserModalBackground">
        <div
          role="presentation"
          className="NewUserModal"
          onKeyDown={this.handleEscKeyCloseModal}
        >
          <div className="ModalTitle">
            <h1>Create New User</h1>
            <button type="button" aria-hidden="true" className="ModalExit">x</button>
          </div>
          <div>
            <hr />
          </div>
          <form>
            <div className="field-group">
              <label htmlFor="firstName">
                <span>First Name</span>
                <input
                  className="field"
                  onChange={this.handleChange}
                  autoComplete="first-name"
                  id="firstName"
                  name="firstName"
                />
              </label>
            </div>
            <div className="field-group">
              <label htmlFor="lastName">
                <span>Last Name</span>
                <input
                  className="field"
                  onChange={this.handleChange}
                  autoComplete="last-name"
                  id="lastName"
                  name="lastName"
                />
              </label>
            </div>
            <div className="field-group">
              <label htmlFor="email">
                <span>Email</span>
                <input
                  className="field"
                  onChange={this.handleChange}
                  autoComplete="email"
                  id="email"
                  name="email"
                />
                <abbr title="required">*</abbr>
              </label>
            </div>
            <div>
              <hr />
            </div>
            <div className="field-group">
              <button
                type="submit"
                id="submitNewUser"
                typeof="submit"
                onClick={e => this.handleSave(e)}
              >
                <span>{getIsCreating ? 'Creating' : 'Save'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewUserModal.propTypes = {
  active: PropTypes.bool,
  setIsCreating: PropTypes.func.isRequired,
  getIsCreating: PropTypes.func.isRequired,
};

NewUserModal.defaultProps = {
  active: false,
};

function mapStateToProps(state) {
  return { state };
}

export default withRouter(connect(mapStateToProps, {
  ...usersActions,
  ...creatinguserActions,
})(NewUserModal));
