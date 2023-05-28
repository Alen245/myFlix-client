import React, { useState, useEffect } from "react";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

// Profile view component
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
        } else {
            setUsername("");
            setPassword("");
            setEmail("");
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

    // Render the profile view components
    return (
        <div>
            {/* Render user information */}
            <UserInfo username={username} email={email} />

            {/* Render favorite movies */}
            <FavoriteMovies
                favoriteMovieList={favoriteMovieList}
                onRemoveFavorite={removeFav}
            />

            {/* Render update user form */}
            <UpdateUser
                user={user}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}