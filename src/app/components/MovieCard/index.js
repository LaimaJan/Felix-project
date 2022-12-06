import Button from '../Button';
import '../../App.css';

function MovieCard({ title, description, image, onHandleClick, isFavorite }) {
	return (
		<div className="film-card">
			<div className="film-card-image-holder">
				<img
					className="film-card-image"
					src={image}
					alt={`${title} movie poster`}
				></img>
			</div>
			<div className="film-card-bottom-content">
				<div className="film-card-text-container">
					<p className="film-title">{title}</p>
					<p className="film-summary">{description}</p>
				</div>

				{/* <div className="film-btn-container"> */}
				<Button
					// id={id}
					size="small"
					onClick={onHandleClick}
					design={isFavorite ? 'outline' : null}
				>
					{isFavorite ? 'Remove' : 'Add'}
				</Button>
				{/* </div> */}
			</div>
		</div>
	);
}

export default MovieCard;
