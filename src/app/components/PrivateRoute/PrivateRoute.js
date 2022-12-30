import { Navigate, Outlet, useHref } from 'react-router-dom';

function PrivateRoute({ token }) {
	const href = useHref();

	if (!token) {
		return <Navigate to="/signIn" replace state={href} />;
	}

	return <Outlet />;
}

export default PrivateRoute;
