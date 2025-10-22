const apikey = "af9ffcf517dfdc93387c7d6d98ed06bc";
const image = "https://image.tmdb.org/t/p/w500";

const nowplaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
const action = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=28&sort_by=popularity.desc`;
const comedy = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=35&sort_by=popularity.desc`;
const romance = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=10749&sort_by=popularity.desc`;

function createMovieCard(movie) {
  let card = document.createElement("div");
  card.className = "movie-card";
  let poster = movie.poster_path
    ? image + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";
  let rating = movie.vote_average.toFixed(1);
  card.innerHTML = `<div class="bookmark-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="gold" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"/></svg></div><img src="${poster}" alt="${movie.title}"><p class="movie-title">${movie.title}</p><div class="rating">Rating: ${rating} <svg width="16" height="16" viewBox="0 0 24 24" fill="gold" style="vertical-align: middle;" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/></svg></div><button>More info</button>`;
  return card;
}

function createContinueWatchingCard(movie) {
  let card = document.createElement("div");
  card.className = "movie-card";
  let poster = movie.poster_path
    ? image + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";
  let rating = movie.vote_average.toFixed(1);
  card.innerHTML = `<div class="bookmark-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="gold" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"/></svg></div><img src="${poster}" alt="${movie.title}"><p class="movie-title">${movie.title}</p><div class="time-left">15m left</div><div class="rating">Rating: ${rating} <svg width="16" height="16" viewBox="0 0 24 24" fill="gold" style="vertical-align: middle;" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/></svg></div><button>More info</button>`;
  return card;
}

function createNewReleaseCard(movie) {
  return createMovieCard(movie);
}

function renderMoviesInSection(movies, sectionClass) {
  let container = document.querySelector(`.${sectionClass} .movie-grid`);
  if (!container) return;
  container.innerHTML = "";
  movies.slice(0, 15).forEach((m) => {
    container.appendChild(createMovieCard(m));
  });
}

function renderContinueWatching(movies) {
  let container = document.querySelector(".continue-watching .movie-grid");
  if (!container) return;
  container.innerHTML = "";
  movies
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .forEach((m) => {
      container.appendChild(createContinueWatchingCard(m));
    });
}

function renderNewReleases(movies) {
  let container = document.querySelector(".new-releases .movie-grid");
  if (!container) return;
  container.innerHTML = "";
  movies.slice(0, 8).forEach((m) => {
    container.appendChild(createNewReleaseCard(m));
  });
}

function fetchMoviesForCategory(url, sectionClass) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderMoviesInSection(data.results, sectionClass);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(nowplaying)
    .then((res) => res.json())
    .then((data) => {
      renderNewReleases(data.results);
    });

  fetch(popular)
    .then((res) => res.json())
    .then((data) => {
      renderContinueWatching(data.results);
    });

  fetchMoviesForCategory(popular, "top-movies");
  fetchMoviesForCategory(action, "action-movies");
  fetchMoviesForCategory(comedy, "comedy-movies");
  fetchMoviesForCategory(romance, "romance-movies");
});
