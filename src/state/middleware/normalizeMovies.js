// import content from '../../content';

const normalizeMovies =
	({ getState, dispatch }) =>
	(next) =>
	(action) => {
		// console.log('NORMALIZE');

		// if (content.types.GET_MOVIES_SUCCESS === action.type) {
		// 	next({
		// 		...action,
		// 		payload: action.payload.filter(
		// 			({ title }) => !title.includes('Avengers')
		// 		),
		// 	});

		// 	console.log('NORMALIZED <---->');
		// } else {
		next(action);
		// }
	};

export default normalizeMovies;
