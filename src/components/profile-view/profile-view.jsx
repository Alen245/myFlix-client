import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import { MovieCard } from "../movie-card/movie-card";

export function ProfileView({ movies, onUpdatedUserInfo }) {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState(storedUser);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user.Username);
            setPassword(user.Password);
            setEmail(user.Email);
        }
    }, [user]);

    const favoriteMovieList = movies.filter((movie) => {
        // Filter movies here
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle submit logic
    };

    const removeFav = (id) => {
        // Remove favorite movie here
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        // Handle update logic
    };

    return (
        <div>
            <UserInfo username={username} email={email} />
            <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            <UpdateUser
                username={username}
                password={password}
                email={email}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}
