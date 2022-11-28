import './index.css';

import creditCards from './../../images/credit-cards 1.png';

function Footer() {
	return (
		<footer>
			<div className="footer-content">
				<p className="paragraph">
					We care about your entertainment. Copyright © 2019–2021 felix.com
				</p>
				<img className="credit-cards" src={creditCards} alt="credit cards" />
			</div>
		</footer>
	);
}

export default Footer;
