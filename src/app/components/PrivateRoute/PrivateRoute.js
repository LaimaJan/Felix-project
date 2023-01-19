import { Navigate, Outlet, useHref } from 'react-router-dom';
import { TokenContext } from '../../context/TokenContext';
import { useContext } from 'react';

function PrivateRoute() {
	const { token } = useContext(TokenContext);
	const href = useHref();

	if (!token) {
		return <Navigate to="/signIn" replace state={href} />;
	}

	return <Outlet />;
}

export default PrivateRoute;
