// import React, { useState } from 'react';

// export default function UpdateUser({ user, handleUpdate }) {
//     const [username, setUsername] = useState(user.Username)
//     const [password, setPassword] = useState("")
//     const [email, setEmail] = useState(user.Email)

//     const handleClick = () => {
//         if (!username || !password || !email) {
//             console.log("do something")
//             return
//         }
//         const userObj = {
//             Email: email, Password: password, Username: username
//         }

//         handleUpdate(userObj);
//     }

//     return (
//         <div className="profile-form">
//             <h2>Want to change some info?</h2>
//             <label>Username:</label>
//             <input
//                 type="text"
//                 name="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />

//             <input
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />

//             <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />

//             <button variant="primary" onClick={handleClick}>
//                 Update
//             </button>
//         </div>
//     );
// }


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