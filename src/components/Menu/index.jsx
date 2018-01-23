import React, { Component } from 'react';
import './index.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ showMenu: true });
  }

  render() {
    return (
      <div
        role="presentation"
        className="Menu"
        onClick={e => this.handleClick(e)}
        onKeyDown={e => this.handleClick(e)}
      >
        <svg>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </div>
    );
  }
}

export default Menu;
