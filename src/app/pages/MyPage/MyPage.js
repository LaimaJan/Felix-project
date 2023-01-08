import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { API } from '../../../constants';
import { connect } from 'react-redux';

import './MyPage.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

function MyPage({ favorites, onHandleClick, token, logOut }) {
	const navigate = useNavigate();
	const [allFilms, setAllFilms] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const tokenNumber = token;

	const singleMovieClicked = (id) => {
		console.log('Pries function: ' + id);

		navigate(`/singleMovie/${id}`);
	};

	// const logOut = () => {
	// 	localStorage.removeItem('token');
	// };

	const fetchData = useCallback(async () => {
		setLoading(false);

		try {
			const result = await fetch(API.paidMovies, {
				method: 'GET',
				headers: {
					Authorization: tokenNumber,
				},
			});

			if (result.status >= 400 && result.status <= 599) {
				setError(true);
			} else {
				let response = await result.json();
				console.log('response fetch in MYPAGE.js: ' + response);

				setAllFilms(response);
			}
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [tokenNumber]);

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
					{loading && <img src={logo} className="App-logo" alt="logo" />}
					{error && <p>Whoops! Failed to Load! 🙊</p>}

					{allFilms.map(({ title, id, image, description }) => (
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
				console.log('DElete MyPage.js');
				dispatch({ type: 'DELETE_TOKEN', token });
			}
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
