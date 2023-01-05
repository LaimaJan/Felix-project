import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../../constants';
import { connect } from 'react-redux';

import './App.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

function Home({
	favorites,
	onHandleClick,
	pageLoading,
	pageLoadingError,
	loadingState,
	errorState,
}) {
	const [freeFilms, setFreeFilms] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);

	const fetchData = useCallback(async () => {
		pageLoading(false);

		try {
			const result = await fetch(API.freeMovies);
			console.log(result);

			if (result.status >= 400 && result.status <= 599) {
				console.log('KAZKAS');
				throw new Error('failed to load');
			} else {
				const json = await result.json();
				setFreeFilms(json);
			}
		} catch (error) {
			pageLoadingError(true);

			// console.log('LABAS DIENAS');
			// pageLoading(false);
		} finally {
			pageLoading(false);
		}
	}, [pageLoading, pageLoadingError]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

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

					{freeFilms.map(({ title, id, image, description }) => (
						<MovieCard
							id={id}
							key={id}
							title={title}
							description={description}
							image={image}
							isFavorite={favorites.includes(id)}
							onHandleClick={() => onHandleClick(id, favorites.includes(id))}
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

function mapStateToProps(state) {
	console.log(state.content.favorites);
	return {
		favorites: state.content.favorites || [],
		loadingState: state.loading.loading || [],
		errorState: state.loading.error || [],
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
			if (loading) {
				dispatch({ type: 'LOADING_MESSAGE', loading });
			}
		},
		pageLoadingError: (error) => {
			if (error) {
				dispatch({ type: 'ERROR_MESSAGE', error });
			}
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
