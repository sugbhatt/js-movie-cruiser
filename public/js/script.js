let arrMoviesList = [];
let arrFavouritesList = [];

function getMovies() {
	return fetch('http://localhost:3000/movies').then(res => {
		return res.json();
	}).then(movies => {
		const moviesList = document.getElementById('moviesList');
		let listItems = '';
		movies.forEach(movie => {
			listItems = listItems +
			`<li>
				<div class="container">
					<div class="row">
						<div class="card mt-5 d-flex flex-row">
							<img class="card-img-top" src="${movie.posterPath}" id="posterPath${movie.id}">
							<div class="card-body">
								<h5 class="card-title" id="title${movie.id}">${movie.title}</h5>
								<h6 class="card-subtitle mb-2 text-muted">Overview</h6>
<p class="card-text text-muted">Lorem ipsum dolor sit amet
consectetur adipisicing elit. Quam ipsum ipsa aliquam, perferendis odit dolore!</p>
<button onclick="addFavourite(${movie.id})" class="btn btn-primary mt-5">Add to Favourites</button>
							</div>
						</div>
					</div>
				</div>
			</li>`;
		});
		moviesList.innerHTML = listItems;
		arrMoviesList = movies;
		return arrMoviesList;
	}).catch(err => {
		return err;
	});
}

function getFavourites() {
	return fetch('http://localhost:3000/favourites').then(res => {
		return res.json();
	}).then(favourites => {
		const favouritesList = document.getElementById('favouritesList');
		let listItems = '';
		favourites.forEach(movie => {
			listItems = listItems +
			`<li>
				<div class="container">
					<div class="row">
						<div class="card mt-5 d-flex flex-row">
							<img class="card-img-top" src="${movie.posterPath}" id="favPosterPath${movie.id}">
							<div class="card-body">
								<h5 class="card-title" id="favTitle${movie.id}">${movie.title}</h5>
								<h6 class="card-subtitle mb-2 text-muted">Overview</h6>
								<p class="card-text text-muted">Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Quam ipsum ipsa aliquam, perferendis odit dolore!</p>
							</div>
						</div>
					</div>
				</div>
			</li>`;
		});
		favouritesList.innerHTML = listItems;
		arrFavouritesList = favourites;
		return arrFavouritesList;
	}).catch(err => {
		return err;
	});
}

function addFavourite(aId) {
	if(!arrFavouritesList.find(x => x.id === aId)) {
		let movie = arrMoviesList.find(x => x.id === aId);
		const favouritesList = document.getElementById('favouritesList');
		let favListHTML = favouritesList.innerHTML;
		favListHTML = favListHTML +
		`<li>
			<div class="container">
				<div class="row">
					<div class="card mt-5 d-flex flex-row">
						<img class="card-img-top" src="${movie.posterPath}" id="favPosterPath${movie.id}">
						<div class="card-body">
							<h5 class="card-title" id="favTitle${movie.id}">${movie.title}</h5>
							<h6 class="card-subtitle mb-2 text-muted">Overview</h6>
							<p class="card-text text-muted">Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Quam ipsum ipsa aliquam, perferendis odit dolore!</p>
						</div>
					</div>
				</div>
			</div>
		</li>`;
		favouritesList.innerHTML = favListHTML;
		return fetch('http://localhost:3000/favourites', {
			method: 'POST',
			body: JSON.stringify(movie),
			headers: {
				'Content-type': 'application/json'
			}
		}).then(res => {
			if(!res.ok) {
				throw Error(res.statusText);
			}
			return res.json();
		}).then(response => {
			arrFavouritesList.push(response);
			return arrFavouritesList;
		}).catch(err => {
			return err;
		});
	}
	throw Error('Movie is already added to favourites');
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


