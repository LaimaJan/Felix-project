import './Button.css';
import cx from 'classnames';

// function Button({ className, placeholder, id, onClick }) {
// 	return (
// 		<button className={className} id={id} onClick={onClick}>
// 			{placeholder}
// 		</button>
// 	);
// }

// export default Button;

function Button({ children, type = 'button', size, design, onClick }) {
	const className = cx('Button', {
		'Button--small': size === 'small',
		'Button--outline': design === 'outline',
	});

	// 	// replaced by classnames package cx function
	// 	// const sizeClass = { small: "Button--small" }[size];
	// 	// const designClass = { outline: "Button--outline" }[design];
	// 	// const className = ["Button", sizeClass, designClass].filter(Boolean).join(" ");

	return (
		<button onClick={onClick} type={type} className={className}>
			{children}
		</button>
	);
}
export default Button;
