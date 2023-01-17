import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from 'redux';

import middleware from './middleware';
import contentReducer from '../content/reducer';
import tokenReducer from '../auth/reducer';

const rootReducer = combineReducers({
	content: contentReducer,
	token: tokenReducer,
});

const composeEnhancers =
	process.env.NODE_ENV === 'development' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

const applieMiddleware = applyMiddleware(...middleware);

const store = createStore(
	rootReducer,
	composeEnhancers(applieMiddleware(...middleware))
);

export default store;
