import React, { useState } from 'react';

// Import necessary dependencies

export default function UpdateUser({ user, handleUpdate }) {
    // Declare UpdateUser component as default export, taking props: user and handleUpdate

    // Initialize state variables using useState hook
    const [username, setUsername] = useState(user.Username); // State for username with initial value from user prop
    const [password, setPassword] = useState(""); // State for password with initial empty string
    const [email, setEmail] = useState(user.Email); // State for email with initial value from user prop

    const handleClick = () => {
        // Define handleClick function triggered on button click

        if (!username || !password || !email) {
            // Check if any of the fields are empty
            console.log("do something");

            return; // Exit the function if any field is empty
        }

        const userObj = {
            Email: email,
            Password: password,
            Username: username,
        };

        handleUpdate(userObj); // Call handleUpdate function with the userObj parameter
    };

    return (
        <div className="profile-form">
            {/* Render the profile form */}
            <h2>Want to change some info?</h2>
            {/* Heading */}
            <label>Username:</label>
            {/* Label for the username input */}
            <input
                type="text"
                name="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {/* Input field for username with value bound to the username state and onChange event to update the state */}

            <label>Password:</label>
            {/* Label for the password input */}
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {/* Input field for password with value bound to the password state and onChange event to update the state */}

            <label>Email:</label>
            {/* Label for the email input */}
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {/* Input field for email with value bound to the email state and onChange event to update the state */}

            <button variant="primary" onClick={handleClick}>
                Update
            </button>
            {/* Button triggering the handleClick function on click */}
        </div>
    );
}



// import React from 'react';

// export default function UpdateUser({ user, handleSubmit, handleUpdate }) {
//     return (
//         <form className="profile-form" onSubmit={handleSubmit}>
//             <h2>Want to change some info?</h2>
//             <label>Username:</label>
//             <input
//                 type="text"
//                 name="Username"
//                 defaultValue={user?.Username}
//                 onChange={handleUpdate}
//             />
//             <label>Password:</label>
//             <input
//                 type="password"
//                 name="password"
//                 defaultValue={user?.Password}
//                 onChange={handleUpdate}
//             />
//             <label>Email address:</label>
//             <input
//                 type="email"
//                 name="email"
//                 defaultValue={user?.Email}
//                 onChange={handleUpdate}
//             />
//             <button variant="primary" type="submit">
//                 Update
//             </button>
//         </form>
//     );
// }