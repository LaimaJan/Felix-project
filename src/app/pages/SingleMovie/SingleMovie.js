import { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';

import { useSelector, useDispatch } from 'react-redux';
// import { compose, bindActionCreators } from 'redux';

import './SingleMovie.css';

import auth from '../../../auth';
import content from '../../../content';

function SingleMovie() {
	const dispatch = useDispatch();
	const favorites = useSelector(content.selectors.getFavorites);
	const token = useSelector(auth.selectors.getToken);
	const loadingState = useSelector(content.selectors.getMoviesLoading);
	const errorState = useSelector(content.selectors.getMoviesError);
	const movies = useSelector(content.selectors.getMovies);

	const [openModal, setOpenModal] = useState(false);

	const watchTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const exitTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const { id } = useParams();
	console.log('id of single movie PAGE: ', id);

	const movie = movies.filter((movies) => id === movies.id);
	console.log('VIENAS FILMAS: ', movie);

	useEffect(() => {
		dispatch(content.actions.getMovies('single', id));
	}, [dispatch, id]);

	return (
		<div className="content-wrapper">
			<div className="singleMovie-wrapper">
				<Header>
					<Link to="/">
						<Button onClick={() => dispatch(auth.actions.logOut(token))}>
							Logout
						</Button>
					</Link>
				</Header>
				<main>
					{loadingState && <img src={logo} className="App-logo" alt="logo" />}
					{errorState && <p>Whoops! Failed to Load! 🙊</p>}
					{movie[0] && (
						<SingleMovieCard
							id={movie[0].id}
							key={movie[0].id}
							title={movie[0].title}
							description={movie[0].description}
							image={movie[0].image}
							onHandleClick={() => dispatch(content.actions.onHandleClick(id))}
							isFavorite={favorites.includes(movie[0].id)}
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
				{movie[0] && (
					<iframe
						title="movieTrailer"
						src={movie[0].video}
						frameBorder="0"
						allowFullScreen
					/>
				)}
			</div>
		</div>
	);
}

export default SingleMovie;
