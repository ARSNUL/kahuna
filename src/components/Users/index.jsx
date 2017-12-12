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
					const something = response.json();
				} else {
					response.json()
						.then((error) => {
						});
				}
			})
			.catch((err) => {
			});
	}

	render() {
		const users = this.state.users;

		return (
			<div className="users">
				<ul>
					{users}
				</ul>
			</div>
		);
	}
}
