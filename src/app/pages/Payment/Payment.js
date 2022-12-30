import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { FaEye } from 'react-icons/fa';

import './Payment.css';

function CreateUser() {
	const [hidePassword, setHidePassword] = useState(true);
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [email, setEmail] = useState('');

	// let activeStyle = {
	// 	textDecoration: 'underline',
	// };
	// let activeClassName = 'underline';

	// const fetchData = useCallback(async () => {
	// this.setState({ loading: true });
	// try {
	// 	const result = await fetch(
	// 		'https://dummy-video-api.onrender.com/content/free-items'
	// 	);
	// 	console.log(result);
	// 	if (result.status >= 400 && result.status <= 599) {
	// 		this.setState({ error: true });
	// 	} else {
	// 		const json = await result.json();
	// 		this.setState({ freeFilms: json });
	// 	}
	// } catch (error) {
	// 	this.setState({ error: true });
	// } finally {
	// 	this.setState({ loading: false });
	// }
	// });

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
						<div className="createUser">
							{/* <NavLink
								to="createUser"
								style={({ isActive }) => (isActive ? activeStyle : undefined)}
							>
								Create User
							</NavLink> */}
							<p>Create User</p>
						</div>
						<div className="pick-a-plan">
							{/* <NavLink
								to="pickPlan"
								style={({ isActive }) =>
									isActive ? activeClassName : undefined
								}
							>
								Pick a Plan
							</NavLink> */}
							<p>Pick a Plan</p>
						</div>
						<div className="planPayment">
							{/* <NavLink
								to="payment"
								style={({ isActive }) =>
									isActive ? activeClassName : undefined
								}
							>
								Payment
							</NavLink> */}
							<p>Payment</p>
						</div>
					</div>
					<form className="createUser-form">
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
