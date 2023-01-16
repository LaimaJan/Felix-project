import content from '../../content';
import auth from '../../auth';
import { FAVORITES_STORAGE, TOKEN_STORAGE } from '../../app/constants';

const storage =
	({ getState }) =>
	(next) =>
	(action) => {
		next(action);

		const postActionState = getState();

		console.log(action.type, postActionState);

		switch (action.type) {
			case content.types.ADD_FAVORITE:
				const favorites = content.selectors.getFavorites(postActionState);

				window.localStorage.setItem(
					FAVORITES_STORAGE,
					JSON.stringify(favorites)
				);
				break;

			case content.types.REMOVE_FAVORITE:
				const undoFavorite = content.selectors.getFavorites(postActionState);

				window.localStorage.removeItem(
					FAVORITES_STORAGE,
					JSON.stringify(undoFavorite)
				);
				break;

			case auth.types.LOGIN_SUCCESS:
				const token = auth.selectors.getToken(postActionState);

				window.localStorage.setItem(TOKEN_STORAGE, token);
				break;

			case auth.types.LOGOUT:
				window.localStorage.removeItem(TOKEN_STORAGE);
				break;

			default:
				break;
		}
	};

export default storage;
