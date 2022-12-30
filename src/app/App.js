import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SingleMovie from './pages/SingleMovie/SingleMovie';
import Home from './pages/Home/Home';
import SignInUseState from './pages/SignIn/SignIn';
import MyPage from './pages/MyPage/MyPage';
import CreateUser from './pages/CreateUser/CreateUser';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PickPlan from './pages/PickPlan/PickPlan';
import Payment from './pages/Payment/Payment';

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
				<Route element={<PrivateRoute token={token} />}>
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
				</Route>

				<Route
					path="/singleMovie/:id"
					element={
						<SingleMovie onHandleClick={handleClick} favorites={favorites} />
					}
				/>
				<Route path="/createUser" element={<CreateUser />} />
				<Route path="/createUser/pickPlan" element={<PickPlan />} />
				<Route path="/createUser/pickPlan/payment" element={<Payment />} />
				<Route path="*" element={<p>Theres's no page, go back!</p>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
