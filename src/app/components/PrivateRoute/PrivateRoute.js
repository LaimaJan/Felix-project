import { Navigate, Outlet, useHref } from 'react-router-dom';
import { connect } from 'react-redux';

// import { getToken } from '../../../auth/selectors';
import auth from '../../../auth';

function PrivateRoute({ token }) {
	const href = useHref();

	if (!token) {
		return <Navigate to="/signIn" replace state={href} />;
	}

	return <Outlet />;
}

function mapStateToProps(state) {
	return {
		token: auth.selectors.getToken(state),
	};
}

export default connect(mapStateToProps)(PrivateRoute);
