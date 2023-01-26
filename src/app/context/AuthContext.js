import { useState, createContext } from 'react';

const AuthContext = createContext();

const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(
		window.localStorage.getItem('token' || [])
	);

	const updateToken = (token) => {
		window.localStorage.setItem('token', token);
		setToken(token);
	};

	const logOut = () => {
		console.log('logOut triggered');
		setToken(null);
		// localStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider value={{ token, updateToken, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, TokenProvider };
