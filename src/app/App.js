import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SingleMovie from './pages/SingleMovie/SingleMovie';
import Home from './pages/Home/Home';
import SignInSetState from './pages/SignIn/SignInSetState';
import MyPage from './pages/MyPage/MyPage';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signIn" element={<SignInSetState />} />
					<Route path="/myPage" element={<MyPage />} />
					<Route path="/singleMovie" element={<SingleMovie />} />
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
