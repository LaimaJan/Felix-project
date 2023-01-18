import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { compose, bindActionCreators } from 'redux';

import './MyPage.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

import auth from '../../../auth';
import content from '../../../content';

function MyPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const singleMovieClicked = (id) => {
		navigate(`/singleMovie/${id}`);
	};

	const favorites = useSelector(content.selectors.getFavorites);
	const token = useSelector(auth.selectors.getToken);
	const loadingState = useSelector(content.selectors.getMoviesLoading);
	const errorState = useSelector(content.selectors.getMoviesError);
	const movies = useSelector(content.selectors.getMovies);

	useEffect(() => {
		dispatch(content.actions.getMovies('all'));
	}, [dispatch]);

	return (
		<div className="App">
			<Header className="header">
				<Link to="/">
					<Button onClick={() => dispatch(auth.actions.logOut(token))}>
						Logout
					</Button>
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
							onHandleClick={() => dispatch(content.actions.onHandleClick(id))}
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

export default MyPage;
