import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { FaEye } from 'react-icons/fa';

import './SignIn.css';

async function signInUser(credentials) {
	return fetch('http://localhost:8080/signIn', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	}).then((data) => {
		let response = data.json();
		console.log(response);
	});
}

function SignIn({ setToken }) {
	const [username, setUserName] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await signInUser({
			username,
			password,
		});
		setToken(token);
	};

	const [passwordShown, setPasswordShown] = useState(false);
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	return (
		<div className="signIn-wrapper">
			<Header>
				<Button>Sign in</Button>
			</Header>
			<div className="signIn-container">
				<form onSubmit={handleSubmit}>
					<label>
						<p>Username</p>
						<input type="text" onChange={(e) => setUserName(e.target.value)} />
					</label>
					<label>
						<p>Password</p>
						<div className="password-icon-container">
							<input
								className="password"
								type={passwordShown ? 'text' : 'password'}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FaEye onClick={togglePassword} />
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

SignIn.propTypes = {
	setToken: PropTypes.func.isRequired,
};

export default SignIn;
