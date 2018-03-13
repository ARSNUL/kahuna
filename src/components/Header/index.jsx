import React from 'react';
import './index.css';
// import Menu from '../Menu';
// import SearchForm from '../SearchForm';
// import MenuFlyout from '../MenuFlyout';

function Header() {
  return (
    <header className="gb_xc gb_yd gb_Cd gb_lc">
      <div className="gb_Bd gb_8d gb_Id gb_ae">
        <div className="gb_yc gb_Td">
          <h1>Kahuna</h1>
          <a className="Login" href="/Login">
            <span>Login</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
