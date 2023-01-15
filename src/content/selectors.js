export const getFavorites = (state) => state.content.favorites || [];
export const getMovies = (state) => state.content.movies;
export const getMoviesLoading = (state) => state.content.loading;
export const getMoviesError = (state) => state.content.error;
