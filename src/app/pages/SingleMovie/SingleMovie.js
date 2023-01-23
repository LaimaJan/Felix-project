import { useState, useEffect, useContext } from 'react';
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

	useEffect(() => {
		getMovies('single', id);
	}, [id]);

	return (
		<div className="content-wrapper">
			<div className="singleMovie-wrapper">
				<Header>
					{/* <Link to="/"> */}
					<Button>
						<Link to="/" onClick={logOut}>
							Logout
						</Link>
					</Button>
					{/* </Link> */}
				</Header>
				<main>
					{loading && <img src={logo} className="App-logo" alt="logo" />}
					{error && <p>Whoops! Failed to Load! 🙊</p>}
					<SingleMovieCard
						id={movies.id}
						key={movies.id}
						title={movies.title}
						description={movies.description}
						image={movies.image}
						onHandleClick={() => handleClick(movies.id)}
						isFavorite={favorites.includes(movies.id)}
						clickWatchTrailer={watchTrailer}
					/>
				</main>
				<Footer />
			</div>
			<div
				className={openModal ? 'show-video-modal' : 'disable-video-modal'}
				onClick={exitTrailer}
			>
				<iframe
					title="movieTrailer"
					src={movies.video}
					frameBorder="0"
					allowFullScreen
				/>
			</div>
		</div>
	);
}

export default SingleMovie;
