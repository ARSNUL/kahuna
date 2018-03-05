import React, { Component } from 'react';
import './index.css';
// import Menu from '../Menu';
// import SearchForm from '../SearchForm';
// import MenuFlyout from '../MenuFlyout';

class Header extends Component {
  render() {
    return (
      <header className="gb_xc gb_yd gb_Cd gb_lc">
        <div className="gb_Bd gb_8d gb_Id gb_ae">
          <div className="gb_yc gb_Td">
            <div className="gb_ec">
              <svg viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </div>
            <span>Kahuna</span>
            <a className="Login" href="/Login">
              <span>Login</span>
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
