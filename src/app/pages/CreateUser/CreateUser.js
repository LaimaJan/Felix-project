import React from 'react';
import { Link } from 'react-router-dom';

// import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { FaEye } from 'react-icons/fa';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			hidePassword: true,

			formValid: false,
			loading: false,
			error: false,
		};
	}

	managePasswordVisibility = () => {
		this.setState({ hidePassword: !this.state.hidePassword });
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	async componentDidMount() {
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
	}

	render() {
		return (
			<div className="App">
				<Header className="header">
					<Button>
						<Link to="/signIn">Sign in</Link>
					</Button>
				</Header>

				<main>
					<div className="content-wrapper">
						<div className="row-of-actions">
							<div className="create-user">
								<p>Create User</p>
							</div>
							<div className="pick-a-plan">
								<p>Pick a Plan</p>
							</div>
							<div className="payment">
								<p>Payment</p>
							</div>
						</div>
						<div>
							<form>
								<label>
									<p>Email</p>
									<input type="text" />
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
								<label>
									<p>Repeat password</p>
									<div className="password-icon-container">
										<input
											id="password-repeat"
											value={this.state.password}
											type={this.state.hidePassword ? 'password' : 'text'}
											onChange={this.handleChange}
										/>
										<FaEye onClick={this.managePasswordVisibility} />
									</div>
								</label>
								<div className="button-container">
									<Button type="submit">Continue</Button>
								</div>
							</form>
						</div>
					</div>
				</main>

				<Footer />
			</div>
		);
	}
}

export default Home;
