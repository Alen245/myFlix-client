import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import { MovieCard } from "../movie-card/movie-card";

export function ProfileView({ movies, onUpdatedUserInfo }) {
    // Retrieve stored user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Define state variables for user information
    const [user, setUser] = useState(storedUser);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // Set the username, password, and email values when the user changes
    useEffect(() => {
        if (user) {
            setUsername(user.Username);
            setPassword(user.Password);
            setEmail(user.Email);
        }
    }, [user]);

    // Filter the movies based on user's favorite movies
    const favoriteMovieList = movies.filter((movie) => {
        // Filter movies here
        return user?.FavoriteMovies.includes(movie._id);
    });

    // Handle form submission when updating user information
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create an updatedUser object with the new information
        const updatedUser = {
            ...user,
            Username: username,
            Password: password,
            Email: email,
        };

        // Call the onUpdatedUserInfo function to update the user information
        if (typeof onUpdatedUserInfo === "function") {
            // Pass the updatedUser to the callback function
            onUpdatedUserInfo(updatedUser);
        }
    };

    // Handle removing favorite movies
    const removeFav = (id) => {
        // Handle removing favorite movie here
    };

    // Handle input changes for username, password, and email fields
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

    // Render the profile view components
    return (
        <div>
            <UserInfo username={username} email={email} />
            <FavoriteMovies
                favoriteMovieList={favoriteMovieList}
                onRemoveFavorite={removeFav}
            />
            <UpdateUser
                user={user}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}
