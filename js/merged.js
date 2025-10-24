/*AMELIE'S SCRIPT */

(function () {
  class AmelieMovie {
    constructor(image, title, year, rating, link) {
      this.image = image;
      this.title = title;
      this.year = year;
      this.rating = rating;
      this.link = link;
    }
  }

  (async function () {
    const API_KEY = 'af9ffcf517dfdc93387c7d6d98ed06bc';
    const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!data || !data.results) {
        console.error("No results found for Amelie’s script");
        return;
      }

      const movieList = [];

      for (let i = 0; i < 3 && i < data.results.length; i++) {
        const movieData = data.results[i];
        const image = movieData.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";
        const title = movieData.title || "Untitled";
        const year = movieData.release_date ? movieData.release_date.split("-")[0] : "Unknown";
        const rating = movieData.vote_average ?? "N/A";
        const link = `https://www.themoviedb.org/movie/${movieData.id}`;

        const movie = new AmelieMovie(image, title, year, rating, link);
        movieList.push(movie);

        // Safe DOM updates
        const posterEl = document.getElementById(`poster-${i + 1}`);
        const titleEl = document.getElementById(`title-${i + 1}`);

        if (posterEl) posterEl.src = image;
        if (titleEl) titleEl.textContent = `${title} (${year})`;
      }

      console.log("Amelie Movie Objects Created:", movieList);
    } catch (error) {
      console.error("Error in Amelie’s script:", error);
    }
  })();
})();


/*CASSIDY'S SCRIPT*/

(function () {
  class CassidyMovie {
    constructor(poster_path, title, vote_average, release_date) {
      this.poster_path = poster_path;
      this.title = title;
      this.vote_average = vote_average;
      this.release_date = release_date;
    }
  }

  (async function () {
    const API_KEY = 'af9ffcf517dfdc93387c7d6d98ed06bc';
    const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

    try {
      const header = document.getElementById("movie-header");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!data || !data.results) {
        console.error("No data from Cassidy’s API call");
        return;
      }

      if (data.results.length > 0 && header) {
        const posterPath = data.results[0].backdrop_path;
        if (posterPath) {
          const imageUrl = "https://image.tmdb.org/t/p/original" + posterPath;
          header.style.backgroundImage = `url(${imageUrl})`;
          header.style.backgroundSize = "cover";
          header.style.backgroundPosition = "center";
        }
      }

      const movieList = data.results.map(movie => {
        const poster_path = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";
        return new CassidyMovie(poster_path, movie.title, movie.vote_average, movie.release_date);
      });

      const movieCardsContainer = document.getElementById("movie-cards");
      if (movieCardsContainer) movieCardsContainer.innerHTML = "";

      const now = new Date();
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setFullYear(now.getFullYear() - 1);

      const filteredMovies = movieList.filter(movie => {
        if (!movie.release_date) return false;
        const releaseDate = new Date(movie.release_date);
        return releaseDate >= twelveMonthsAgo && releaseDate <= now;
      });

      if (movieCardsContainer) {
        filteredMovies.forEach(movie => {
          movieCardsContainer.innerHTML += `
            <div class="col-12 col-md-3 col-lg-2 mb-4">
              <div class="card h-100">
               <a href="individual movie page.html"> <i class="fa-solid fa-bookmark bookmark-icon" ></i></a>
                <img src="${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title movieTitle">${movie.title}</h5>
                  <p class="card-text">Rating: ${movie.vote_average} ⭐</p>
                  <div class="card-button-position"></div>
                <div class="card-button-container mt-auto">
 <a href="individual movie page.html" class="btn card-button">More Info</a>

</div>

                </div>
              </div>
            </div>
          `;
        });
      }

      
      const movieTitles = document.querySelectorAll(".movieTitle");
      movieTitles.forEach(title => {
        const length = title.textContent.length;
        if (length > 30 && length <= 45) {
          title.style.fontSize = "0.85rem";
        } else if (length > 45) {
          title.style.fontSize = "0.75rem";
        } else {
          title.style.fontSize = "1rem";
        }
      });

      
      const POPULAR_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
      const popularResponse = await fetch(POPULAR_API_URL);
      const popularData = await popularResponse.json();

      if (popularData && popularData.results) {
        const popularList = popularData.results.map(movie => {
          const poster_path = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";
          return new CassidyMovie(poster_path, movie.title, movie.vote_average, movie.release_date);
        });

        const popularCardsContainer = document.getElementById("popular-movie-cards");
        if (popularCardsContainer) popularCardsContainer.innerHTML = "";

        popularList
          .filter(movie => movie.vote_average > 7)
          .forEach(movie => {
            if (popularCardsContainer) {
              popularCardsContainer.innerHTML += `
                <div class="col-12 col-md-3 col-lg-2 mb-4">
                  <div class="card h-100">
                    <i class="fa-solid fa-bookmark bookmark-icon"></i>
                    <img src="${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title movieTitle">${movie.title}</h5>
                      <p class="card-text">Rating: ${movie.vote_average} ⭐</p>
                      <div class="card-button-position"></div>
                       <div class="card-button-container mt-auto">
                        <a href="#" class="btn card-button">More Info</a>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }
          });
      }

      
      const movieLibraryBtn = document.querySelector(".movieLibraryBtn");
      const newReleasesBtn = document.querySelector(".newReleasesBtn");

      if (movieLibraryBtn) {
        movieLibraryBtn.addEventListener("click", () => {
          const section = document.querySelector(".most-popular-section");
          if (section) section.scrollIntoView({ behavior: "smooth" });
        });
      }

      if (newReleasesBtn) {
        newReleasesBtn.addEventListener("click", () => {
          const section = document.querySelector(".new-releases-section");
          if (section) section.scrollIntoView({ behavior: "smooth" });
        });
      }

      
      const searchForm = document.getElementById("searchForm");
      const searchInput = document.getElementById("searchInput");

      if (searchForm && searchInput) {
        const filterCards = () => {
          const searchTerm = searchInput.value.toLowerCase().trim();
          const allCards = document.querySelectorAll("#movie-cards .card, #popular-movie-cards .card");

          allCards.forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            const col = card.closest(".col-6, .col-md-3, .col-lg-2");
            if (col) {
              col.style.display = title.includes(searchTerm) || searchTerm === "" ? "" : "none";
            }
          });
        };

        searchForm.addEventListener("submit", e => {
          e.preventDefault();
          filterCards();
        });

        searchInput.addEventListener("input", filterCards);
      }

    } catch (error) {
      console.error("Error in Cassidy’s script:", error);
    }
  })();
})();


/*DAVID'S SCRIPT*/

(function () {
  const apikey = "af9ffcf517dfdc93387c7d6d98ed06bc";
  const imageBase = "https://image.tmdb.org/t/p/w500";

  const nowplaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
  const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
  const action = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=28&sort_by=popularity.desc`;
  const comedy = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=35&sort_by=popularity.desc`;
  const romance = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=10749&sort_by=popularity.desc`;

  function createMovieCard(movie) {
    const poster = movie.poster_path ? imageBase + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image";
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <div class="bookmark-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="gold"><path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"/></svg></div>
      <img src="${poster}" alt="${movie.title}">
      <p class="movie-title">${movie.title}</p>
      <div class="rating">Rating: ${rating} ⭐</div>
      <button class="card-button">More info</button>`
      ;
    return card;
  }

  function renderMoviesInSection(movies, sectionClass) {
    const container = document.querySelector(`.${sectionClass} .movie-grid`);
    if (!container) return;
    container.innerHTML = "";
    movies.slice(0, 15).forEach(m => container.appendChild(createMovieCard(m)));
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetch(nowplaying)
      .then(res => res.json())
      .then(data => renderMoviesInSection(data.results, "new-releases"))
      .catch(err => console.error("Error fetching now playing:", err));

    fetch(popular)
      .then(res => res.json())
      .then(data => renderMoviesInSection(data.results, "continue-watching"))
      .catch(err => console.error("Error fetching popular movies:", err));

    fetch(popular).then(res => res.json()).then(data => renderMoviesInSection(data.results, "top-movies"));
    fetch(action).then(res => res.json()).then(data => renderMoviesInSection(data.results, "action-movies"));
    fetch(comedy).then(res => res.json()).then(data => renderMoviesInSection(data.results, "comedy-movies"));
    fetch(romance).then(res => res.json()).then(data => renderMoviesInSection(data.results, "romance-movies"));
  });
})();


/*JORDAN'S SCRIPT*/

(function () {
  const API_KEY = 'af9ffcf517dfdc93387c7d6d98ed06bc';
  const movieId = '299534';

  class JordanMovie {
    constructor(title, overview, director, poster_path, actors, trailer) {
      this.title = title;
      this.director = director;
      this.poster_path = poster_path;
      this.overview = overview;
      this.actors = actors;
      this.trailer = trailer;
    }
  }

  async function getMovieDetails() {
  try {
    const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const movieData = await movieResponse.json();

    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
    const creditsData = await creditsResponse.json();

    const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
    const videoData = await videoResponse.json();

    
    const director = creditsData.crew.find(person => person.job === "Director");
    const topActors = creditsData.cast.slice(0, 5).map(actor => actor.name);
    const directorName = director ? director.name : "Unknown";
    const posterUrl = movieData.poster_path? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`: "https://via.placeholder.com/500x750?text=No+Image";
    const trailer = videoData.results.find(video => video.site === "YouTube" && video.type === "Trailer");

   
    const titleEl = document.getElementById('movie-title');
    const overviewEl = document.getElementById('movie-overview');
    const directorEl = document.getElementById('movie-director');
    const actorsEl = document.getElementById('movie-actors');
    const posterEl = document.getElementById('movie-poster');
    const iframeEl = document.getElementById("movie-trailer");

    
    if (titleEl) titleEl.textContent = movieData.title;
    if (overviewEl) overviewEl.textContent = movieData.overview;
    if (directorEl) directorEl.textContent = directorName;
    if (actorsEl) actorsEl.textContent = topActors.join(", ");
    if (posterEl) posterEl.src = posterUrl;

    
    if (trailer && iframeEl) {
      iframeEl.src = `https://www.youtube.com/embed/${trailer.key}`;
      iframeEl.style.display = "block"; 
    } else if (iframeEl) {
      iframeEl.src = "";
      iframeEl.style.display = "none"; 
    }

  } catch (error) {
    console.error("Error, no trailer found", error);
  }
}


  getMovieDetails();

  $(document).ready(function () {
    $("#showLogin").click(function () {
      $("#signupSection").fadeOut(200, function () {
        $("#loginSection").fadeIn(200);
      });
    });

    $("#showSignup").click(function () {
      $("#loginSection").fadeOut(200, function () {
        $("#signupSection").fadeIn(200);
      });
    });

    // $(".youtube-link").grtyoutube();
  });
})();
