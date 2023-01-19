import { useEffect, useContext } from 'react';
import { ContentContext } from '../../context/ContentContext';
// import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import './MyPage.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

function MyPage() {
	const navigate = useNavigate();
	// const [allFilms, setAllFilms] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);

	const { handleClick, favorites, getMovies, error, loading, movies } =
		useContext(ContentContext);
	// const { token } = useContext(AuthContext);
	// const tokenNumber = token;

	const singleMovieClicked = (id) => {
		console.log('Pries function: ' + id);

		navigate(`/singleMovie/${id}`);
	};

	const logOut = () => {
		localStorage.removeItem('token');
	};

	// const fetchData = useCallback(async () => {
	// 	setLoading(false);

	// 	try {
	// 		const result = await fetch(
	// 			'https://dummy-video-api.onrender.com/content/items',
	// 			{
	// 				method: 'GET',
	// 				headers: {
	// 					Authorization: tokenNumber,
	// 				},
	// 			}
	// 		);

	// 		if (result.status >= 400 && result.status <= 599) {
	// 			setError(true);
	// 		} else {
	// 			let response = await result.json();

	// 			setAllFilms(response);
	// 		}
	// 	} catch (error) {
	// 		setError(true);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }, [tokenNumber]);

	useEffect(() => {
		getMovies('all');
	}, []);

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

					{movies.map(({ title, id, image, description }) => (
						<MovieCard
							id={id}
							key={id}
							title={title}
							description={description}
							image={image}
							isFavorite={favorites.includes(id)}
							onHandleClick={() => handleClick(id)}
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
