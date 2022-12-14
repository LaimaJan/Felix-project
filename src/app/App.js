import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SingleMovie from './pages/SingleMovie/SingleMovie';
import Home from './pages/Home/Home';
import SignInSetState from './pages/SignIn/SignInSetState';
import MyPage from './pages/MyPage/MyPage';
import CreateUser from './pages/CreateUser/CreateUser';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: [],
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id) {
		console.log(id);
		if (!this.state.favorites.includes(id)) {
			this.setState((prevState) => ({
				favorites: [...prevState.favorites, id],
			}));
		} else {
			const filmIds = this.state.favorites.filter((movieId) => movieId !== id);
			this.setState({
				favorites: filmIds,
			});
		}
	}

	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								onHandleClick={this.handleClick}
								favorites={this.state.favorites}
							/>
						}
					/>
					<Route path="/signIn" element={<SignInSetState />} />
					<Route
						path="/myPage"
						element={
							<MyPage
								onClick={this.handleClick}
								favorites={this.state.favorites}
							/>
						}
					/>
					<Route
						path="/singleMovie/:id"
						element={
							<SingleMovie
								onHandleClick={this.handleClick}
								favorites={this.state.favorites}
							/>
						}
					/>
					<Route path="/createUser" element={<CreateUser />} />
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
