import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { FaEye } from 'react-icons/fa';
import NavLinkTo from '../../components/NavLink/Navlink';

import './CreateUser.css';

function CreateUser() {
	const [hidePassword, setHidePassword] = useState(true);
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [email, setEmail] = useState('');

	let activeClassName = 'underline';

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('My email: ' + email);
	};

	const managePasswordVisibility = () => {
		setHidePassword(!hidePassword);
	};

	return (
		<div className="App-wrapper">
			<Header className="header">
				<Button>
					<Link to="/signIn">Sign in</Link>
				</Button>
			</Header>

			<div className="main-content-wrapper">
				<div className="form-actions-wrapper">
					<div className="row-of-actions">
						<div className="create-user">
							<NavLinkTo
								to="createUser"
								style={({ isActive }) =>
									isActive ? activeClassName : undefined
								}
							>
								Create User
							</NavLinkTo>
							{/* <p>Create User</p> */}
						</div>
						<div className="pick-a-plan">
							<NavLinkTo
								to="pickPlan"
								style={({ isActive }) =>
									isActive ? activeClassName : undefined
								}
							>
								Pick a Plan
							</NavLinkTo>
						</div>
						<div className="payment">
							<NavLinkTo
								to="payment"
								style={({ isActive }) =>
									isActive ? activeClassName : undefined
								}
							>
								Payment
							</NavLinkTo>
						</div>
					</div>
					<form className="createUser-form" onSubmit={handleSubmit}>
						<label>
							<p>Email</p>
							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<label>
							<p>Password</p>
							<div className="icon-container">
								<input
									id="password"
									value={password}
									type={hidePassword ? 'password' : 'text'}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<FaEye onClick={managePasswordVisibility} />
							</div>
						</label>
						<label>
							<p>Repeat password</p>
							<div className="icon-container">
								<input
									id="password-repeat"
									value={repeatPassword}
									type={hidePassword ? 'password' : 'text'}
									onChange={(e) => setRepeatPassword(e.target.value)}
								/>
								<FaEye onClick={managePasswordVisibility} />
							</div>
						</label>
						<div className="continue-button-container">
							<Button type="submit" id="submit-btn">
								Continue
							</Button>
						</div>
					</form>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default CreateUser;
