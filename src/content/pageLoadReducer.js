// import { useState } from 'react';

const INITIAL_STATE = {
	loading: false,
	error: false,
};
// console.log()

// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(false);

function pageLoadReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'ERROR_MESSAGE':
			return { ...state, error: action.error };
		case 'LOADING_MESSAGE':
			console.log(action);
			return { ...state, loading: action.loading };

		default:
			return state;
	}
}

export default pageLoadReducer;
