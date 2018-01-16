import React, { Component } from 'react';
import './index.css';
import Menu from '../Menu';
import SearchForm from '../SearchForm';
import MenuFlyout from '../MenuFlyout';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <Menu />
        <SearchForm />
        <MenuFlyout />
      </header>
    );
  }
}

export default Header;
