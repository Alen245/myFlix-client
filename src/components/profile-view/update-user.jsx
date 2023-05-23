import React from 'react';

export default function UpdateUser({ user, handleSubmit, handleUpdate }) {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
        updateUser(user.Username, user.Password, user.Email); // Call the updateUser function with the updated values from the user state
    };


    return (
        <form className="profile-form" onSubmit={handleFormSubmit}>
            <h2>Want to change some info?</h2>
            <label>Username:</label>
            <input
                type="text"
                name="Username"
                defaultValue={user?.Username} // Update the prop name to "Username"
                onChange={handleUpdate}
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                defaultValue={user?.Password} // Update the prop name to "Password"
                onChange={handleUpdate}
            />
            <label>Email address:</label>
            <input
                type="email"
                name="email"
                defaultValue={user?.Email} // Update the prop name to "Email"
                onChange={handleUpdate}
            />
            <button variant="primary" type="submit">
                Update
            </button>
        </form>
    );
}
