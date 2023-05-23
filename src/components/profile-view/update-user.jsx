import React from 'react';

export default function UpdateUser({ user, handleSubmit, handleUpdate }) {
    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <h2>Want to change some info?</h2>
            <label>Username:</label>
            <input
                type="text"
                name="Username"
                defaultValue={user?.Username}
                onChange={handleUpdate}
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                defaultValue={user?.Password}
                onChange={handleUpdate}
            />
            <label>Email address:</label>
            <input
                type="email"
                name="email"
                defaultValue={user?.Email}
                onChange={handleUpdate}
            />
            <button variant="primary" type="submit">
                Update
            </button>
        </form>
    );
}
