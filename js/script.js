!async function() {

  const API_KEY = 'af9ffcf517dfdc93387c7d6d98ed06bc';

  // Hardcoded movie ID for testing
  const movieId = 361743; // Top Gun: Maverick

  // Fetch movie details
  const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const movieData = await movieResponse.json();

  // Fetch credits
  const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
  const creditsData = await creditsResponse.json();
  const director = creditsData.crew.find(member => member.job === "Director");
  const actors = creditsData.cast.slice(0, 5);

  // Fetch videos
  const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
  const videosData = await videosResponse.json();
  const trailer = videosData.results[0];

  // Populate movie info
  const movie = new Movie(
    movieData.title,
    movieData.popularity,
    movieData.poster_path,
    movieData.overview,
    movieData.release_date
  );

  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-popularity').textContent = movie.popularity;
  document.getElementById('movie-overview').textContent = movie.overview;
  document.getElementById('movie-release-date').textContent = movie.release_date;
  document.getElementById('movie-poster').src = movie.getPosterUrl();

  // Populate trailer
  document.querySelector('.trailer').innerHTML = `
    <iframe width="100%" height="315"
      src="https://www.youtube.com/embed/${trailer.key}" 
      title="${trailer.name}" frameborder="0" allowfullscreen>
    </iframe>
  `;

  // Populate director
  document.querySelector('.director').innerHTML = `
    <h4>${director.name}</h4>
    <img src="https://image.tmdb.org/t/p/w200${director.profile_path}" alt="${director.name}" class="img-fluid">
  `;

  // Populate actors
  document.querySelector('.actors').innerHTML = actors.map(actor => `
    <div class="actor mb-2">
      <p>${actor.name} as ${actor.character}</p>
      <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" alt="${actor.name}" class="img-fluid">
    </div>
  `).join('');

}();