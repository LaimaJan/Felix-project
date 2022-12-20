import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { FaEye } from 'react-icons/fa';

import './SignIn.css';

function SignInUseState() {
	// const retrieveToken = localStorage.getItem('token') || '';
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [failureMessage, setFailureMessage] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);

	const managePasswordVisibility = () => {
		setHidePassword(!this.state.hidePassword);
	};

	const signInUser = async (username, password) => {
		return fetch('https://dummy-video-api.onrender.com/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: username, password: password }),
		}).then(async function (data) {
			let response = await data.json();
			// console.log('Tokenas');
			// console.log(response);

			localStorage.setItem('token', response.token);
			// setToken(response.token);
		});
	};

	useEffect(() => {
		signInUser();
	});

	const toggleFailMessageClass = () => {
		const currentState = failureMessage;
		setFailureMessage(!currentState);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (username === '' || password === '') {
			toggleFailMessageClass();
		} else {
			const tokenval = await signInUser(username, password);
			console.log(tokenval);

			setUsername({ username: '' });
			setPassword({ password: '' });
		}
		navigate('/myPage');
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
						<input
							type="text"
							value={username}
							id="username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
					<label>
						<p>Password</p>
						<div className="password-icon-container">
							<input
								id="password"
								value={password}
								type={hidePassword ? 'password' : 'text'}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FaEye onClick={managePasswordVisibility} />
						</div>
						<div
							className={
								failureMessage ? 'failure-message' : 'failure-message-disabled'
							}
							onClick={toggleFailMessageClass}
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

export default SignInUseState;
