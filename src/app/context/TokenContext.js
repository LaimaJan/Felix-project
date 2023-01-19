import React, { useState } from 'react';

const TokenContext = React.createContext();

const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(
		window.localStorage.getItem('token' || [])
	);

	const updateToken = (token) => {
		window.localStorage.setItem('token', token);
		setToken(token);
	};

	return (
		<TokenContext.Provider value={{ token, updateToken }}>
			{children}
		</TokenContext.Provider>
	);
};

export { TokenContext, TokenProvider };
