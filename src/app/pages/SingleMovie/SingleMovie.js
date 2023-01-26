import { useState, useContext, useEffect } from 'react';
import { ContentContext } from '../../context/ContentContext';
import logo from '../../images/logo.svg';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';
import { Link } from 'react-router-dom';

import './SingleMovie.css';

function SingleMovie() {
	const [openModal, setOpenModal] = useState(false);

	const { handleClick, favorites, getMovies, error, loading, movies, logOut } =
		useContext(ContentContext);

	const watchTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const exitTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const { id } = useParams();
	console.log(movies);

	useEffect(() => {
		getMovies('single', id);
	}, [id]);

	return (
		<div className="content-wrapper">
			<div className="singleMovie-wrapper">
				<Header>
					<Button>
						<Link to="/" onClick={logOut}>
							Logout
						</Link>
					</Button>
				</Header>
				<main>
					{loading && <img src={logo} className="App-logo" alt="logo" />}
					{error && <p>Whoops! Failed to Load! 🙊</p>}
					{movies[0] && (
						<SingleMovieCard
							id={movies[0].id}
							key={movies[0].id}
							title={movies[0].title}
							description={movies[0].description}
							image={movies[0].image}
							onHandleClick={() => handleClick(movies[0].id)}
							isFavorite={favorites.includes(movies[0].id)}
							clickWatchTrailer={watchTrailer}
						/>
					)}
				</main>
				<Footer />
			</div>
			<div
				className={openModal ? 'show-video-modal' : 'disable-video-modal'}
				onClick={exitTrailer}
			>
				{movies[0] && (
					<iframe
						title="movieTrailer"
						src={movies[0].video}
						frameBorder="0"
						allowFullScreen
					/>
				)}
			</div>
		</div>
	);
}

export default SingleMovie;
