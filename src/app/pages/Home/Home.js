import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../constants';
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
	onLoading,
	onSuccess,
	onFailure,
	movies,
	loadingState,
	errorState,
}) {
	const fetchData = useCallback(async () => {
		onLoading();

		try {
			const result = await fetch(API.freeMovies);

			if (result.status >= 400 && result.status <= 599) {
				throw new Error('failed to load');
			} else {
				const json = await result.json();
				onSuccess(json);
			}
		} catch (error) {
			onFailure();
		} finally {
			onFailure(false);
		}
	}, [onLoading, onSuccess, onFailure]);

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

					{movies.map(({ title, id, image, description }) => (
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
	return {
		favorites: state.content.favorites || [],
		loading: state.content.loading,
		error: state.content.error,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
