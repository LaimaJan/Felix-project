import { FAVORITES_STORAGE } from '../app/constants';

const FIRST_STATE = {
	favorites: JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE)) || [],
	movies: [],
	loading: false,
	error: false,
};

function reducer(state = FIRST_STATE, action) {
	switch (action.type) {
		case 'ADD_FAVORITE':
			const newFavoriteMovies = state.favorites.concat(action.id);

			window.localStorage.setItem(
				FAVORITES_STORAGE,
				JSON.stringify(newFavoriteMovies)
			);
			return { ...state, favorites: state.favorites.concat(action.id) };

		case 'REMOVE_FAVORITE': {
			const newFavoriteMovies = state.favorites.filter(
				(movieId) => movieId !== action.id
			);

			window.localStorage.setItem(
				FAVORITES_STORAGE,
				JSON.stringify(newFavoriteMovies)
			);
			return { ...state, favorites: newFavoriteMovies };
		}
		case 'GET_MOVIES': {
			return { ...state, loading: true };
		}
		case 'GET_MOVIES_SUCCES': {
			console.log('PAYOLOAD: ' + action.payload);
			return {
				...state,
				movies: Array.isArray(action.payload)
					? action.payload
					: [action.payload],
				loading: false,
				error: false,
			};
		}
		case 'GET_MOVIES_FAILURE': {
			return { ...state, error: true, loading: false };
		}
		default:
			return state;
	}
}

export default reducer;
