import { TOKEN_STORAGE } from '../constants';

// console.log(window.localStorage.getItem(TOKEN_STORAGE));
const TOKEN_STATE = {
	token: window.localStorage.getItem(TOKEN_STORAGE) || '',
};

function tokenReducer(state = TOKEN_STATE, action) {
	// console.log('action.token', action.token);
	switch (action.type) {
		case 'ADD_TOKEN':
			// console.log('action.token', action.token);
			window.localStorage.setItem(TOKEN_STORAGE, action.token);

			// console.log({ ...state, token: action.token });
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
