import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
// import { Route } from 'react-router-dom';
import Users from '../../components/Users';
// import User from '../../components/User';
import './index.css';
import '../../common/style.scss';

class Admin extends Component {
  componentWillMount() {
    fetch('https://api.***REMOVED***rx.io/cut/users')
      .then(response => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
      });
  }

  render() {
    const classUl = 'something';
    const classLiR = 'userred users';
    const classLiY = 'useryellow users';
    const classLiG = 'usergreen users';
    const classLiN = 'usernormal users';
    return (
      <div className="Admin">
        <div className="lander">
          <h1>Admin</h1>
          <h3>Search</h3>
          <ul className={classUl}>
            <li className={classLiR}>EK</li>
            <li className={classLiY}>FQ</li>
            <li className={classLiG}>PS</li>
            <li className={classLiN}>JI</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Admin;
