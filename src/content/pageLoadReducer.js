const INITIAL_STATE = {
	loading: false,
	error: false,
};
console.log('loading: ' + INITIAL_STATE.loading);
console.log('error: ' + INITIAL_STATE.error);

function pageLoadReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'ERROR_MESSAGE':
			console.log('UUU');
			console.log(action);
			return { ...state, error: action.error };
		case 'LOADING_MESSAGE':
			console.log('ASD');
			console.log(action);
			return { ...state, loading: action.loading };

		default:
			return state;
	}
}

export default pageLoadReducer;
