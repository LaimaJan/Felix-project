// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { FAVORITES_STORAGE } from '../constants';

import SingleMovie from './pages/SingleMovie/SingleMovie';
import Home from './pages/Home/Home';
import SignInUseState from './pages/SignIn/SignIn';
import MyPage from './pages/MyPage/MyPage';
import CreateUser from './pages/CreateUser/CreateUser';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PickPlan from './pages/PickPlan/PickPlan';
import Payment from './pages/Payment/Payment';

import store from '../state/index';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signIn" element={<SignInUseState />} />
					<Route element={<PrivateRoute />}>
						<Route path="/myPage" element={<MyPage />} />
					</Route>

					<Route element={<PrivateRoute />}>
						<Route path="/singleMovie/:id" element={<SingleMovie />} />
					</Route>
					{/* <Route path="/singleMovie/:id" element={<SingleMovie />} /> */}
					<Route path="/createUser" element={<CreateUser />} />
					<Route path="/createUser/pickPlan" element={<PickPlan />} />
					<Route path="/createUser/pickPlan/payment" element={<Payment />} />
					<Route path="*" element={<p>Theres's no page, go back!</p>} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
