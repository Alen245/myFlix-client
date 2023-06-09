import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  // initialize state variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // define function to handle form submission
  const handleSubmit = (event) => {
    // prevent the default behavior of the form, which is to reload the page
    event.preventDefault();

    // create an object with the username and password
    const data = {
      "Username": username,
      "Password": password,
    };

    // send a POST request to the login endpoint with the data
    fetch("https://moviepi24.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      // convert the response to JSON format
      .then((res) => res.json())
      // handle the response data
      .then((data) => {
        // log the response to the console
        console.log({ data })
        // if the response includes a user, call the onLoggedIn function with the username and token
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          return onLoggedIn(data.user, data.token);
          // return onLoggedIn(username, response.token);
        } else {
          // otherwise, display an alert that the login failed
          return alert("Login failed");
        }
      }).catch(error => { console.error(error) })
  };

  // render a form with inputs for the username and password
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};