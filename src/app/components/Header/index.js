import './index.css';
import felixLogo from './../../images/F.svg';
import Button from '../Button';

function Header({ className }) {
	return (
		<header className={className}>
			<img className="felixLogo" src={felixLogo} alt="felix-logo" />
			<Button className="sign-in-btn btn" placeholder="Sign in" />
		</header>
	);
}

export default Header;
