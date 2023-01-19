import { useState, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { API, FAVORITES_STORAGE } from '../../constants';

const ContentContext = createContext();

const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState(
		localStorage.getItem(FAVORITES_STORAGE) || []
	);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [movies, setMovies] = useState([]);

	const { token } = useContext(AuthContext);

	const handleClick = (id) => {
		console.log(id);
		let newFavorites = [...favorites];

		if (favorites.includes(id)) {
			newFavorites = favorites.filter((movieId) => movieId !== id);
		} else {
			newFavorites = newFavorites.concat(id);
		}

		window.localStorage.setItem(
			FAVORITES_STORAGE,
			JSON.stringify(newFavorites)
		);
		setFavorites(newFavorites);
	};

	const getMovies = async (movieType = 'free', movieId) => {
		const tokenNumber = token;

		console.log(movieId);

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
			// console.log('rezultatas', result);

			if (result.status >= 400 && result.status <= 599) {
				throw new Error('failed to load');
			} else {
				const json = await result.json();
				setMovies(json);

				console.log('FILMAI', movies);
			}
		} catch (e) {
			console.log(e);
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
