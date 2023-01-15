import { TOKEN_STORAGE } from '../app/constants';
import * as TYPES from './types';

const TOKEN_STATE = {
	token: window.localStorage.getItem(TOKEN_STORAGE) || '',
	loading: false,
	error: null,
};

function tokenReducer(state = TOKEN_STATE, action) {
	switch (action.type) {
		case TYPES.LOGIN:
			return { ...state, loading: true, error: null };
		case TYPES.LOGIN_SUCCESS:
			window.localStorage.removeItem(TOKEN_STORAGE);
			window.localStorage.setItem(TOKEN_STORAGE, action.token);

			return { ...state, loading: false, token: action.token };

		case TYPES.DELETE_TOKEN:
			window.localStorage.removeItem(TOKEN_STORAGE);

			return { ...TOKEN_STATE, token: null };

		case TYPES.LOGIN_FAILURE: {
			const errorMessage =
				{ request: 'Oops! Something went wrong!' }[action.payload] || null;

			return { ...state, loading: false, error: errorMessage };
		}

		default:
			return state;
	}
}

export default tokenReducer;
