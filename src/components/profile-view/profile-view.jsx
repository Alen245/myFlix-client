import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import { MovieCard } from "../movie-card/movie-card";

export function ProfileView({ movies, onUpdatedUserInfo }) {
    // Retrieve the stored user from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Define state variables using the useState hook
    const [user, setUser] = useState(storedUser);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Update the username, password, and email when the user state changes
        if (user) {
            setUsername(user.Username);
            setPassword(user.Password);
            setEmail(user.Email);
        }
    }, [user]);

    // Filter the movies array to get the user's favorite movie list
    const favoriteMovieList = movies.filter((movie) => {
        return user?.FavoriteMovies.includes(movie._id);
    });

    // Handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create an updatedUser object with the updated user information
        const updatedUser = {
            ...user,
            Username: username,
            Password: password,
            Email: email,
        };

        // Invoke the onUpdatedUserInfo function if it is provided
        if (typeof onUpdatedUserInfo === "function") {
            onUpdatedUserInfo(updatedUser);
        }
    };

    // Handle removing a favorite movie from the user's list
    const removeFav = (id) => {
        // Handle removing favorite movie here
    };

    // Handle updating the user's information
    const handleUpdate = (userObj) => {
        // Retrieve the stored token from local storage
        const storedToken = localStorage.getItem("token");

        // Set the necessary headers for the PUT request
        const myHeaders = {
            "Content-Type": "application/JSON",
            Authorization: `Bearer ${storedToken}`,
        };

        // Send a PUT request to update the user's information in the database
        fetch(`https://moviepi24.herokuapp.com/users/${userObj.Username}`, {
            method: "PUT",
            headers: new Headers(myHeaders),
            body: JSON.stringify(userObj),
        })
            .then((res) => res.json())
            .then((response) => {
                // Store the updated user object in local storage
                localStorage.setItem("user", JSON.stringify(response));
                // Update the user state with the response from the server
                setUser(response);
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });
    };

    return (
        <div>
            {/* Render the UserInfo component and pass username and email as props */}
            <UserInfo username={username} email={email} />

            {/* Render the FavoriteMovies component and pass favoriteMovieList and removeFav as props */}
            <FavoriteMovies
                favoriteMovieList={favoriteMovieList}
                onRemoveFavorite={removeFav}
            />

            {/* Render the UpdateUser component and pass user, handleSubmit, and handleUpdate as props */}
            <UpdateUser
                user={user}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}
