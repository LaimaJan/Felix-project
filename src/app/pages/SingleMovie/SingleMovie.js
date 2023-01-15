import { useState, useCallback, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';

import { API } from '../../constants';
import { connect } from 'react-redux';

import './SingleMovie.css';

// import * as AUTH_TYPES from '../../../auth/types';
// import * as CONTENT_TYPES from '../../../content/types';

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
	console.log(id);
	console.log(movies);

	const fetchData = useCallback(
		async (id) => {
			onLoading();

			try {
				const tokenNumber = token;
				console.log(token);
				const result = await fetch(`${API.paidMovies}/${id}`, {
					method: 'GET',
					headers: {
						Authorization: tokenNumber,
					},
				});
				if (result.status >= 400 && result.status <= 599) {
					throw new Error('failed to load');
				} else {
					let response = await result.json();

					console.log(response);
					onSuccess(response);
				}
			} catch (error) {
				onFailure();
			}
		},
		[onLoading, onSuccess, onFailure, token]
	);

	useEffect(() => {
		console.log('CONSOLE LOGAS');

		fetchData(id);
	}, [id, fetchData]);

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
					{movies[0] && (
						<SingleMovieCard
							id={movies[0].id}
							key={movies[0].id}
							title={movies[0].title}
							description={movies[0].description}
							image={movies[0].image}
							onHandleClick={() => onHandleClick(id, favorites.includes(id))}
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

function mapStateToProps(state) {
	return {
		favorites: content.selectors.getFavorites(state),
		movies: content.selectors.getMovies(state),
		loadingState: content.selectors.getMoviesLoading(state),
		errorState: content.selectors.getMoviesError(state),
		token: auth.selectors.getToken(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onHandleClick: (id, isFavorite) => {
			if (isFavorite) {
				dispatch({ type: content.types.REMOVE_FAVORITE, id });
			} else {
				dispatch({ type: content.types.ADD_FAVORITE, id });
			}
		},
		onLoading: () => {
			dispatch({ type: content.types.GET_MOVIES });
		},
		onSuccess: (payload) => {
			dispatch({ type: content.types.GET_MOVIES_SUCCESS, payload });
		},
		onFailure: () => {
			dispatch({ type: content.types.GET_MOVIES_FAILURE });
		},
		logOut: (token) => {
			if (token) {
				dispatch({ type: auth.types.DELETE_TOKEN, token });
			}
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
