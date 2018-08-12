import React from 'react';
import './index.css';

function LeftNav() {
  return (
    <nav className="LeftNav">
      <ul>
        <li>
          <a className="NavItem NavSelected" href="/Users">
            <span>
              Users
            </span>
          </a>
        </li>
        <li>
          <a className="NavItem" href="/Inventory">
            <span>
              Inventory
            </span>
          </a>
        </li>
        <li>
          <a className="NavItem" href="/Upload">
            <span>
              Upload
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default LeftNav;
