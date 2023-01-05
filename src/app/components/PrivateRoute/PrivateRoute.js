import { Navigate, Outlet, useHref } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ token }) {
	const href = useHref();

	if (!token) {
		return <Navigate to="/signIn" replace state={href} />;
	}

	return <Outlet />;
}

function mapStateToProps(state) {
	return {
		token: state.token.token || [],
	};
}

export default connect(mapStateToProps)(PrivateRoute);
