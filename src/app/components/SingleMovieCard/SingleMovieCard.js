import Button from '../Button';
import './SingleMovieCard.css';

function SingleMovieCard({
	title,
	description,
	image,
	onHandleClick,
	clickWatchTrailer,
	isFavorite,
}) {
	return (
		<div className="movie-card">
			<div className="movie-card-image-holder">
				<img className="movie-card-image" src={image} alt="our-movie"></img>
			</div>

			<div className="movie-card-content">
				<div className="movie-summary">
					<p className="film-title">{title}</p>
					<p className="film-summary ">{description}</p>
				</div>
				<div className="movie-card-btn">
					<Button onClick={clickWatchTrailer}>Watch</Button>
					<Button
						size="small"
						onClick={onHandleClick}
						design={isFavorite ? 'outline' : null}
					>
						{isFavorite ? 'Remove' : 'Favorite'}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SingleMovieCard;
