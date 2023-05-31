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

    // Handle user update
    const handleUpdate = (userObj) => {
        // Retrieve the stored token from localStorage
        const storedToken = localStorage.getItem("token");

        // Define headers for the request
        const myHeaders = {
            "Content-Type": "application/JSON",
            Authorization: `Bearer ${storedToken}`,
        };

        console.log({ userObj });
        // Handle update logic

        // Perform the PUT request to update user information
        fetch(`https://moviepi24.herokuapp.com/users/${username}`, {
            method: "PUT",
            headers: new Headers(myHeaders),
            body: JSON.stringify(userObj),
        })
            .then((res) => res.json())
            .then((response) => {
                // Update the stored user information in localStorage
                localStorage.setItem("user", JSON.stringify(response));
                // Update state with the updated user information
                setUsername(response.Username);
                setPassword(response.Password);
                setEmail(response.Email);
                setUser(response);
            });
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
