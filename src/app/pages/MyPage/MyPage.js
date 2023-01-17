import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { API } from '../../constants';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import './MyPage.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

import auth from '../../../auth';
import content from '../../../content';
// import { getMovies } from '../../../content/selectors';

function MyPage({
	favorites,
	token,
	onHandleClick,
	loadingState,
	errorState,
	logOut,
	movies,
	getMovies,
	onLoading,
	onSuccess,
	onFailure,
}) {
	const navigate = useNavigate();
	// const tokenNumber = token;

	const singleMovieClicked = (id) => {
		navigate(`/singleMovie/${id}`);
	};

	// const fetchData = useCallback(async () => {
	// 	onLoading();

	// 	try {
	// 		const result = await fetch(API.paidMovies, {
	// 			method: 'GET',
	// 			headers: {
	// 				Authorization: tokenNumber,
	// 			},
	// 		});

	// 		if (result.status >= 400 && result.status <= 599) {
	// 			throw new Error('failed to load');
	// 		} else {
	// 			let response = await result.json();

	// 			onSuccess(response);
	// 		}
	// 	} catch (error) {
	// 		onFailure();
	// 	}
	// }, [onLoading, onSuccess, onFailure, tokenNumber]);

	useEffect(() => {
		getMovies('all');
	}, [getMovies]);

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
							onHandleClick={() => onHandleClick(id)}
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

const enhance = compose(
	connect(
		(state) => ({
			favorites: content.selectors.getFavorites(state),
			token: auth.selectors.getToken(state),
			loadingState: content.selectors.getMoviesLoading(state),
			errorState: content.selectors.getMoviesError(state),
			movies: content.selectors.getMovies(state),
		}),
		(dispatch) =>
			bindActionCreators(
				{
					onHandleClick: content.actions.onHandleClick,

					logOut: auth.actions.logOut,
					onLoading: content.actions.onLoading,

					onSuccess: content.actions.onSuccess,

					onFailure: content.actions.onFailure,
					getMovies: content.actions.getMovies,
				},
				dispatch
			)
	)
);

export default enhance(MyPage);
