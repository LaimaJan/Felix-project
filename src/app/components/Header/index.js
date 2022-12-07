import './index.css';
import felixLogo from '../../images/F.svg';
// import Button from '../Button';
// import { Children } from 'react';

function Header({ className, children }) {
	return (
		<header className={className}>
			<img className="felixLogo" src={felixLogo} alt="felix-logo" />
			{children}
		</header>
	);
}

export default Header;
