import React from 'react';
// import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
// import MovieCard from '../../components/MovieCard';
// import { FaRegPlayCircle } from 'react-icons/fa';

import './SingleMovie.css';

export default class SingleMovie extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	const retrieveToken = localStorage.getItem('token') || '';

	// 	this.state = {
	// 		username: '',
	// 		password: '',
	// 		hidePassword: true,
	// 		token: retrieveToken,
	// 		formValid: false,
	// 		failureMessage: false,
	// 	};
	// 	console.log('Tokenas this.state');
	// 	console.log(this.state.token);
	// }

	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	try {
	// 		const tokenNumber = localStorage.getItem('token');
	// 		console.log('TOKENAS MYPAGE: ' + tokenNumber);

	// 		const result = await fetch(
	// 			'https://dummy-video-api.onrender.com/content/items/:itemId',
	// 			{
	// 				method: 'GET',
	// 				headers: {
	// 					Authorization: tokenNumber,
	// 				},
	// 			}
	// 		);

	// 		if (result.status >= 400 && result.status <= 599) {
	// 			this.setState({ error: true });
	// 		} else {
	// 			let response = await result.json();
	// 			console.log('RESPONSAS');
	// 			console.log(response);

	// 			this.setState({ allFilms: response });
	// 		}
	// 	} catch (error) {
	// 		this.setState({ error: true });
	// 	} finally {
	// 		this.setState({ loading: false });
	// 	}
	// }

	render() {
		// const { loading, error, allFilms, favorites } = this.state;
		return (
			<div className="singleMovie-wrapper">
				<Header>
					<Button>
						<Link to="/">Logout</Link>
					</Button>
				</Header>
				<main>
					{/* {loading && <img src={logo} className="App-logo" alt="logo" />}
						{error && <p>Whoops! Failed to Load! 🙊</p>} */}
					<div className="movie-card">
						<div className="movie-card-image-holder">
							<img
								className="movie-card-image"
								src="https://kbbookreviews867789450.files.wordpress.com/2021/01/17927395._sy475_.jpg"
								alt="booktok"
							></img>
						</div>

						<div className="movie-card-content">
							<div className="movie-summary">
								<p className="film-title">Spider-Man: Far from Home</p>
								<p className="film-summary ">
									Peter Parker and his friends go on a summer trip to Europe.
									However, they will hardly be able to rest - Peter will have to
									agree to help Nick Fury uncover the mystery of creatures that
									cause natural disasters and destruction throughout the
									continent.
								</p>
							</div>
							<div className="movie-card-btn">
								<Button>Watch</Button>
								<Button>Favorite</Button>
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}
