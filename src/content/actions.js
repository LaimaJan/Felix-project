import * as TYPES from './types';
import { API } from '../app/constants';
import * as selectors from './selectors';
import auth from '../auth';

export const onHandleClick =
	(id) =>
	({ dispatch, getState }) => {
		console.log('getSTATES' + getState());
		const favorites = selectors.getFavorites(getState());
		const isFavorite = favorites.includes(id);

		dispatch({
			type: isFavorite ? TYPES.REMOVE_FAVORITE : TYPES.ADD_FAVORITE,
			id,
		});
	};

export const onLoading = () => (dispatch) => {
	dispatch({ type: TYPES.GET_MOVIES });
};

export const onSuccess = (payload) => ({
	type: TYPES.GET_MOVIES_SUCCESS,
	payload,
});

export const onFailure = () => ({ type: TYPES.GET_MOVIES_FAILURE });

export const getMovies =
	(movieType = 'free', movieId) =>
	async (dispatch, getState) => {
		const apiEndpoint = {
			all: API.paidMovies,
			free: API.freeMovies,
			single: API.singleMovie(movieId),
		}[movieType];

		dispatch({ type: TYPES.GET_MOVIES });

		try {
			const result = await fetch(apiEndpoint, {
				headers: {
					authorization: auth.selectors.getToken(getState()),
				},
			});

			if (result.status >= 400 && result.status <= 599) {
				throw new Error('failed to load');
			}
			const payload = await result.json();

			dispatch({
				type: TYPES.GET_MOVIES_SUCCESS,
				payload: Array.isArray(payload) ? payload : [payload],
			});
		} catch (error) {
			dispatch({ type: TYPES.GET_MOVIES_FAILURE });
		}
	};
