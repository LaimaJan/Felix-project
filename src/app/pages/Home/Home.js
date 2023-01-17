import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import './App.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';
import content from '../../../content';

function Home({
	favorites,
	onHandleClick,
	onLoading,
	onSuccess,
	onFailure,
	getMovies,
	movies,
	loadingState,
	errorState,
}) {
	// console.log('movies is HOME PAGE' + movies);

	useEffect(() => {
		// fetchData();
		getMovies('free');
	}, [getMovies]);

	return (
		<div className="App">
			<Header className="header">
				<Button>
					<Link to="/signIn">Sign in</Link>
				</Button>
			</Header>

			<Hero className="hero">
				<Button>
					<Link to="/createUser">Get Access</Link>
				</Button>
			</Hero>

			<main>
				<div className="main-content">
					{loadingState && <img src={logo} className="App-logo" alt="logo" />}
					{errorState && <p>Whoops! Failed to Load!</p>}

					{movies.map(({ title, id, image, description }) => (
						<MovieCard
							id={id}
							key={id}
							title={title}
							description={description}
							image={image}
							isFavorite={favorites.includes(id)}
							onHandleClick={() => onHandleClick(id)}
						/>
					))}
				</div>
				<div className="main-content-btn">
					<Button>
						<Link to="/createUser">Get More Content </Link>
					</Button>
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
			loading: content.selectors.getMoviesLoading(state),
			error: content.selectors.getMoviesError(state),
			movies: content.selectors.getMovies(state),
		}),

		(dispatch) =>
			bindActionCreators(
				{
					onHandleClick: content.actions.onHandleClick,
					// onLoading: content.actions.onLoading,
					// onSuccess: content.actions.onSuccess,
					// onFailure: content.actions.onFailure,
					getMovies: content.actions.getMovies,
				},
				dispatch
			)
	)
);

export default enhance(Home);
