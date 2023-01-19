import React, { useState } from 'react';

const FavoritesContext = React.createContext();

const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState(
		localStorage.getItem('favorites') || []
	);

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
		<FavoritesContext.Provider value={{ favorites, handleClick }}>
			{children}
		</FavoritesContext.Provider>
	);
};

export { FavoritesContext, FavoritesProvider };
