// import the useState hook from the react library
import { token } from "morgan";
import { useState } from "react";

// define a functional component called LoginView that receives a prop called onLoggedIn
export const LoginView = ({ onLoggedIn }) => {
  // use the useState hook to define two state variables: username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // define a function to handle the form submission event
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    // create an object called data with the username and password values
    const data = {
      access: username,
      secret: password
    };

    // make a POST request to the specified URL with the data object as the request body
    fetch("https://openlibrary.org/account/login.json", {
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      // if the response is ok (status code 200-299), call the onLoggedIn prop with the username value
      if (response.ok) {
        onLoggedIn(token);
      } else {
        // otherwise, show an alert with the message "Login failed"
        alert("Login failed");
      }
    });
  };

  // return a form element with two input fields (username and password) and a submit button
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
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
