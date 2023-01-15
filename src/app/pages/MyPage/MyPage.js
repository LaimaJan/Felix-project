import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { API } from '../../constants';
import { connect } from 'react-redux';

import './MyPage.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

import auth from '../../../auth';
import content from '../../../content';

function MyPage({
	favorites,
	token,
	onHandleClick,
	loadingState,
	errorState,
	logOut,
	movies,
	onLoading,
	onSuccess,
	onFailure,
}) {
	const navigate = useNavigate();
	const tokenNumber = token;

	const singleMovieClicked = (id) => {
		navigate(`/singleMovie/${id}`);
	};

	const fetchData = useCallback(async () => {
		onLoading();

		try {
			const result = await fetch(API.paidMovies, {
				method: 'GET',
				headers: {
					Authorization: tokenNumber,
				},
			});

			if (result.status >= 400 && result.status <= 599) {
				throw new Error('failed to load');
			} else {
				let response = await result.json();

				onSuccess(response);
			}
		} catch (error) {
			onFailure();
		}
	}, [onLoading, onSuccess, onFailure, tokenNumber]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="App">
			<Header className="header">
				<Link to="/">
					<Button onClick={() => logOut(token)}>Logout</Button>
				</Link>
			</Header>

			<Hero className="hero" />

			<main>
				<div className="main-content">
					{loadingState && <img src={logo} className="App-logo" alt="logo" />}
					{errorState && <p>Whoops! Failed to Load! 🙊</p>}

					{movies.map(({ title, id, image, description }) => (
						<MovieCard
							id={id}
							key={id}
							title={title}
							description={description}
							image={image}
							isFavorite={favorites.includes(id)}
							onHandleClick={() => onHandleClick(id, favorites.includes(id))}
							singleMovie={() => singleMovieClicked(id)}
						/>
					))}
				</div>

				<div className="main-content-btn">
					<Button>Get More Content </Button>
				</div>
			</main>

			<Footer />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		favorites: content.selectors.getFavorites(state),
		token: auth.selectors.getToken(state),
		loadingState: content.selectors.getMoviesLoading(state),
		errorState: content.selectors.getMoviesError(state),
		movies: content.selectors.getMovies(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onHandleClick: (id, isFavorite) => {
			if (isFavorite) {
				dispatch({ type: connect.types.REMOVE_FAVORITE, id });
			} else {
				dispatch({ type: connect.types.ADD_FAVORITE, id });
			}
		},
		logOut: (token) => {
			if (token) {
				dispatch({ type: auth.types.DELETE_TOKEN, token });
			}
		},
		onLoading: () => {
			dispatch({ type: connect.types.GET_MOVIES });
		},
		onSuccess: (payload) => {
			dispatch({ type: connect.types.GET_MOVIES_SUCCESS, payload });
		},
		onFailure: () => {
			dispatch({ type: connect.types.GET_MOVIES_FAILURE });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
