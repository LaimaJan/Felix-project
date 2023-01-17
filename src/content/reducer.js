import { FAVORITES_STORAGE } from '../app/constants';
import * as TYPES from './types';

const FIRST_STATE = {
	favorites: JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE)) || [],
	movies: [],
	loading: false,
	error: false,
};

console.log('moviesmovies: ' + FIRST_STATE.movies);

function reducer(state = FIRST_STATE, action) {
	switch (action.type) {
		case TYPES.ADD_FAVORITE:
			const newFavoriteMovies = state.favorites.concat(action.id);
			console.log('action.id: ' + newFavoriteMovies);
			console.log(window.localStorage);

			window.localStorage.setItem(
				FAVORITES_STORAGE,
				JSON.stringify(newFavoriteMovies)
			);
			console.log('IDEJO I LOCAL STORAGE');
			return { ...state, favorites: state.favorites.concat(action.id) };

		case TYPES.REMOVE_FAVORITE: {
			const newFavoriteMovies = state.favorites.filter(
				(movieId) => movieId !== action.id
			);

			window.localStorage.setItem(
				FAVORITES_STORAGE,
				JSON.stringify(newFavoriteMovies)
			);
			return { ...state, favorites: newFavoriteMovies };
		}
		case TYPES.GET_MOVIES: {
			return { ...state, loading: true, error: false };
		}
		case TYPES.GET_MOVIES_SUCCESS: {
			console.log('PAYLOAD: ' + action.payload);
			return {
				...state,
				movies: Array.isArray(action.payload)
					? action.payload
					: [action.payload],
				loading: false,
				error: false,
			};
		}
		case TYPES.GET_MOVIES_FAILURE: {
			return { ...state, error: true, loading: false };
		}
		default:
			return state;
	}
}

export default reducer;
