export const FAVORITES_STORAGE = 'favorites';
export const TOKEN_STORAGE = 'token';

const API_DOMAIN = 'https://dummy-video-api.onrender.com';

export const API = {
	login: `${API_DOMAIN}/auth/login`,
	freeMovies: `${API_DOMAIN}/content/free-items`,
	paidMovies: `${API_DOMAIN}/content/items`,
	// singleMovie: (id) => `${API_DOMAIN}/content/items/${id}`,
};
