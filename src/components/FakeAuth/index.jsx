// import React, { Component } from 'react';
//
// export default class FakeAuth extends Component {
// 	isAuthenticated = false;
//
// 	constructor() {
// 		super();
// 	};
//
// 	authenticate(cb) {
// 		console.log('mk12');
// 		this.isAuthenticated = true;
// 		setTimeout(cb, 100);
// 	};
//
// 	signout(cb) {
// 		this.isAuthenticated = false;
// 		setTimeout(cb, 100);
// 	};
// }
const FakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100);
	},
	signout(cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

export default FakeAuth;
