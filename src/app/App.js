import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SingleMovie from './pages/SingleMovie/SingleMovie';
import Home from './pages/Home/Home';
import SignInUseState from './pages/SignIn/SignInUseState';
import MyPage from './pages/MyPage/MyPage';
import CreateUser from './pages/CreateUser/CreateUser';

function App() {
	const [favorites, setFavorites] = useState(
		localStorage.getItem('favorites') || []
	);

	const [token, setToken] = useState(
		window.localStorage.getItem('token' || [])
	);

	const updateToken = (token) => {
		window.localStorage.setItem('token', token);
		setToken(token);
	};

	const handleClick = (id) => {
		console.log(id);
		let newFavorites = [...favorites];

		if (favorites.includes(id)) {
			newFavorites = favorites.filter((movieId) => movieId !== id);
		} else {
			newFavorites = newFavorites.concat(id);
		}

		window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
		setFavorites(newFavorites);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home onHandleClick={handleClick} favorites={favorites} />}
				/>
				<Route
					path="/signIn"
					element={<SignInUseState updateToken={updateToken} />}
				/>
				<Route
					path="/myPage"
					element={
						<MyPage
							onHandleClick={handleClick}
							favorites={favorites}
							updateToken={updateToken}
							token={token}
						/>
					}
				/>
				<Route
					path="/singleMovie/:id"
					element={
						<SingleMovie onHandleClick={handleClick} favorites={favorites} />
					}
				/>
				<Route path="/createUser" element={<CreateUser />} />
				<Route path="*" element={<p>Your'e Lost! Go Back!</p>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
