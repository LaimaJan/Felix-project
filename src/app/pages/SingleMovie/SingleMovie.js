import { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import './SingleMovie.css';

import auth from '../../../auth';
import content from '../../../content';

function SingleMovie({
	movies,
	favorites,
	onHandleClick,
	loadingState,
	errorState,
	token,
	logOut,
	getMovies,
	onLoading,
	onSuccess,
	onFailure,
}) {
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
		getMovies('single', id);
	}, [getMovies, id]);

	return (
		<div className="content-wrapper">
			<div className="singleMovie-wrapper">
				<Header>
					<Link to="/">
						<Button onClick={() => logOut(token)}>Logout</Button>
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
							onHandleClick={() => onHandleClick(id)}
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

const enhance = compose(
	connect(
		(state) => ({
			favorites: content.selectors.getFavorites(state),
			movies: content.selectors.getMovies(state),
			loadingState: content.selectors.getMoviesLoading(state),
			errorState: content.selectors.getMoviesError(state),
			token: auth.selectors.getToken(state),
		}),
		(dispatch) =>
			bindActionCreators(
				{
					onHandleClick: content.actions.onHandleClick,

					// logOut: auth.actions.logOut,
					// onLoading: content.actions.onLoading,

					// onSuccess: content.actions.onSuccess,

					// onFailure: content.actions.onFailure,
					getMovies: content.actions.getMovies,
				},
				dispatch
			)
	)
);

export default enhance(SingleMovie);
