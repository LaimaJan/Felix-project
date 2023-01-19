import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/ContentContext';
import { TokenProvider } from './context/AuthContext';

import SingleMovie from './pages/SingleMovie/SingleMovie';
import Home from './pages/Home/Home';
import SignInUseState from './pages/SignIn/SignIn';
import MyPage from './pages/MyPage/MyPage';
import CreateUser from './pages/CreateUser/CreateUser';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PickPlan from './pages/PickPlan/PickPlan';
import Payment from './pages/Payment/Payment';

function App() {
	return (
		<TokenProvider>
			<FavoritesProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />

						<Route path="/signIn" element={<SignInUseState />} />
						<Route element={<PrivateRoute />}>
							<Route path="/myPage" element={<MyPage />} />
						</Route>

						<Route path="/singleMovie/:id" element={<SingleMovie />} />
						<Route path="/createUser" element={<CreateUser />} />
						<Route path="/createUser/pickPlan" element={<PickPlan />} />
						<Route path="/createUser/pickPlan/payment" element={<Payment />} />
						<Route path="*" element={<p>Theres's no page, go back!</p>} />
					</Routes>
				</BrowserRouter>
			</FavoritesProvider>
		</TokenProvider>
	);
}

export default App;
