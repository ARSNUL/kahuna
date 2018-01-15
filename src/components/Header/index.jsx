import React, { Component } from 'react';
import './index.css';
import Menu from '../Menu';
import SearchForm from '../SearchForm';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <Menu />
        <SearchForm />
      </header>
    );
  }
}

export default Header;
