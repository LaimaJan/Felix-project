import { useState, useCallback, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';

import { API } from '../../../constants';
import { connect } from 'react-redux';

import './SingleMovie.css';

function SingleMovie({
	favorites,
	onHandleClick,
	pageLoading,
	pageLoadingError,
	loadingState,
	errorState,
	token,
	logOut,
}) {
	// const navigate = useNavigate();
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [singleMovie, setSingleMovie] = useState([]);

	// const logOut = () => {
	// 	localStorage.removeItem('token');
	// 	navigate(`/`);
	// };

	const watchTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const exitTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const { id } = useParams();

	const fetchData = useCallback(
		async (id) => {
			pageLoading(true);

			try {
				const tokenNumber = token;
				const result = await fetch(`${API.paidMovies}/${id}`, {
					method: 'GET',
					headers: {
						Authorization: tokenNumber,
					},
				});
				if (result.status >= 400 && result.status <= 599) {
					pageLoadingError(true);
				} else {
					let response = await result.json();
					setSingleMovie(response);
				}
			} catch (error) {
				pageLoadingError(true);
				// pageLoading(false);
			} finally {
				pageLoading(false);
			}
		},
		[pageLoading, pageLoadingError, token]
	);

	useEffect(() => {
		// console.log(id);
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
						id={singleMovie.id}
						key={singleMovie.id}
						title={singleMovie.title}
						description={singleMovie.description}
						image={singleMovie.image}
						onHandleClick={() => onHandleClick(id, favorites.includes(id))}
						isFavorite={favorites.includes(singleMovie.id)}
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
					src={singleMovie.video}
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
		loadingState: state.loading.loading,
		errorState: state.loading.error,
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
		pageLoading: (loading) => {
			dispatch({ type: 'LOADING_MESSAGE', loading });
		},
		pageLoadingError: (error) => {
			dispatch({ type: 'ERROR_MESSAGE', error });
		},
		logOut: (token) => {
			if (token) {
				dispatch({ type: 'DELETE_TOKEN', token });
			}
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
