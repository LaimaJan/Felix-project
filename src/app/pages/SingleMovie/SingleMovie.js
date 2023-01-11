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
	// const [singleMovie, setSingleMovie] = useState([]);

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
				</main>
				<Footer />
			</div>
			<div
				className={openModal ? 'show-video-modal' : 'disable-video-modal'}
				onClick={exitTrailer}
			>
				<iframe
					title="movieTrailer"
					src={movies[0].video}
					frameBorder="0"
					allowFullScreen
				/>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		favorites: state.content.favorites || [],
		movies: state.content.movies,
		loadingState: state.content.loading,
		errorState: state.content.error,
		token: state.token.token || [],
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onHandleClick: (id, isFavorite) => {
			if (isFavorite) {
				dispatch({ type: 'REMOVE_FAVORITE', id });
			} else {
				dispatch({ type: 'ADD_FAVORITE', id });
			}
		},
		onLoading: () => {
			dispatch({ type: 'GET_MOVIES' });
		},
		onSuccess: (payload) => {
			dispatch({ type: 'GET_MOVIES_SUCCES', payload });
		},
		onFailure: () => {
			dispatch({ type: 'GET_MOVIES_FAILURE' });
		},
		logOut: (token) => {
			if (token) {
				dispatch({ type: 'DELETE_TOKEN', token });
			}
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
