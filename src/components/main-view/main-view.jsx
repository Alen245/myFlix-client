import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  // state variables using useState hook
  const [movies, setMovies] = useState([]); // array of movies
  const [selectedMovie, setSelectedMovie] = useState(null); // selected movie object
  const [user, setUser] = useState(null); // user object
  const [token, setToken] = useState(null); // JWT token

  // useEffect(() => {
  //   // Fetch movies from API using the token
  //   console.log("text")
  //   fetch("https://moviepi24.herokuapp.com/movies", {
  //     mode: "no-cors",
  //     headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }
  //   })
  //     .then((response) => {
  //       console.log({ response })
  //       return response.json()
  //     })
  //     .then((data) => {
  //       console.log({ data })
  //       const temp = data ? data : {}
  //       const moviesFromApi = temp.map((movie) => ({
  //         genre: movie.Genre.Name,
  //         director: movie.Director.Name,
  //         actors: movie.Actors,
  //         id: movie._id,
  //         title: movie.Title,
  //         description: movie.Description,
  //         image: movie.ImagePath,
  //         featured: movie.Featured
  //       }));
  //       setMovies(moviesFromApi);
  //     })

  // }, [token]);
  useEffect(() => {
    // if (!token) return;
    if (token) fetchMovies(token)
  }, [token]);

  const fetchMovies = (t) => {

    fetch("http://moviepi24.herokuapp.com/movies", {

      headers: { Authorization: `Bearer ${t}`, 'Access-Control-Allow-Origin': '*' }
    })
      .then(resonse => resonse.json())
      .then(movies => {
        const moviesFromAPI = movies.map(movie => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            image: movie.imageUrl
          };
        });
        console.log({ movies, moviesFromAPI })
        setMovies(moviesFromAPI);
      });
  }
  if (!user) {
    // If user is not logged in, show the LoginView and SignupView components
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          console.log(user, token)
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    // If a movie is selected, show the MovieView component
    return (
      <>
        <button onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }

  if (movies.length === 0) {
    // If there are no movies in the list, show a message
    return (
      <>
        <button onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
          Logout
        </button>
        <div>The list is empty!</div>
      </>
    );
  }

  // If user is logged in and no movie is selected, show the movie list
  return (
    <div>
      <button onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}>
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
