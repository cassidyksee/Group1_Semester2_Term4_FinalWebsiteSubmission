
class Movie { 
    constructor(poster_path, title, vote_average) { 
        this.poster_path = poster_path; 
        this.title = title; 
        this.vote_average = vote_average; 
    } 
}

!async function() {
    const API_KEY = 'af9ffcf517dfdc93387c7d6d98ed06bc';
    const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

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
        const posterPath = data.results[15].backdrop_path;
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

        movieList.push(new Movie(poster_path, title, vote_average));
    }

    const movieCardsContainer = document.getElementById("movie-cards");
    movieCardsContainer.innerHTML = ""; // 

    movieList.forEach(movie => {
        movieCardsContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100">
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
}();




