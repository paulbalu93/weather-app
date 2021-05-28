import React, { useState } from 'react';
import './App.css';
const api = {
	key: 'c402715948d842e0d21e8aef7648c5cc',
	base: 'https://api.openweathermap.org/data/2.5/',
};

// if (weather.weather[0].main === 'Clouds)') {
// 	maina = 'app cloudy';
// }
function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const search = (ev) => {
		if (ev.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setQuery('');
					setWeather(result);
					console.log(result);
				});
		}
	};
	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};
	const classDecider = () => {
		if (weather.weather[0].main === 'Clouds') {
			return 'app cloudy';
		} else if (weather.weather[0].main === 'Rain') {
			return 'app rainy';
		} else if (weather.main.temp > 16) {
			return 'app';
		} else if (weather.main.temp < 10) {
			return 'app winter';
		} else return 'app';
	};
	return (
		<div className={typeof weather.main != 'undefined' ? classDecider() : 'app'}>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					></input>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className="location-box">
							<div className="location">
								{' '}
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date"> {dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">{weather.main.temp}°C</div>
							<div className="weather"> {weather.weather[0].main}</div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
}

export default App;
