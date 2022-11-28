import { useState } from 'react';
import '../../App.css';

function FavoriteBtn() {
	const [favorite, setFavorite] = useState(false);

	function handleClick() {
		setFavorite(!favorite);
	}

	return (
		<div className="film-btn-container">
			<button className="film-card-btn btn" onClick={handleClick}>
				{favorite ? 'Remove 💔' : 'Favorite'}
			</button>
		</div>
	);
}

export default FavoriteBtn;
