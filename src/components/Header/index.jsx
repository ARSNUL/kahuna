import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <div>
          <form>
            <div>
              <input
                aria-label="Search"
                autoComplete="off"
                placeholder="Search for users, groups, and settings (e.g. setup MX records)"
              />
            </div>
          </form>
        </div>
      </header>
    );
  }
}

export default Header;
