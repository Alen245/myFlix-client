import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      image:
        "https://m.media-amazon.com/images/M/MV5BNzUzNzI0MjAxMl5BMl5BanBnXkFtZTgwMjQ2MjEyMDE@._V1_UX100_CR0,0,100,100_AL_.jpg",
      director: "Frank Darabont",
      genre: "Drama"
    },
    {
      id: 2,
      title: "The Godfather",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTIyMTIxNjI5NF5BMl5BanBnXkFtZTcwNzQzNDM5MQ@@._V1_UX100_CR0,0,100,100_AL_.jpg",
      director: "Francis Ford Coppola",
      genre: "Drama"
    },
    {
      id: 3,
      title: "The Dark Knight",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjU0ZTkyMzktOTk2Zi00ZjRiLTk3MTAtM2VjNTViN2FmM2RjXkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_UX100_CR0,0,100,100_AL_.jpg",
      director: "Christopher Nolan",
      genre: "Action"
    },
    {
      id: 4,
      title: "Pulp Fiction",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_UX100_CR0,0,100,100_AL_.jpg",
      director: "Quentin Tarantino",
      genre: "Crime"
    },
    {
      id: 5,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTU0MzY3NDM4NF5BMl5BanBnXkFtZTYwMDEyNDA5._V1_UX100_CR0,0,100,100_AL_.jpg",
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
