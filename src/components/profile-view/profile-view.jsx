import React, { useState, useEffect } from "react";
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
        return user?.FavoriteMovies.includes(movie._id);
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedUser = {
            ...user,
            Username: username,
            Password: password,
            Email: email,
        };
        // Call the onUpdatedUserInfo function to update the user information
        if (typeof onUpdatedUserInfo === "function") {
            onUpdatedUserInfo(updatedUser);
        }
    };

    const removeFav = (id) => {
        // Handle removing favorite movie here
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        switch (name) {
            case "Username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "email":
                setEmail(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <UserInfo username={username} email={email} />
            <FavoriteMovies
                favoriteMovieList={favoriteMovieList}
                onRemoveFavorite={removeFav}
            />
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
