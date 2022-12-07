import React from 'react';
// import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { FaEye } from 'react-icons/fa';

import './SignIn.css';

export default class SignInSetState extends React.Component {
	constructor(props) {
		super(props);
		const retrieveToken = localStorage.getItem('token') || '';

		this.state = {
			username: '',
			password: '',
			hidePassword: true,
			token: retrieveToken,
			formValid: false,
		};
		console.log('TOKENAS');
		console.log(this.state.token);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	managePasswordVisibility = () => {
		this.setState({ hidePassword: !this.state.hidePassword });
	};

	signInUser = async (username, password) => {
		return fetch('http://localhost:8080/signIn', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: username, password: password }),
		}).then(async function (data) {
			let response = await data.json();
			console.log('RESPONSAS');
			console.log(response);

			localStorage.setItem('token', response.token);

			this.setState({ token: response.token });
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const tokenval = await this.signInUser(
			this.state.username,
			this.state.password
		);

		console.log(tokenval);

		// if (tokenval) {
		// 	// console.log('okokok');
		// 	// this.props.parentCallback(true);
		// 	this.setState({
		// 		token: tokenval,
		// 	});
		// }
	};

	render() {
		// const {} = this.state;

		return (
			<div className="signIn-wrapper">
				<Header>
					<Button>Sign in</Button>
				</Header>
				<div className="signIn-container">
					<form onSubmit={this.handleSubmit}>
						<label>
							<p>Username</p>
							<input
								type="text"
								value={this.state.username}
								id="username"
								onChange={this.handleChange}
							/>
						</label>
						<label>
							<p>Password</p>
							<div className="password-icon-container">
								<input
									id="password"
									value={this.state.password}
									type={this.state.hidePassword ? 'password' : 'text'}
									onChange={this.handleChange}
								/>
								<FaEye onClick={this.managePasswordVisibility} />
							</div>
						</label>
						<div className="button-container">
							{/* <Link to="/myPage"> */}
							<Button type="submit">Sign in</Button>
							{/* </Link> */}
						</div>
					</form>
				</div>
				<Footer />
			</div>
		);
	}
}

// SignInSetState.propTypes = {
// 	token: PropTypes.bool.isRequired,
// };
