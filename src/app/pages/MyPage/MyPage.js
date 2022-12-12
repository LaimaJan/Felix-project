import React from 'react';
import { Link } from 'react-router-dom';

import './MyPage.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

class MyPage extends React.Component {
	constructor(props) {
		super(props);
		const retrieveID = JSON.parse(localStorage.getItem('id')) || [];

		this.state = {
			allFilms: [],
			loading: false,
			error: false,
			favorites: retrieveID,
		};
		console.log(this.state.allFilms);

		this.handleClick = this.handleClick.bind(this);
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

	//  https://dummy-video-api.onrender.com/content/items
	async componentDidMount() {
		this.setState({ loading: true });
		try {
			const tokenNumber = localStorage.getItem('token');
			console.log('TOKENAS MYPAGE: ' + tokenNumber);

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
				this.setState({ error: true });
			} else {
				let response = await result.json();
				console.log('RESPONSAS');
				console.log(response);

				this.setState({ allFilms: response });
			}
		} catch (error) {
			this.setState({ error: true });
		} finally {
			this.setState({ loading: false });
		}
	}

	render() {
		const { loading, error, allFilms, favorites } = this.state;

		return (
			<div className="App">
				<Header className="header">
					<Link to="/">
						<Button>Logout</Button>
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
								onHandleClick={() => this.handleClick(id)}
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
}

export default MyPage;
