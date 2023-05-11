import React from 'react'

export default function userInfo({ email, name }) {
    return (
        <>
            <p> User: {name}</p>
            <p> Email: {email} </p>
        </>

    )
}

