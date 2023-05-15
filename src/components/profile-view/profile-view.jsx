import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import updateUser from "./update-user";


export function ProfileView({ movies, onUpdatedUserInfo }) {
    const [user, setUser] = useState({});

    const favoriteMovieList = movies.filter((movie) => {
        // Filter movies here
    });

    const handleSubmit = (e) => {
        // Handle submit here
    };

    const removeFav = (id) => {
        // Remove favorite movie here
    };

    const handleUpdate = (e) => {
        // Handle update here
    };



    return (
        <div>
            <UserInfo name={user.Username} email={user.Email} />
            <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            <updateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
        </div>
    );
}
