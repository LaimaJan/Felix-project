import './index.css';
// import Button from '../Button';
// import { Children } from 'react';

function Hero({ className, children }) {
	return (
		<div className={className}>
			<div className="hero-content">
				<p className="paragraph">Wanna more Content?</p>
				{children}
			</div>
		</div>
	);
}

export default Hero;
