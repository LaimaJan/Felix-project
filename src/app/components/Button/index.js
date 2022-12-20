import './Button.css';
import cx from 'classnames';
import { Link } from 'react-router-dom';

// function Button({ className, placeholder, id, onClick }) {
// 	return (
// 		<button className={className} id={id} onClick={onClick}>
// 			{placeholder}
// 		</button>
// 	);
// }

// export default Button;

function Button({
	children,
	type = 'button',
	size,
	design,
	onClick,
	to,
	disabled,
}) {
	const Component = to ? Link : 'button';
	const buttonType = to ? null : type;
	const className = cx('Button', {
		'Button--small': size === 'small',
		'Button--outline': design === 'outline',
	});

	// 	// replaced by classnames package cx function
	// 	// const sizeClass = { small: "Button--small" }[size];
	// 	// const designClass = { outline: "Button--outline" }[design];
	// 	// const className = ["Button", sizeClass, designClass].filter(Boolean).join(" ");

	return (
		<Component
			disabled={disabled}
			to={to}
			onClick={onClick}
			type={buttonType}
			className={className}
		>
			{children}
		</Component>
	);
}
export default Button;
