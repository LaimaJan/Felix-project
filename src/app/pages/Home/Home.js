import { useEffect, useContext } from 'react';
import { ContentContext } from '../../context/ContentContext';
import { Link } from 'react-router-dom';

import './App.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

function Home() {
	// const [freeFilms, setFreeFilms] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);

	const { handleClick, favorites, getMovies, error, loading, movies } =
		useContext(ContentContext);

	console.log('filmai', movies);
	// console.log('eroras', error);

	// const fetchData = useCallback(async () => {
	// 	setLoading(false);

	// 	try {
	// 		const result = await fetch(
	// 			'https://dummy-video-api.onrender.com/content/free-items'
	// 		);
	// 		console.log(result);

	// 		if (result.status >= 400 && result.status <= 599) {
	// 			throw new Error('failed to load');
	// 		} else {
	// 			const json = await result.json();
	// 			setFreeFilms(json);
	// 		}
	// 	} catch (error) {
	// 		setError(true);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }, []);

	useEffect(() => {
		getMovies('free');
	}, []);

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
					{loading && <img src={logo} className="App-logo" alt="logo" />}
					{error && <p>Whoops! Failed to Load!</p>}

					{movies.map(({ title, id, image, description }) => (
						<MovieCard
							id={id}
							key={id}
							title={title}
							description={description}
							image={image}
							isFavorite={favorites.includes(id)}
							onHandleClick={() => handleClick(id)}
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
