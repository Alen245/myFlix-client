import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51noXi7M%2BFL._AC_.jpg",
      director: "Frank Darabont",
      genre: "Drama"
    },
    {
      id: 2,
      title: "The Godfather",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
      director: "Francis Ford Coppola",
      genre: "Drama"
    },
    {
      id: 3,
      title: "The Dark Knight",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51kK9C2QsoL._AC_.jpg",
      director: "Christopher Nolan",
      genre: "Action"
    },
    {
      id: 4,
      title: "Pulp Fiction",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51CtRjKqsUL._AC_.jpg",
      director: "Quentin Tarantino",
      genre: "Crime"
    },
    {
      id: 5,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81WjGytzRgL._AC_SL1500_.jpg",
      director: "Peter Jackson",
      genre: "Fantasy"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
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
    </div>
  );
};
