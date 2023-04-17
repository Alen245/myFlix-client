import { useState } from "react";

// a component that takes a callback function called onLoggedIn as a prop
export const LoginView = ({ onLoggedIn }) => {

  // set initial state of username and password using useState hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // define a function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent form from reloading the page

    // construct the login data object
    const data = {
      access: username,
      secret: password
    };

    // send a POST request to the login API with the data object
    fetch("https://openlibrary.org/account/login.json", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((response) => response.json()) // parse the response as JSON
      .then((data) => {
        if (data.user) { // if the login was successful
          onLoggedIn(data.user, data.token); // call the onLoggedIn function with user and token data
        } else {
          alert("No such user"); // show an alert if login failed
        }
      })
      .catch((e) => {
        alert("Something went wrong"); // show an alert if an error occurred
      });
  };

  // render a form with input fields for username and password, and a submit button
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
