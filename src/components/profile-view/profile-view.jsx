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

    const favoriteMovieList = movies.filter((movie) =>
        user?.FavoriteMovies.includes(movie.id)
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = {
            ...user,
            Username: username,
            Password: password,
            Email: email,
        };

        if (typeof onUpdatedUserInfo === "function") {
            onUpdatedUserInfo(updatedUser);
        }
    };

    const removeFav = (id) => {
        // Handle removing favorite movie here
    };

    const handleUpdate = (userObj) => {
        // Handle update logic
    };

    return (
        <div>
            <UserInfo username={username} email={email} />

            <div>
                <h2>Favorite Movies</h2>
                {favoriteMovieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            <UpdateUser
                user={user}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}