const INITIAL_STATE = {
	loading: false,
	error: false,
};

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
