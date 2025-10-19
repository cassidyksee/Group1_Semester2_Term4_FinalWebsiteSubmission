
class Movie { 
    constructor(poster_path, title, vote_average, release_date) { 
        this.poster_path = poster_path; 
        this.title = title; 
        this.vote_average = vote_average; 
        this.release_date = release_date;
    } 
}

!async function() {
    const API_KEY = 'af9ffcf517dfdc93387c7d6d98ed06bc';
   const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;


    const header = document.getElementById("movie-header");

    let data = await fetch(API_URL)
        .then(response => response.json())
        .catch(error => console.log(error));

    if (!data || !data.results) {
        console.error("No data from API");
        return;
    }

//    movie card
    if (data.results.length > 10) {
        const posterPath = data.results[0].backdrop_path;
        const imageUrl = "https://image.tmdb.org/t/p/original" + posterPath;
        header.style.backgroundImage = `url(${imageUrl})`;
        header.style.backgroundSize = "cover";
        header.style.backgroundPosition = "center";
    }

    const movieList = [];
    for (let i = 0; i < data.results.length; i++) {
        let poster_path = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
        let title = data.results[i].title;
        let vote_average = data.results[i].vote_average;
        let release_date = data.results[i].release_date;  

        movieList.push(new Movie(poster_path, title, vote_average, release_date));
    }

    const movieCardsContainer = document.getElementById("movie-cards");
    movieCardsContainer.innerHTML = "";


const now = new Date();
const twelveMonthsAgo = new Date();
twelveMonthsAgo.setFullYear(now.getFullYear() - 1);

const filteredMovies = movieList.filter(movie => {
  const releaseDate = new Date(movie.release_date);
  return releaseDate >= twelveMonthsAgo && releaseDate <= now;
});

    filteredMovies.forEach(movie => {
        movieCardsContainer.innerHTML += `
           <div class="col-6 col-md-3 col-lg-2 mb-4">
                <div class="card h-100">
                  <i class="fa-solid fa-bookmark bookmark-icon"></i>
                    <img src="${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title movieTitle">${movie.title}</h5>
                        <p class="card-text">Rating: ${movie.vote_average} ⭐</p>
                        <div class="card-button-position">
                        </div>
                        <div center>
                             <a href="#" class="btn btn-primary mt-auto card-button">More Info</a>
                        </div>
                       
                    </div>
                </div>
            </div>
        `;
    });

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

// most pop movies
const POPULAR_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

let popularData = await fetch(POPULAR_API_URL)
    .then(response => response.json())
    .catch(error => console.log(error));

if (popularData && popularData.results) {
    const popularList = [];
    for (let i = 0; i < popularData.results.length; i++) {
        let poster_path = `https://image.tmdb.org/t/p/w500${popularData.results[i].poster_path}`;
        let title = popularData.results[i].title;
        let vote_average = popularData.results[i].vote_average;
        let release_date = popularData.results[i].release_date;

        popularList.push(new Movie(poster_path, title, vote_average, release_date));
    }

    const popularCardsContainer = document.getElementById("popular-movie-cards");
    popularCardsContainer.innerHTML = "";

 popularList
  .filter(movie => movie.vote_average > 7) 
  .forEach(movie => {
      popularCardsContainer.innerHTML += `
         <div class="col-6 col-md-3 col-lg-2 mb-4">
              <div class="card h-100">
                <i class="fa-solid fa-bookmark bookmark-icon"></i>
                  <img src="${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                  <div class="card-body d-flex flex-column">
                      <h5 class="card-title movieTitle">${movie.title}</h5>
                      <p class="card-text">Rating: ${movie.vote_average} ⭐</p>
                      <div class="card-button-position"></div>
                      <div center>
                           <a href="#" class="btn btn-primary mt-auto card-button">More Info</a>
                      </div>
                  </div>
              </div>
          </div>
      `;
  });

}


}();

// scroll to correct section
document.querySelector(".movieLibraryBtn").addEventListener("click", () => {
  document.querySelector(".most-popular-section").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".newReleasesBtn").addEventListener("click", () => {
  document.querySelector(".new-releases-section").scrollIntoView({ behavior: "smooth" });
});







const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 

  const searchTerm = searchInput.value.toLowerCase().trim();

  const allCards = document.querySelectorAll("#movie-cards .card, #popular-movie-cards .card");

  allCards.forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const col = card.closest(".col-6, .col-md-3, .col-lg-2");

    if (title.includes(searchTerm) || searchTerm === "") {
      col.style.display = ""; 
    } else {
      col.style.display = "none"; 
    }
  });
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const allCards = document.querySelectorAll("#movie-cards .card, #popular-movie-cards .card");

  allCards.forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const col = card.closest(".col-6, .col-md-3, .col-lg-2");

    col.style.display = title.includes(searchTerm) || searchTerm === "" ? "" : "none";
  });
});



