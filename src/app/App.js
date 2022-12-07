import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import SignInSetState from './pages/SignIn/SignInSetState';
import MyPage from './pages/MyPage/MyPage';

class App extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		token: false,
	// 	};
	// }

	// handleCallback = (childData) => {
	// 	console.log('app.js handleCallBack');
	// 	this.setState({ token: childData });
	// };

	// setToken = (userToken) => {
	// 	sessionStorage.setItem('token', JSON.stringify(userToken));
	// };

	// getToken = () => {
	// 	const tokenString = sessionStorage.getItem('token');
	// 	const userToken = JSON.parse(tokenString);
	// 	return userToken?.token;
	// };

	render() {
		// console.log('kokokokokok', this.state.token);
		// if (!this.state.token) {
		// 	console.log('kokoko');
		// 	return (
		// 		<SignInSetState
		// 			token={this.state.token}
		// 			parentCallback={this.handleCallback}
		// 		/>
		// 	);
		// }
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signIn" element={<SignInSetState />} />
					<Route path="/myPage" element={<MyPage />} />
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
