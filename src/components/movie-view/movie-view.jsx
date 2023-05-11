import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


export const MovieView = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div>
      <div>
        {movie.image && <img className="w-100" src={movie.image} />}
      </div>
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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

