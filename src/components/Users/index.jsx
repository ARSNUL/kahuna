import React, { PureComponent } from 'react';

export default class Users extends PureComponent {
	constructor() {
		super();
		this.state = {
			users: []
		};
		this.onChange = this.onChange.bind(this);
		// const accept = cookieIsTrue('accept');
		// this.state = { accept };
	}

	onChange(event) {
		let users = Object.assign({}, this.state.users);
		users = event.target.value;
		this.setState({ users });
	}

	componentDidMount() {
		// analCookiesBannerEnabled();
		this.loadData();
	}

	// onAccept = () => {
	// this.setState({ accept: true }, () => {
	// 	document.cookie = 'accept=true';
	// });
	//
	// analCookiesBannerAccepted();
	// };

	loadData() {
		const strApiUrl = 'https://api.***REMOVED***rx.io/cut/users';
		console.log(strApiUrl);
		fetch(strApiUrl, {
			method: 'GET',
		})
			.then(response => {
				if (response.ok) {
					console.log(response.body);
					let something = response.json();
					console.log(something);
				} else {
					response.json()
						.then(error => {
							console.warn(error);
						});
				}
			})
			.catch(err => {
				console.warn(err);
			});
	}

	render() {
		// const { accept } = this.state;
		// const rawBody = { __html: __('cookiePolicyBody') };

		const users = this.state.users;
		// for (let i = 0; i < 16; i += 1) {
		// 	const title = __(`beyondYourNumbersVideoTitle${i}`);
		// 	if (title.length) {
		// 		users.push(
		{/*<li className="auth0-item" key={user}>*/
		}
		{/*<UserWrapper*/
		}
		{/*onPlay={(target) => { this.onPlay(target, i); }}*/
		}
		{/*videoId={__(`beyondYourNumbersYouTubeId${i}`)}*/
		}
		{/*title={title}*/
		}
		{/*poster={$$(`beyondYourNumbersVideoPoster${i}`)}*/
		}
		{/*/>*/
		}
		// </li>,
		// );
		// }
		// }

		return (
			<div className="users">
				<ul>
					{users}
				</ul>
				{/*<h1 className="heading heading--s">{__('cookiePolicyHeader')}</h1>*/}
				{/*<p className="copy cookie--body" dangerouslySetInnerHTML={rawBody} />*/}
				{/*<Button onClick={this.onAccept}>{__('cookiePolicyAcceptCta')}</Button>*/}
			</div>
		);
	}
}
