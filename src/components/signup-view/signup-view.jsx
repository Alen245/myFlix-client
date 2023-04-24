// Import the useState hook from the React library
import { useState } from "react";

// Export a component called SignupView
export const SignupView = () => {

// Declare state variables for username, password, email and birthday using the useState hook
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [birthday, setBirthday] = useState("");

// Define a function to handle the form submission
const handleSubmit = (event) => {// Prevent the default behavior of the form which is to reload the entire page
  event.preventDefault();
  
  // Create an object with the form data
  const data = {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  };
  
  // Send a POST request to the server with the form data as the body
  fetch("SIGNUP_URL", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
    // If the response is ok, alert the user that signup was successful and reload the page
    if (response.ok) {
      alert("Signup successful");
      window.location.reload();
    } else {
      // If the response is not ok, alert the user that signup failed
      alert("Signup failed");
    }
  });
};

// Render a form with input fields for username, password, email and birthday, and a submit button
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
<label>
Email:
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</label>
<label>
Birthday:
<input
type="date"
value={birthday}
onChange={(e) => setBirthday(e.target.value)}
required
/>
</label>
<button type="submit">Submit</button>
</form>
);
};