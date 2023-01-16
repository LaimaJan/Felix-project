// import thunk from 'redux-thunk';
import logger from './logger';
import normalizeMovies from './normalizeMovies';
import storage from './storage';

const myThunk =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		if (typeof action === 'function') {
			action(dispatch, getState);
		} else {
			next(action);
		}
	};

const middlewareList = [myThunk, logger, normalizeMovies, storage];

export default middlewareList;
