import { legacy_createStore as createStore, combineReducers } from 'redux';
// import pageLoadReducer from '../pageLoading/reducer';
import contentReducer from '../content/reducer';
import tokenReducer from '../auth/reducer';

const rootReducer = combineReducers({
	content: contentReducer,
	token: tokenReducer,
	// loading: pageLoadReducer,
});

const store = createStore(rootReducer);

export default store;
