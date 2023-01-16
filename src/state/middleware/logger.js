import content from '../../content';

const logger =
	({ getState, dispatch }) =>
	(next) =>
	(action) => {
		// console.log('ACTION', action);

		if (action.type !== content.types.ADD_FAVORITE) {
			next(action);
		}
	};

export default logger;
