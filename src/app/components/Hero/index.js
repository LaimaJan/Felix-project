import './index.css';
import Button from '../Button';

function Hero({ className }) {
	return (
		<div className={className}>
			<div className="hero-content">
				<p className="paragraph">Wanna more Content?</p>
				<Button className="get-access-btn btn" placeholder="Get Access" />
			</div>
		</div>
	);
}

export default Hero;
