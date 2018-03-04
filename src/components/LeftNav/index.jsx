import React, { Component } from 'react';
import './index.css';

class LeftNav extends Component {
  render() {
    return (
      <nav className="LeftNav">
        <ul>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Clients</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>APIs</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>SSO Integrations</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Connections</span>
            </a>
          </li>
          <li>
            <a className="NavItem NavSelected" href="/Admin">
              <span>Users</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Rules</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Hooks</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Multifactor Auth</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Hosted Pages</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Emails</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Logs</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Anomaly Detection</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <a className="NavItem" href="/Admin">
              <span>Extensions</span>
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
