// Import the useState hook from React
import React, { useState } from "react";

// Define a LoginView component that accepts a function onLoggedIn as a prop
export const LoginView = ({ onLoggedIn }) => {
  // Use the useState hook to manage the state of the username and password input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Define a handleSubmit function that sends an HTTP POST request to the Open Library API to authenticate the user's credentials
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("https://openlibrary.org/account/login.json", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        // If the response contains a user object, set the user and token data in localStorage and call onLoggedIn with the user and token data
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          // If the response does not contain a user object, display an alert indicating that no such user exists
          alert("No such user");
        }
      })
      .catch((e) => {
        // If an error occurs, display an alert indicating that something went wrong
        alert("Something went wrong");
      });
  };

  // Render a form with input fields for the username and password, and a submit button
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
