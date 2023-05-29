import React from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

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
                <div key={movie.id}>
                    <MovieCard movie={movie} />
                    <button
                        variant="secondary"
                        onClick={() => removeFav(movie.id)}
                    >
                        Remove From List
                    </button>
                </div>
            ))}
        </div>
    );
}
