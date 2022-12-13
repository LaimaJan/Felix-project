import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { withRouter } from '../../components/useParam/UseParams';
import SingleMovieCard from '../../components/SingleMovieCard/SingleMovieCard';

// import { FaRegPlayCircle } from 'react-icons/fa';

import './SingleMovie.css';

class SingleMovie extends React.Component {
	constructor(props) {
		super(props);
		const retrieveToken = localStorage.getItem('token') || '';
		const retrieveID = JSON.parse(localStorage.getItem('id')) || [];

		this.state = {
			token: retrieveToken,
			singleMovie: [],
			loading: false,
			error: false,
			favorites: retrieveID,
			openModal: false,
		};

		console.log('favorites this.state');
		console.log(this.state.favorites);
	}

	handleClick(id) {
		if (!this.state.favorites.includes(id)) {
			this.setState((prevState) => ({
				favorites: [...prevState.favorites, id],
			}));

			localStorage.setItem('id', JSON.stringify([...this.state.favorites, id]));
		} else {
			const filmIds = this.state.favorites.filter((movieId) => movieId !== id);
			localStorage.setItem('id', JSON.stringify(filmIds));

			this.setState({
				favorites: filmIds,
			});
		}
	}

	WatchTrailer() {
		console.log('clicked');
		const currentState = this.state.openModal;
		this.setState({ openModal: !currentState });
	}

	async componentDidMount() {
		this.setState({ loading: true });
		const { id } = this.props.params;
		// console.log("url'o id: " + id);
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
				// console.log('RESPONSAS');
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
		const { loading, error, singleMovie, favorites } = this.state;
		return (
			<div className="content-wrapper">
				<div className="singleMovie-wrapper">
					<Header>
						<Button>
							<Link to="/">Logout</Link>
						</Button>
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
							onHandleClick={() => this.handleClick(singleMovie.id)}
							isFavorite={favorites.includes(singleMovie.id)}
							clickWatchTrailer={this.WatchTrailer.bind(this)}
						/>
					</main>
					<Footer />
				</div>
				<div
					className={
						this.state.openModal ? 'show-video-modal' : 'disable-video-modal'
					}
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
}

export default withRouter(SingleMovie);
