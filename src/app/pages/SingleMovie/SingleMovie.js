import { useState, useEffect, useContext } from 'react';
import { ContentContext } from '../../context/ContentContext';
import logo from '../../images/logo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';

import './SingleMovie.css';

function SingleMovie() {
	const navigate = useNavigate();
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	// const [singleMovie, setSingleMovie] = useState([]);

	const { handleClick, favorites, getMovies, error, loading, movies } =
		useContext(ContentContext);

	const logOut = () => {
		localStorage.removeItem('token');
		navigate(`/`);
	};

	const watchTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const exitTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const { id } = useParams();
	console.log('SINGLE M ID', id);
	console.log('SINGLE MOVIE INFO', movies);

	// const fetchData = useCallback(async (id) => {
	// 	setLoading(false);

	// 	try {
	// 		const tokenNumber = localStorage.getItem('token');
	// 		const result = await fetch(
	// 			`https://dummy-video-api.onrender.com/content/items/${id}`,
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
	// 			// console.log(response);
	// 			setSingleMovie(response);
	// 		}
	// 	} catch (error) {
	// 		setError(true);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }, []);

	useEffect(() => {
		// console.log(id);
		getMovies('single', id);
	}, [id]);

	return (
		<div className="content-wrapper">
			<div className="singleMovie-wrapper">
				<Header>
					<Button onClick={logOut}>Logout</Button>
				</Header>
				<main>
					{loading && <img src={logo} className="App-logo" alt="logo" />}
					{error && <p>Whoops! Failed to Load! 🙊</p>}
					<SingleMovieCard
						id={movies.id}
						key={movies.id}
						title={movies.title}
						description={movies.description}
						image={movies.image}
						onHandleClick={() => handleClick(movies.id)}
						isFavorite={favorites.includes(movies.id)}
						clickWatchTrailer={watchTrailer}
					/>
				</main>
				<Footer />
			</div>
			<div
				className={openModal ? 'show-video-modal' : 'disable-video-modal'}
				onClick={exitTrailer}
			>
				<iframe
					title="movieTrailer"
					src={movies.video}
					frameBorder="0"
					allowFullScreen
				/>
			</div>
		</div>
	);
}

export default SingleMovie;
