import './index.css';

function Hero({ className }) {
	return (
		<div className={className}>
			<div className="hero-content">
				<p className="paragraph">Wanna more Content?</p>
				<button className="get-access-btn btn">Get Access</button>
			</div>
		</div>
	);
}

export default Hero;
