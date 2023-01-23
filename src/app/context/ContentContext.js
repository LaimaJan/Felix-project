import { useState, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { API, FAVORITES_STORAGE } from '../../constants';

const ContentContext = createContext();

const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState(
		JSON.parse(localStorage.getItem(FAVORITES_STORAGE)) || []
	);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [movies, setMovies] = useState([]);

	const { token } = useContext(AuthContext);

	const handleClick = (id) => {
		// console.log(favorites);
		let newFavorites = [...favorites];
		// console.log('asd');
		// console.log(newFavorites);
		// let newFavorites = [];

		if (favorites.includes(id)) {
			newFavorites = favorites.filter((movieId) => movieId !== id);
		} else {
			newFavorites = newFavorites.concat(id);
		}
		// console.log(newFavorites);

		window.localStorage.setItem(
			FAVORITES_STORAGE,
			JSON.stringify(newFavorites)
		);

		// console.log('NEWFAVORITES', newFavorites);
		setFavorites(newFavorites);
	};

	const getMovies = async (movieType = 'free', movieId) => {
		const tokenNumber = token;

		const apiEndpoint = {
			all: API.paidMovies,
			free: API.freeMovies,
			single: API.singleMovie(movieId),
		}[movieType];

		try {
			const result = await fetch(apiEndpoint, {
				method: 'GET',
				headers: {
					Authorization: tokenNumber,
				},
			});

			if (result.status >= 400 && result.status <= 599) {
				throw new Error('failed to load');
			} else {
				const json = await result.json();
				setMovies(json);
			}
		} catch (e) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ContentContext.Provider
			value={{ favorites, handleClick, getMovies, movies, error, loading }}
		>
			{children}
		</ContentContext.Provider>
	);
};

export { ContentContext, FavoritesProvider };
