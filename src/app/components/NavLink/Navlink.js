import { NavLink } from 'react-router-dom';

function NavLinkTo({ to, style, children }) {
	return (
		<div>
			<NavLink to={to} style={style}>
				{children}
			</NavLink>
		</div>
	);
}

export default NavLinkTo;
