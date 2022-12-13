import React from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { FaEye } from 'react-icons/fa';
import { withRouter } from '../../components/useParam/UseParams';

import './SignIn.css';

class SignInSetState extends React.Component {
	constructor(props) {
		super(props);
		const retrieveToken = localStorage.getItem('token') || '';

		this.state = {
			username: '',
			password: '',
			hidePassword: true,
			token: retrieveToken,
			formValid: false,
			failureMessage: false,
		};
		console.log('Tokenas this.state');
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
		return fetch('https://dummy-video-api.onrender.com/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: username, password: password }),
		}).then(async function (data) {
			let response = await data.json();
			console.log('Tokenas');
			console.log(response);

			localStorage.setItem('token', response.token);
		});
	};

	toggleFailMessageClass() {
		const currentState = this.state.failureMessage;
		this.setState({ failureMessage: !currentState });
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		if (this.state.username === '' || this.state.password === '') {
			this.toggleFailMessageClass();
		} else {
			const tokenval = await this.signInUser(
				this.state.username,
				this.state.password
			);
			console.log(tokenval);

			this.setState({ username: '' });
			this.setState({ password: '' });

			this.props.navigate('/myPage');
		}
	};

	render() {
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
							<div
								className={
									this.state.failureMessage
										? 'failure-message'
										: 'failure-message-disabled'
								}
								onClick={this.toggleFailMessageClass}
							>
								<p>Failure: please check the login details.</p>
							</div>
						</label>
						<div className="button-container">
							<Button type="submit">Sign in</Button>
						</div>
					</form>
				</div>
				<Footer />
			</div>
		);
	}
}

export default withRouter(SignInSetState);
