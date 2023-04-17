import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  // state variables using useState hook
  const [movies, setMovies] = useState([]); // array of movies
  const [selectedMovie, setSelectedMovie] = useState(null); // selected movie object
  const [user, setUser] = useState(null); // user object
  const [token, setToken] = useState(null); // JWT token

  // if user is not logged in, show the LoginView component
  if (!user) {
    return (
      <LoginView
        // callback function for when user logs in
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  // useEffect hook to fetch movie data from API when component mounts
  useEffect(() => {
    fetch("https://moviepi24.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        // map data received from API to an array of objects with desired properties
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImagePath,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            actors: movie.Actors,
          };
        });
        // set the movies state to the new array of movie objects
        setMovies(moviesFromApi);
      });
  }, []);

  // useEffect hook to fetch movie data with authentication when token changes
  useEffect(() => {
    // if token is not set, return from hook
    if (!token) {
      return;
    }
    // fetch movie data with Authorization header using the token
    fetch("https://moviepi24.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        // log the data received from API to console
        console.log(data);
      });
  }, [token]);

  // if user is not logged in, show the LoginView component
  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }

  // if selectedMovie is set, show the MovieView component for the selected movie
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  // if the movies array is empty, show a message
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // render the movie cards for each movie object in the movies array
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      {/* button to logout and reset user and token states */}
      <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
    </div>
  );
};
