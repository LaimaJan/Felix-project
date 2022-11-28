import '../../App.css';

function Button({ className, placeholder, id, onClick }) {
	return (
		<button className={className} id={id} onClick={onClick}>
			{placeholder}
		</button>
	);
}

export default Button;
