import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

import content from '../../../content';

function Home() {
	const dispatch = useDispatch();
	const favorites = useSelector(content.selectors.getFavorites);
	const movies = useSelector(content.selectors.getMovies);
	const loadingState = useSelector(content.selectors.getMoviesLoading);
	const errorState = useSelector(content.selectors.getMoviesError);

	useEffect(() => {
		dispatch(content.actions.getMovies('free'));
	}, [dispatch]);

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
							onHandleClick={() => dispatch(content.actions.onHandleClick(id))}
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

export default Home;
