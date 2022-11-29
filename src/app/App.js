import React from 'react';
import 'reset-css';
import './App.css';
import logo from './images/logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Button from './components/Button';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			freeFilms: [],
			loading: false,
			error: false,
			favorites: [],
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id) {
		console.log(id);
		let index = this.state.favorites.indexOf(id);
		if (index === -1) {
			this.setState((prevState) => ({
				favorites: [...prevState.favorites, id],
			}));
			console.log(this.state.favorites);
		} else {
			this.setState((prevState) => ({
				favorites: prevState.favorites.filter(function (e) {
					console.log('Mano E' + e);
					return e !== id;
				}),
			}));
		}
	}

	async componentDidMount() {
		this.setState({ loading: true });
		try {
			const result = await fetch(
				'https://academy-video-api.herokuapp.com/content/free-items'
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
				<Header className="header" />

				<Hero className="hero" />

				<main>
					<div className="main-content">
						{loading && <img src={logo} className="App-logo" alt="logo" />}
						{error && <p>Whoops! Failed to Load! 🙊</p>}

						{freeFilms.map(({ title, id, image, description }) => (
							<div className="film-card" key={id}>
								<div className="film-card-image-holder">
									<img className="film-card-image" src={image} alt=""></img>
								</div>
								<div className="film-card-bottom-content">
									<div className="film-card-text-container">
										<p className="film-title">{title}</p>
										<p className="film-summary">{description}</p>
									</div>

									<div className="film-btn-container">
										<Button
											id={id}
											className={
												favorites.includes(id)
													? 'film-card-btn removeBtn'
													: 'film-card-btn favoriteBtn'
											}
											onClick={() => this.handleClick(id)}
											placeholder={
												favorites.includes(id) ? 'Remove 💔' : 'Favorite'
											}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="main-content-btn">
						<Button
							className="more-content-btn"
							placeholder="Get More Content"
						/>
					</div>
				</main>

				<Footer />
			</div>
		);
	}
}

export default App;
