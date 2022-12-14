import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SingleMovie from './pages/SingleMovie/SingleMovie';
import Home from './pages/Home/Home';
import SignInSetState from './pages/SignIn/SignInSetState';
import MyPage from './pages/MyPage/MyPage';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: [],
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id) {
		if (!this.state.favorites.includes(id)) {
			this.setState((prevState) => ({
				favorites: [...prevState.favorites, id],
			}));

			// localStorage.setItem('id', JSON.stringify([...this.state.favorites, id]));
		} else {
			const filmIds = this.state.favorites.filter((movieId) => movieId !== id);
			// localStorage.setItem('id', JSON.stringify(filmIds));

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
								onHandleClick={() => this.handleClick}
								favorites={this.state.favorites}
							/>
						}
					/>
					<Route path="/signIn" element={<SignInSetState />} />
					<Route
						path="/myPage"
						element={
							<MyPage
								onHandleClick={() => this.handleClick}
								favorites={this.state.favorites}
							/>
						}
					/>
					<Route
						path="/singleMovie/:id"
						element={
							<SingleMovie
								onHandleClick={() => this.handleClick}
								favorites={this.state.favorites}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
