import React, { Component } from 'react';
import './index.css';

class LeftNav extends Component {
  render() {
    return (
      <nav className="LeftNav">
        <ul>
          <li>
            <a className="NavItem NavSelected" href="/Admin">
              <span>Users</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Inventory">
              <span>Inventory</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Pipeline Management</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Upload">
              <span>Upload</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Logs</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Spark">
              <span>Spark</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Get Support</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default LeftNav;
