import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			freeFilms: [],
			loading: false,
			error: false,
			favorites: [],
		};
	}

	async componentDidMount() {
		this.setState({ loading: true });
		try {
			const result = await fetch(
				'https://dummy-video-api.onrender.com/content/free-items'
			);
			console.log(result);

			if (result.status >= 400 && result.status <= 599) {
				this.setState({ error: true });
			} else {
				const json = await result.json();
				this.setState({ freeFilms: json });
			}
		} catch (error) {
			this.setState({ error: true });
		} finally {
			this.setState({ loading: false });
		}
	}

	render() {
		const { loading, error, freeFilms, favorites } = this.state;

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
						{error && <p>Whoops! Failed to Load! 🙊</p>}

						{freeFilms.map(({ title, id, image, description }) => (
							<MovieCard
								id={id}
								key={id}
								title={title}
								description={description}
								image={image}
								isFavorite={favorites.includes(id)}
								onHandleClick={() => this.props.onHandleClick(id)}
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
}

export default Home;
