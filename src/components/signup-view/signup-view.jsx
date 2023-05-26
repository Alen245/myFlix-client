import { useState } from "react"; // Import useState hook from React
import { Form, Button } from "react-bootstrap"; // Import Form and Button components from react-bootstrap library

export const SignupView = () => {
  const [username, setUsername] = useState(""); // Initialize username state
  const [password, setPassword] = useState(""); // Initialize password state
  const [email, setEmail] = useState(""); // Initialize email state
  const [birthday, setBirthday] = useState(""); // Initialize birthday state

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    // Send a POST request to the server with user signup data
    fetch("https://moviepi24.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful"); // Display success message
        window.location.reload(); // Reload the page
      } else {
        alert("Signup failed"); // Display failure message
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Username input field */}
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update the username state on input change
          required
          minLength="3"
        />
      </Form.Group>

      {/* Email input field */}
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update the email state on input change
          required
        />
      </Form.Group>

      {/* Password input field */}
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update the password state on input change
          required
        />
      </Form.Group>

      {/* Date of Birth input field */}
      <Form.Group controlId="formDateOfBirth">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)} // Update the birthday state on input change
          required
        />
      </Form.Group>

      {/* Submit button */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
