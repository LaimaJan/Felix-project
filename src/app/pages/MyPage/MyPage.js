import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../../components/useParam/UseParams';

import './MyPage.css';
import logo from '../../images/logo.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';

class MyPage extends React.Component {
	constructor(props, { favorites }) {
		super(props);

		this.state = {
			allFilms: [],
			loading: false,
			error: false,
			favorites: [],
		};

		this.singleMovieClicked = this.singleMovieClicked.bind(this);
		console.log(props);
		console.log(favorites);
	}

	singleMovieClicked = (id) => {
		console.log('Pries function: ' + id);

		this.props.navigate(`/singleMovie/${id}`);
	};

	async componentDidMount() {
		this.setState({ loading: true });
		try {
			const tokenNumber = localStorage.getItem('token');
			// console.log('TOKENAS MYPAGE: ' + tokenNumber);

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

				this.setState({ allFilms: response });
			}
		} catch (error) {
			this.setState({ error: true });
		} finally {
			this.setState({ loading: false });
		}
	}

	render() {
		const { loading, error, allFilms } = this.state;

		return (
			<div className="App">
				<Header className="header">
					<Button>
						<Link to="/">Logout</Link>
					</Button>
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
								isFavorite={this.props.favorites.includes(id)}
								onHandleClick={() => this.props.onHandleClick(id)}
								singleMovie={() => this.singleMovieClicked(id)}
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

export default withRouter(MyPage);
