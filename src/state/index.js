import { legacy_createStore as createStore, combineReducers } from 'redux';
import contentReducer from '../content/reducer';
import tokenReducer from '../content/tokenReducer';

const rootReducer = combineReducers({
	content: contentReducer,
	token: tokenReducer,
});

const store = createStore(rootReducer);

export default store;
