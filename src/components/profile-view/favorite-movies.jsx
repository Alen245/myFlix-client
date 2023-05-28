import React from 'react';
import { Link } from 'react-router-dom';

export default function FavoriteMovies({ favoriteMovieList, onRemoveFavorite }) {
    const removeFav = (id) => {
        if (typeof onRemoveFavorite === "function") {
            onRemoveFavorite(id);
        }
    };

    return (
        <div>
            <h2>Favorite Movies</h2>
            {favoriteMovieList.map((movie) => (
                <div key={movie._id}>
                    <img src={movie.ImagePath} alt={movie.Title} />
                    <Link to={`/movies/${movie._id}`}>
                        <h4>{movie.Title}</h4>
                    </Link>
                    <button variant="secondary" onClick={() => removeFav(movie._id)}>
                        Remove From List
                    </button>
                </div>
            ))}
        </div>
    );
}
