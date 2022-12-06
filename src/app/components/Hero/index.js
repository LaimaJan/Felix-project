import './index.css';
import Button from '../Button';

function Hero({ className }) {
	return (
		<div className={className}>
			<div className="hero-content">
				<p className="paragraph">Wanna more Content?</p>
				<Button>Get Access </Button>
			</div>
		</div>
	);
}

export default Hero;
