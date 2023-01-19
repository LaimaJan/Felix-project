import React, { useState, useCallback, useEffect } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import logo from '../../images/logo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';

import './SingleMovie.css';

function SingleMovie() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [singleMovie, setSingleMovie] = useState([]);

	const { handleClick } = React.useContext(FavoritesContext);
	const { favorites } = React.useContext(FavoritesContext);

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

	const fetchData = useCallback(async (id) => {
		setLoading(false);

		try {
			const tokenNumber = localStorage.getItem('token');
			const result = await fetch(
				`https://dummy-video-api.onrender.com/content/items/${id}`,
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
				// console.log(response);
				setSingleMovie(response);
			}
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		// console.log(id);
		fetchData(id);
	}, [id, fetchData]);

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
						id={singleMovie.id}
						key={singleMovie.id}
						title={singleMovie.title}
						description={singleMovie.description}
						image={singleMovie.image}
						onHandleClick={() => handleClick(singleMovie.id)}
						isFavorite={favorites.includes(singleMovie.id)}
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
					src={singleMovie.video}
					frameBorder="0"
					allowFullScreen
				/>
			</div>
		</div>
	);
}

export default SingleMovie;
