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
		favorites: state.content.favorites || [],
		token: state.token.token || [],
		loadingState: state.content.loading,
		errorState: state.content.error,
		movies: state.content.movies,
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
		logOut: (token) => {
			if (token) {
				dispatch({ type: 'DELETE_TOKEN', token });
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
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
