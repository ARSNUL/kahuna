import React, { PureComponent } from 'react';

export default class Users extends PureComponent {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.onChange = this.onChange.bind(this);
    // const accept = cookieIsTrue('accept');
    this.strApiUrl = 'https://api.***REMOVED***rx.io/cut/users';
  }

  componentDidMount() {
    // analCookiesBannerEnabled();
    this.loadData();
  }

  onChange(event) {
    let users = Object.assign({}, this.state.users);
    users = event.target.value;
    this.setState({ users });
  }

  loadData() {
    fetch(this.strApiUrl, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          const jsonResponse = response.json();
          console.log(jsonResponse);
        } else {
          response.json()
            .then((error) => {
              console.warn(error);
            });
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  render() {
    return (
      <div className="users">
        <ul>
          {this.state.users}
        </ul>
      </div>
    );
  }
}
