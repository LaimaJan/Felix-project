import React from 'react';
import 'reset-css';
import './App.css';
import logo from './images/logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
// import FavoriteBtn from './components/Favorite-btn';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			freeFilms: [],
			loading: false,
			error: false,
			favoriteBtn: false,
			favorites: [],
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		const id = event.currentTarget.id;
		console.log(id);
		let index = this.state.favorites.indexOf(id);
		if (index === -1) {
			this.setState((prevState) => ({
				favorites: [...prevState.favorites, id],
			}));
			console.log(this.state);
		} else {
			console.log('pirma mygtuka spaudziant neveikia, sekantys veikia');
			console.log(this.state.favorites.splice(index, 1));
			// if (index !== -1) {
			// 	array.splice(index, 1);
			// }
			this.setState((prevState) => ({
				favorites: prevState.favorites.filter(function (e) {
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
		const { loading, error, freeFilms } = this.state;

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
								<img className="film-card-image" src={image} alt=""></img>
								<div className="film-card-bottom-content">
									<p className="film-title">{title}</p>
									<p className="film-summary">
										{description.substring(0, 55)}...
									</p>

									<div className="film-btn-container">
										<button
											id={id}
											className="film-card-btn btn"
											onClick={this.handleClick}
										>
											{this.state.favorites.indexOf(id) > 0
												? 'Remove 💔'
												: 'Favorite'}
											{/* {favorite ? 'Remove 💔' : 'Favorite'} */}
										</button>
									</div>
									{/* <FavoriteBtn /> */}
								</div>
							</div>
						))}
					</div>
					<div className="main-content-btn">
						<button className="more-content-btn btn">Get More Content</button>
					</div>
				</main>

				<Footer />
			</div>
		);
	}
}

export default App;
