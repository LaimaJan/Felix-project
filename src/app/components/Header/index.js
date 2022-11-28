import './index.css';
import felixLogo from './../../images/F.svg';

function Header({ className }) {
	return (
		<header className={className}>
			<img className="felixLogo" src={felixLogo} alt="felix-logo" />
			<button className="sign-in-btn btn">Sign in</button>
		</header>
	);
}

export default Header;
