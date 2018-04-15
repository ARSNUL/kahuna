import React, { Component } from 'react';
import './index.css';

class Configuration extends Component {
  render() {
    return (
      <nav className="Configuration">
        <ul>
          <li>
            <a className="NavItem NavSelected" href="/Users">
              <span>Users</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Inventory">
              <span>Inventory</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Users">
              <span>Pipeline Management</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Upload">
              <span>Upload</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Users">
              <span>Logs</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Spark">
              <span>Spark</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Users">
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Users">
              <span>Get Support</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Configuration;
