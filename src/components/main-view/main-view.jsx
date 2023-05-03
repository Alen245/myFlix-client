import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  // Check for a stored user and token in localStorage and set the state accordingly
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // State for movies and the currently selected movie
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // useEffect hook allows React to perform side effects in component e.g fetching data
  useEffect(() => {
    // If there is no token, return early
    if (!token) {
      return;
    }

    // Fetch movies from the API using the token for authorization
    fetch("https://moviepi24.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        // Convert the API response to the desired format and set the movies state
        const moviesFromApi = data.map((movie) => {
          return {
            // value names match to API database
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            release: movie.Release
          }
        });
        setMovies(moviesFromApi);
      })
  }, [token])

  // If the user is not logged in, display the login and signup forms
  if (!user) {
    return (
      <Row>
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />
        </Col>
      </Row>
    )
  }

  // If a movie is selected, display the movie view
  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <button onClick={() => {
          setUser(null); setToken(null); localStorage.clear();
        }}
        > Logout
        </button>
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView style={{ border: "1px solid green" }} movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      </Row>
    );
  }

  // If there are no movies, display a message
  if (movies.length === 0) {
    return (
      <Row>
        <button onClick={() => {
          setUser(null); setToken(null); localStorage.clear();
        }}
        > Logout
        </button>
        <div>The list is empty!</div>
      </Row>
    );
  }

  // If no movie is selected, display a list of MOVIE CARDS
  return (
    <Row>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>

      {movies.map((movie) => (
        <Col className="mb-5" key={movie.id} md={3}>
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        </Col>
      ))}
    </Row>

  );
}
