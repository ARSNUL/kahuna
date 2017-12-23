import React, { PureComponent } from 'react';
import User from '../../components/User';

class Users extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      users: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let users = Object.assign({}, this.state.users);
    users = event.target.value;
    this.setState({ users });
  }

  render() {
    return (
      <ul>{this.users}</ul>
    );
  }
}

export default Users;
