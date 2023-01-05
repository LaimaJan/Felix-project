import { FAVORITES_STORAGE } from '../constants';

const FIRST_STATE = {
	favorites: JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE)) || [],
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

		default:
			return state;
	}
}

export default reducer;
