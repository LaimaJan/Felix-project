import { useState, useCallback, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';

import { API } from '../../../constants';
import { connect } from 'react-redux';

import './SingleMovie.css';

function SingleMovie({ favorites, onHandleClick }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [singleMovie, setSingleMovie] = useState([]);

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
			const result = await fetch(`${API.paidMovies}/${id}`, {
				method: 'GET',
				headers: {
					Authorization: tokenNumber,
				},
			});
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
						onHandleClick={() => onHandleClick(id, favorites.includes(id))}
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

function mapStateToProps(state) {
	return {
		favorites: state.content.favorites || [],
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
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
