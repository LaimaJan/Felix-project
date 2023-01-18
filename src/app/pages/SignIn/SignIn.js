import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { FaEye } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
// import { compose, bindActionCreators } from 'redux';

import './SignIn.css';
import auth from '../../../auth';

function SignInUseState() {
	const dispatch = useDispatch();
	const loadingState = useSelector(auth.selectors.getLoading);
	const errorMessage = useSelector(auth.selectors.getError);

	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const redirectLink = useLocation().state || '/myPage';
	const [password, setPassword] = useState('');
	const [failureMessage, setFailureMessage] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);

	const managePasswordVisibility = () => {
		setHidePassword(!hidePassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (username === '' || password === '') {
			toggleFailMessageClass();
		} else {
			dispatch(auth.actions.loginFetch());
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
					dispatch(
						auth.actions.loginFailure(
							response.status === 400 ? toggleFailMessageClass() : 'request'
						)
					);
				} else {
					const { token } = await response.json();

					dispatch(auth.actions.loginSuccess(token));
					navigate(redirectLink);
				}
			} catch (error) {
				dispatch(auth.actions.loginFailure('request'));
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

export default SignInUseState;
