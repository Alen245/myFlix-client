export function ProfileView({ movies, onUpdatedUserInfo }) {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState(storedUser);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user.Username);
            setPassword(user.Password);
            setEmail(user.Email);
        }
    }, [user]);

    const favoriteMovieList = movies.filter((movie) => {
        return user?.FavoriteMovies.includes(movie.id);
    });

    const handleSubmit = () => {
        updateUser(username, password, email);
    };

    const removeFavoriteMovie = (id) => {
        const updatedUser = { ...user };
        const favoriteMovies = updatedUser.FavoriteMovies.filter(
            (movieId) => movieId !== id
        );
        updatedUser.FavoriteMovies = favoriteMovies;
        setUser(updatedUser);
    };

    const handleUpdate = (event) => {
        const { name, value } = event.target;
        if (name === "Username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        }
    };

    const updateUser = (username, password, email) => {
        const updatedUser = {
            ...user,
            Username: username,
            Password: password,
            Email: email
        };
        setUser(updatedUser);
        onUpdatedUserInfo(updatedUser);
    };

    return (
        <div>
            <UserInfo username={username} email={email} />
            <FavoriteMovies
                favoriteMovieList={favoriteMovieList}
                removeFav={removeFavoriteMovie}
            />
            <UpdateUser
                user={user}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
                updateUser={updateUser}
            />
        </div>
    );
}
