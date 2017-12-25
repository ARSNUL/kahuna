import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import Users from '../../components/Users';
import './index.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentWillMount() {
    fetch('https://api.***REMOVED***rx.io/cut/users')
      .then(response => response.json())
      .then((jsonResponse) => {
        this.setState(() => ({ users: jsonResponse }));
      });
  }

  render() {
    const { users } = this.state;
    return (
      <div className="Admin">
        <div className="lander">
          <h1>Admin</h1>
          <h3>Search</h3>
          <form>
            <input typeof="text" />
          </form>
          <Users users={users} />
        </div>
      </div>
    );
  }
}

export default Admin;
