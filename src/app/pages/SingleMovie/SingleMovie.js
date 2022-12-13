import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { withRouter } from '../../components/useParam/UseParams';

// import MovieCard from '../../components/MovieCard';
// import { FaRegPlayCircle } from 'react-icons/fa';

import './SingleMovie.css';

class SingleMovie extends React.Component {
	constructor(props) {
		super(props);
		const retrieveToken = localStorage.getItem('token') || '';

		this.state = {
			token: retrieveToken,
			singleMovie: [],
			loading: false,
			error: false,
			favorites: [],
		};

		console.log('singleMovie this.state');
		console.log(this.state.singleMovie);
	}

	async componentDidMount() {
		this.setState({ loading: true });
		const { id } = this.props.params;
		console.log("url'o id: " + id);
		try {
			const tokenNumber = localStorage.getItem('token');
			// console.log('TOKENAS SingleMovie: ' + tokenNumber);

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
				this.setState({ error: true });
			} else {
				let response = await result.json();
				console.log('RESPONSAS');
				console.log(response);

				this.setState({ singleMovie: response });
			}
		} catch (error) {
			this.setState({ error: true });
		} finally {
			this.setState({ loading: false });
		}
	}

	render() {
		const { loading, error, singleMovie } = this.state;
		return (
			<div className="singleMovie-wrapper">
				<Header>
					<Button>
						<Link to="/">Logout</Link>
					</Button>
				</Header>
				<main>
					{loading && <img src={logo} className="App-logo" alt="logo" />}
					{error && <p>Whoops! Failed to Load! 🙊</p>}
					<div className="movie-card" id={singleMovie.id}>
						<div className="movie-card-image-holder">
							<img
								className="movie-card-image"
								src={singleMovie.image}
								alt="our-movie"
							></img>
						</div>

						<div className="movie-card-content">
							<div className="movie-summary">
								<p className="film-title">{singleMovie.title}</p>
								<p className="film-summary ">{singleMovie.description}</p>
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

export default withRouter(SingleMovie);
