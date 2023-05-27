import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'

export const MovieView = ({ movies }) => {
  const { id } = useParams();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const myHeaders = {
    "Content-Type": "application/JSON",
    Authorization: `Bearer ${storedToken}`,
  };

  const isFaveMovie = () => {
    const favMovies = storedUser.FavoriteMovies
    // implement this
  }

  const addToFavorites = () => {
    fetch(`https://moviepi24.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`, {
      method: "POST",
      headers: new Headers(myHeaders),
    })
      .then((res) => res.json())
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));

      });
  };
  return (
    <div>
      <div>{movie.image && <img className="w-100" src={movie.image} />}</div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <Button onClick={addToFavorites}>Add to favorites</Button>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

//if movie is in in favorites render removeFromFave btn else render add to favorites

// removeBtn <Button onClick={removeFromFavorites}>Remove from favorites</Button>