const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-conatiner');
const inputBox = document.getElementById('movie-name');

async function getMovies(movies) {
    const key = '9ff521f3';
    const url = `https://www.omdbapi.com/?apikey=${key}&t=${movies}`; // Changed to HTTPS

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch movie data.');

        const movieName = await response.json();

        if (movieName.Response === 'False') {
            alert('Movie not found! Please try again.');
        } else {
            displayMovies(movieName);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    }
}

function displayMovies(movieName) {
    const { Title, Genre, Actors, imdbRating, Runtime, Released, Language, Poster } = movieName;

    // Clear the container before appending new content
    movieContainer.innerHTML = '';

    // Create the main movie elements
    const movieElements = document.createElement('div');
    movieElements.classList.add('movie-info');
    movieElements.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Actors:</strong> ${Actors}</p>
        <p><strong>IMDb Rating:</strong> ${imdbRating}</p>
        <p><strong>Runtime:</strong> ${Runtime}</p>
        <p><strong>Released:</strong> ${Released}</p>
        <p><strong>Language:</strong> ${Language}</p>
        <img src="${Poster}" alt="${Title}" class="movie-poster">
    `;

    // Create the genre elements
    const genreElements = document.createElement('div');
    genreElements.classList.add('movie-genre');
    Genre.split(',').forEach((genre) => {
        const p = document.createElement('p');
        p.innerText = genre.trim();
        genreElements.appendChild(p);
    });

    // Append the genre elements to the movie container
    movieElements.appendChild(genreElements);
    movieContainer.appendChild(movieElements);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movies = inputBox.value.trim();
    if (movies === '') {
        alert('Please Enter Movie Name!');
    } else {
        getMovies(movies);
    }
});
