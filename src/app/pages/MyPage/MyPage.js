import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './MyPage.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

function MyPage({ favorites, onHandleClick }) {
	const navigate = useNavigate();
	const [allFilms, setAllFilms] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const singleMovieClicked = (id) => {
		console.log('Pries function: ' + id);

		navigate(`/singleMovie/${id}`);
	};

	const logOut = () => {
		localStorage.removeItem('token');
	};

	const fetchData = useCallback(async () => {
		setLoading(false);

		try {
			const tokenNumber = localStorage.getItem('token');
			// console.log('TOKENAS MYPAGE: ' + tokenNumber);

			const result = await fetch(
				'https://dummy-video-api.onrender.com/content/items',
				{
					method: 'GET',
					headers: {
						Authorization: tokenNumber,
					},
				}
			);

			if (result.status >= 400 && result.status <= 599) {
				setError(true);
			} else {
				let response = await result.json();

				setAllFilms(response);
			}
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	});

	return (
		<div className="App">
			<Header className="header">
				<Link to="/">
					<Button onClick={logOut}>Logout</Button>
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

export default MyPage;
