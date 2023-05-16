import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import updateUser from "./update-user";

// This component represents the profile view of a user
export function ProfileView({ movies, onUpdatedUserInfo }) {

    // Retrieve the stored user from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Set the user state using the stored user
    const [user, setUser] = useState(storedUser);

    // Filter the movies to create a list of favorite movies
    const favoriteMovieList = movies.filter((movie) => {
        // Filter movies here
        return movie.isFavorite === true;
    });

    // Handle the form submit event
    const handleSubmit = (e) => {
        // Handle submit here
    };

    // Remove a favorite movie from the list
    const removeFav = (id) => {
        // Remove favorite movie here
    };

    // Handle the update event
    const handleUpdate = (e) => {
        // Handle update here
    };

    return (
        <div>
            {/* Display user information */}
            <UserInfo name={user.Username} email={user.Email} />

            {/* Display favorite movies */}
            <FavoriteMovies favoriteMovieList={favoriteMovieList} />

            {/* Display the update user form */}
            <updateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
        </div>
    );
}

