import React from 'react'
export default function UserInfo({ username, email }) {
    return (
        <>
            <p>User: {username}</p>
            <p>Email: {email}</p>
        </>
    );
}
