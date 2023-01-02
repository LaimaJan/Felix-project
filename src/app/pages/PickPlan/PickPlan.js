import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import logo from '../../images/logo.svg';
import NavLinkTo from '../../components/NavLink/Navlink';
import PickAPlan from '../../components/PickAPlan/PickPlan';

import './PickPlan.css';

function CreateUser() {
	// let activeStyle = {
	// 	textDecoration: 'underline',
	// };
	const [allPlans, setAllPlans] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	let activeClassName = 'underline';

	const salesPlansLink = 'https://dummy-video-api.onrender.com/sales/plans';

	const fetchData = useCallback(async () => {
		setLoading(false);

		try {
			const result = await fetch(salesPlansLink);
			console.log(result);

			if (result.status >= 400 && result.status <= 599) {
				throw new Error('failed to load');
			} else {
				const json = await result.json();
				setAllPlans(json);
			}
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="App-wrapper">
			<Header className="header">
				<Button>
					<Link to="/signIn">Sign in</Link>
				</Button>
			</Header>

			<div className="main-content-wrapper">
				<div className="actions-wrapper">
					<div className="row-of-actions">
						<div className="createUser">
							<p>Create User</p>
						</div>
						<div className="pickPlan">
							<p>Pick a Plan</p>
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
					<div className="payment-plans">
						{loading && <img src={logo} className="App-logo" alt="logo" />}
						{error && <p>Whoops! Failed to Load!</p>}

						{allPlans.map(
							({
								id,
								title,
								monthlyCost,
								totalCost,
								frequencyUnit,
								frequencyInterval,
							}) => (
								<PickAPlan
									id={id}
									key={id}
									title={title}
									monthlyCost={monthlyCost}
									totalCost={totalCost}
									frequencyUnit={frequencyUnit}
									frequencyInterval={frequencyInterval}
								/>
							)
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default CreateUser;
