const API_KEY = 'af9ffcf517dfdc93387c7d6d98ed06bc';
const movieId = '19995';

class Movie {
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
  

    const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const movieData = await movieResponse.json();

   
    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
    const creditsData = await creditsResponse.json();

    
    const director = creditsData.crew.find(person => person.job === "Director");
    const topActors = creditsData.cast.slice(0, 5).map(actor => actor.name);




// Title
document.getElementById('movie-title').textContent = movieData.title;

// Overview
document.getElementById('movie-overview').textContent = movieData.overview;

// Director and actors
const directorName = director ? director.name : "Unknown";
document.getElementById('movie-director').textContent = directorName;
document.getElementById('movie-actors').textContent = topActors;

// Poster
const posterUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
document.getElementById('movie-poster').src = posterUrl;
}



getMovieDetails();


$(document).ready(function() {

  
  $("#showLogin").click(function() {
    $("#signupSection").fadeOut(200, function() {
      $("#loginSection").fadeIn(200);
    });
  });

  
  $("#showSignup").click(function() {
    $("#loginSection").fadeOut(200, function() {
      $("#signupSection").fadeIn(200);
    });
  });

});


$(document).ready(function() {
  $(".youtube-link").grtyoutube();
});