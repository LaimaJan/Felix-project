import * as TYPES from './types';

export const loginFetch = () => ({ type: TYPES.LOGIN });

export const loginSuccess = (token) => ({
	type: TYPES.LOGIN_SUCCESS,
	token,
});

export const loginFailure = (payload) => ({
	type: TYPES.LOGIN_FAILURE,
	payload,
});

export const logOut = (token) => ({ type: TYPES.DELETE_TOKEN, token });
