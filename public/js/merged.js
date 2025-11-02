/*AMELIE'S SCRIPT */

(function () {
  class AmelieMovie {
    constructor(image, title, year, rating, link, id) {
      this.image = image;
      this.title = title;
      this.year = year;
      this.rating = rating;
      this.link = link;
      this.id = id;
    }
  }

  (async function () {
    const API_KEY = "af9ffcf517dfdc93387c7d6d98ed06bc";
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const container = document.getElementById("favourites-container");

   
    container.innerHTML = "";


    favourites.forEach((movieData) => {
      const image = movieData.poster_path
        ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
      const title = movieData.title || "Untitled";
      const year = movieData.release_date
        ? movieData.release_date.split("-")[0]
        : "Unknown";
      const rating = movieData.vote_average ?? "N/A";
      const link = `https://www.themoviedb.org/movie/${movieData.id}`;
      const id = movieData.id;

      const movie = new AmelieMovie(image, title, year, rating, link, id);

    
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
    card.innerHTML = 
  `<img src="${movie.image}" class="card-img-top movie-poster" alt="${movie.title}">
   <div class="card-body text-center">
     <p class="card-text movie-title">${movie.title} (${movie.year})</p>
     <button class="details-btn" data-id="${movie.id}">More Info</button>
     <button class="remove-btn" data-id="${movie.id}">Remove</button>

   </div>`;

   card.querySelector(".details-btn").addEventListener("click", (e) => {
  e.stopPropagation(); 
  
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  
  window.location.href = "individual movie page.html";
});

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("card-button")) {
          e.preventDefault();

          const movieData = JSON.parse(e.target.getAttribute("data-movie"));

          if (!movieData.id && e.target.closest(".card")) {
            const card = e.target.closest(".card");
            const title = card.querySelector(".movieTitle")?.textContent.trim();
            movieData.title = title || movieData.title;
          }

          console.log("Movie being saved:", movieData);
          localStorage.setItem("selectedMovie", JSON.stringify(movieData));

          window.location.href = "individual movie page.html";
        }
      });

   
      card.querySelector(".remove-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const updated = favourites.filter((fav) => fav.id !== movie.id);
        localStorage.setItem("favourites", JSON.stringify(updated));
        card.remove();
      });

      container.appendChild(card);
    });

    if (favourites.length === 0) {
      container.innerHTML = `<p style="color:white; text-align:center;">No favourites added yet!</p>`;
    }
  })();
})();

/*CASSIDY'S SCRIPT*/

(function () {
  class CassidyMovie {
    constructor(id, poster_path, title, vote_average, release_date) {
      this.id = id;
      this.poster_path = poster_path;
      this.title = title;
      this.vote_average = vote_average;
      this.release_date = release_date;
    }
  }

  (async function () {
    const API_KEY = "af9ffcf517dfdc93387c7d6d98ed06bc";
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

      const movieList = data.results.map((movie) => {
        const poster_path = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";
        return new CassidyMovie(
          movie.id,
          poster_path,
          movie.title,
          movie.vote_average,
          movie.release_date
        );
      });

      const movieCardsContainer = document.getElementById("movie-cards");
      if (movieCardsContainer) movieCardsContainer.innerHTML = "";

      const now = new Date();
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setFullYear(now.getFullYear() - 1);

      const filteredMovies = movieList.filter((movie) => {
        if (!movie.release_date) return false;
        const releaseDate = new Date(movie.release_date);
        return releaseDate >= twelveMonthsAgo && releaseDate <= now;
      });

      if (movieCardsContainer) {
        filteredMovies.forEach((movie) => {
          const movieData = {
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
          };

          movieCardsContainer.innerHTML += `
      <div class="col-12 col-md-3 col-lg-2 mb-4">
        <div class="card h-100">
          <i class="fa-solid fa-bookmark bookmark-icon" style="cursor:pointer;" data-movie='${JSON.stringify(
            movie
          )}'></i>

          <img src="${movie.poster_path}" class="card-img-top" alt="${
            movie.title
          }">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title movieTitle">${movie.title}</h5>
            <p class="card-text">Rating: ${movie.vote_average} ⭐</p>
            <div class="card-button-position"></div>
            <div class="card-button-container mt-auto">
            <a href="individual movie page.html" class="btn card-button" data-movie='${JSON.stringify(
              movie
            )}'>More Info</a>
            </div>
          </div>
        </div>
      </div>
    `;
        });

        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("bookmark-icon")) {
            const movieData = JSON.parse(e.target.getAttribute("data-movie"));

            let favourites =
              JSON.parse(localStorage.getItem("favourites")) || [];
            const exists = favourites.some(
              (fav) => fav.title === movieData.title
            );

            if (!exists) {
              favourites.push(movieData);
              localStorage.setItem("favourites", JSON.stringify(favourites));
              alert(`${movieData.title} added to favourites!`);
            } else {
              alert(`${movieData.title} is already in favourites.`);
            }

            window.location.href = "favourites page.html";
          }
        });
      }

      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("card-button")) {
          e.preventDefault();

          const movieData = JSON.parse(e.target.getAttribute("data-movie"));

          if (!movieData.id && e.target.closest(".card")) {
            const card = e.target.closest(".card");
            const title = card.querySelector(".movieTitle")?.textContent.trim();
            movieData.title = title || movieData.title;
          }

          console.log("Movie being saved:", movieData);
          localStorage.setItem("selectedMovie", JSON.stringify(movieData));

          window.location.href = "individual movie page.html";
        }
      });

      const movieTitles = document.querySelectorAll(".movieTitle");
      movieTitles.forEach((title) => {
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
        const popularList = popularData.results.map((movie) => {
          const poster_path = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";
          return new CassidyMovie(
            movie.id,
            poster_path,
            movie.title,
            movie.vote_average,
            movie.release_date
          );
        });

        const popularCardsContainer = document.getElementById(
          "popular-movie-cards"
        );
        if (popularCardsContainer) popularCardsContainer.innerHTML = "";

        popularList
          .filter((movie) => movie.vote_average > 7)
          .forEach((movie) => {
            if (popularCardsContainer) {
              popularCardsContainer.innerHTML += `
                <div class="col-12 col-md-3 col-lg-2 mb-4">
                  <div class="card h-100">
                    <i class="fa-solid fa-bookmark bookmark-icon"></i>
                    <img src="${movie.poster_path}" class="card-img-top" alt="${
                movie.title
              }">
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title movieTitle">${movie.title}</h5>
                      <p class="card-text">Rating: ${movie.vote_average} ⭐</p>
                      <div class="card-button-position"></div>
                       <div class="card-button-container mt-auto">
                     <a href="individual movie page.html" class="btn card-button" data-movie='${JSON.stringify(
                       movie
                     )}'>More Info</a>
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
          const allCards = document.querySelectorAll(
            "#movie-cards .card, #popular-movie-cards .card"
          );

          allCards.forEach((card) => {
            const title = card
              .querySelector(".card-title")
              .textContent.toLowerCase();
            const col = card.closest(".col-6, .col-md-3, .col-lg-2");
            if (col) {
              col.style.display =
                title.includes(searchTerm) || searchTerm === "" ? "" : "none";
            }
          });
        };

        searchForm.addEventListener("submit", (e) => {
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
    const poster = movie.poster_path
      ? imageBase + movie.poster_path
      : "https://via.placeholder.com/500x750?text=No+Image";
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    const movieData = {
      id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    };

    return `
      <div class="col-12 col-md-3 col-lg-2 mb-4">
        <div class="card h-100">
          <i class="fa-solid fa-bookmark bookmark-icon" style="cursor:pointer;" data-movie='${JSON.stringify(
            movieData
          )}'></i>

          <img src="${poster}" class="card-img-top" alt="${movie.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title movieTitle">${movie.title}</h5>
            <p class="card-text">Rating: ${rating} ⭐</p>
            <div class="card-button-position"></div>
            <div class="card-button-container mt-auto">
            <a href="individual movie page.html" class="btn card-button" data-movie='${JSON.stringify(
              movieData
            )}'>More Info</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderMoviesInSection(movies, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    movies.slice(0, 15).forEach((m) => {
      container.innerHTML += createMovieCard(m);
    });

    const movieTitles = container.querySelectorAll(".movieTitle");
    movieTitles.forEach((title) => {
      const length = title.textContent.length;
      if (length > 30 && length <= 45) {
        title.style.fontSize = "0.85rem";
      } else if (length > 45) {
        title.style.fontSize = "0.75rem";
      } else {
        title.style.fontSize = "1rem";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetch(nowplaying)
      .then((res) => res.json())
      .then((data) => renderMoviesInSection(data.results, "new-releases-grid"))
      .catch((err) => console.error("Error fetching now playing:", err));

    fetch(popular)
      .then((res) => res.json())
      .then((data) =>
        renderMoviesInSection(data.results, "continue-watching-grid")
      )
      .catch((err) => console.error("Error fetching popular movies:", err));

    fetch(popular)
      .then((res) => res.json())
      .then((data) => renderMoviesInSection(data.results, "top-movies-grid"));
    fetch(action)
      .then((res) => res.json())
      .then((data) =>
        renderMoviesInSection(data.results, "action-movies-grid")
      );
    fetch(comedy)
      .then((res) => res.json())
      .then((data) =>
        renderMoviesInSection(data.results, "comedy-movies-grid")
      );
    fetch(romance)
      .then((res) => res.json())
      .then((data) =>
        renderMoviesInSection(data.results, "romance-movies-grid")
      );

    const searchForm = document.getElementById("searchFormLibrary");
    const searchInput = document.getElementById("searchInputLibrary");

    if (searchForm && searchInput) {
      const filterCards = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const allCards = document.querySelectorAll(
          ".new-releases .card, .continue-watching .card, .top-movies .card, .action-movies .card, .comedy-movies .card, .romance-movies .card"
        );

        allCards.forEach((card) => {
          const title = card
            .querySelector(".card-title")
            .textContent.toLowerCase();
          const col = card.closest(".col-12");
          if (col) {
            col.style.display =
              title.includes(searchTerm) || searchTerm === "" ? "" : "none";
          }
        });
      };

      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        filterCards();
      });

      searchInput.addEventListener("input", filterCards);
    }

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("bookmark-icon")) {
        const movieData = JSON.parse(e.target.getAttribute("data-movie"));

        let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
        const exists = favourites.some((fav) => fav.title === movieData.title);

        if (!exists) {
          favourites.push(movieData);
          localStorage.setItem("favourites", JSON.stringify(favourites));
          alert(`${movieData.title} added to favourites!`);
        } else {
          alert(`${movieData.title} is already in favourites.`);
        }

        window.location.href = "favourites page.html";
      }

      if (e.target.classList.contains("card-button")) {
        e.preventDefault();
        const movieData = JSON.parse(e.target.getAttribute("data-movie"));
        localStorage.setItem("selectedMovie", JSON.stringify(movieData));
        window.location.href = "individual movie page.html";
      }
    });
  });
})();

/*JORDAN'S SCRIPT*/

(function () {
  const API_KEY = "af9ffcf517dfdc93387c7d6d98ed06bc";
  const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  const movieId = selectedMovie ? selectedMovie.id : "550";

  if (selectedMovie) {
    const titleEl = document.getElementById("movie-title");
    const posterEl = document.getElementById("movie-poster");
    if (titleEl) titleEl.textContent = selectedMovie.title;
    if (posterEl)
      posterEl.src = `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`;
  }

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
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      const movieData = await movieResponse.json();

      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
      );
      const creditsData = await creditsResponse.json();

      const videoResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const videoData = await videoResponse.json();

      const director = creditsData.crew.find(
        (person) => person.job === "Director"
      );
      const topActors = creditsData.cast.slice(0, 5).map((actor) => actor.name);
      const directorName = director ? director.name : "Unknown";
      const posterUrl = movieData.poster_path
        ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
      const trailer = videoData.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );

      const titleEl = document.getElementById("movie-title");
      const overviewEl = document.getElementById("movie-overview");
      const directorEl = document.getElementById("movie-director");
      const actorsEl = document.getElementById("movie-actors");
      const posterEl = document.getElementById("movie-poster");
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
