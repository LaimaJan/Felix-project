import { FAVORITES_STORAGE } from '../app/constants';
import * as TYPES from './types';

const FIRST_STATE = {
	favorites: JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE)) || [],
	movies: [],
	loading: false,
	error: false,
};

function reducer(state = FIRST_STATE, action) {
	switch (action.type) {
		case TYPES.ADD_FAVORITE:
			const newFavoriteMovies = state.favorites.concat(action.id);

			window.localStorage.setItem(
				FAVORITES_STORAGE,
				JSON.stringify(newFavoriteMovies)
			);
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
			return { ...state, loading: true };
		}
		case TYPES.GET_MOVIES_SUCCESS: {
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
		case TYPES.GET_MOVIES_FAILURE: {
			return { ...state, error: true, loading: false };
		}
		default:
			return state;
	}
}

export default reducer;
