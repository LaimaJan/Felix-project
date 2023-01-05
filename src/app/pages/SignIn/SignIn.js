import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { FaEye } from 'react-icons/fa';

// import { API } from '../../../constants';
import { connect } from 'react-redux';

import './SignIn.css';

function SignInUseState({
	updateToken,
	pageLoading,
	loadingState,
	// pageLoadingError,
}) {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const redirectLink = useLocation().state || '/myPage';
	const [password, setPassword] = useState('');
	const [failureMessage, setFailureMessage] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);
	const [errorType, setErrorType] = useState();
	// const [loading, setLoading] = useState(false);
	const errorMessage = {
		request: 'Oops! Something went wrong!',
	}[errorType];

	const managePasswordVisibility = () => {
		setHidePassword(!hidePassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (username === '' || password === '') {
			toggleFailMessageClass();
		} else {
			pageLoading(true);
			try {
				const response = await fetch(
					'https://dummy-video-api.onrender.com/auth/login',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ username, password }),
					}
				);

				if (response.status > 399 && response.status < 600) {
					setErrorType(
						response.status === 400 ? toggleFailMessageClass() : 'request'
					);
				} else {
					const { token } = await response.json();

					updateToken(token);
					navigate(redirectLink);
				}
			} catch (error) {
				setErrorType('request');
			} finally {
				pageLoading(false);
			}
		}
	};

	const toggleFailMessageClass = () => {
		const currentState = failureMessage;
		setFailureMessage(!currentState);
	};

	return (
		<div className="signIn-wrapper">
			<Header>
				<Button>Sign in</Button>
			</Header>
			<div className="signIn-container">
				<form className="signIn-form" onSubmit={handleSubmit}>
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
						<Button disabled={loadingState} type="submit">
							Sign in
						</Button>
						{errorMessage && <p className="login-error">{errorMessage}</p>}
					</div>
				</form>
			</div>
			<Footer />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		token: state.token.token || [],
		loadingState: state.loading.loading,
		errorState: state.loading.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateToken: (token) => {
			if (token) {
				dispatch({ type: 'UPDATE_TOKEN', token });
			}
		},
		pageLoading: (loading) => {
			if (loading) {
				dispatch({ type: 'LOADING_MESSAGE', loading });
			}
		},
		pageLoadingError: (error) => {
			if (error) {
				dispatch({ type: 'ERROR_MESSAGE', error });
			}
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInUseState);
