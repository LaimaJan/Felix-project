import { TOKEN_STORAGE } from '../constants';

const TOKEN_STATE = {
	token: window.localStorage.getItem(TOKEN_STORAGE) || '',
};

function tokenReducer(state = TOKEN_STATE, action) {
	switch (action.type) {
		case 'ADD_TOKEN':
			window.localStorage.setItem(TOKEN_STORAGE, action.token);

			return { ...state, token: action.token };

		case 'UPDATE_TOKEN':
			window.localStorage.removeItem(TOKEN_STORAGE);
			window.localStorage.setItem(TOKEN_STORAGE, action.token);

			return { ...state, token: action.token };

		case 'DELETE_TOKEN':
			window.localStorage.removeItem(TOKEN_STORAGE);

			return { ...state, token: action.token };

		default:
			return state;
	}
}

export default tokenReducer;
