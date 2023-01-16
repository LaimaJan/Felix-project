import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
} from 'redux';

import middleware from './middleware';
import contentReducer from '../content/reducer';
import tokenReducer from '../auth/reducer';

const rootReducer = combineReducers({
	content: contentReducer,
	token: tokenReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
