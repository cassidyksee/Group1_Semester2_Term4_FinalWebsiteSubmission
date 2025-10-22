class Movie {
  constructor(image, title, year, rating, link) {
    this.image = image;
    this.title = title;
    this.year = year;
    this.rating = rating;
    this.link = link;
  }
}

(async function() {
  const API_KEY = 'af9ffcf517dfdc93387c7d6d98ed06bc';
  const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  let movieList = [];

  for (let i = 0; i < 3; i++) {
    let movieData = data.results[i];

    let image = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    let title = movieData.title;
    let year = movieData.release_date ? movieData.release_date.split("-")[0] : "Unknown";
    let rating = movieData.vote_average;
    let link = `https://www.themoviedb.org/movie/${movieData.id}`;

    let movie = new Movie(image, title, year, rating, link);
    movieList.push(movie);

    // Update the HTML
    document.getElementById(`poster-${i + 1}`).src = image;
    document.getElementById(`title-${i + 1}`).textContent = `${title} (${year})`;
  }

  console.log("Movie Objects Created:", movieList);
})();
