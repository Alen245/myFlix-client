import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://moviepi24.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            release: movie.Release
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      {/* Render the NavigationBar component */}
      <NavigationBar
        user={user} // Pass the user state as a prop
        onLoggedOut={() => {
          setUser(null); // Function to set the user state to null (logout functionality)
        }}
        onSearch={(query) => setSearchQuery(query)}
      />

      {/* Create a row and center its content */}
      <Row className="justify-content-md-center">
        <Routes>
          {/* Define a route for the signup page */}
          <Route
            path="/signup"
            element={
              <>
                {/* If user is logged in, navigate to the homepage; otherwise, render the SignupView */}
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          {/* Define a route for the login page */}
          <Route
            path="/login"
            element={
              <>
                {/* If user is logged in, navigate to the homepage; otherwise, render the LoginView */}
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />

          {/* Define a route for the profile page */}
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace /> // If user is not logged in, navigate to the login page; otherwise, render the ProfileView
              ) : (
                <ProfileView movies={movies} />
              )
            }
          />

          {/* Define a route for a specific movie page */}
          <Route
            path="/movies/:id"
            element={
              <>
                {/* If user is not logged in, navigate to the login page; if movies list is empty, show a message; otherwise, render the MovieView */}
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          {/* Define a route for the homepage */}
          <Route
            path="/"
            element={
              <>
                {/* If user is not logged in, navigate to the login page; if movies list is empty, show a message; otherwise, render the MovieCard components */}
                {!user ? (
                  <Navigate to="/login" replace />
                ) : filteredMovies.length === 0 ? (
                  <Col>No movies found!</Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
};