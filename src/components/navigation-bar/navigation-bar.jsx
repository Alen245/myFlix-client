import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
    // Function to handle logout
    const handleLogout = () => {
        onLoggedOut();
    };

    // Function to handle search
    const handleSearch = (event) => {
        const query = event.target.value;
        onSearch(query);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* Brand/logo of the application */}
                <Navbar.Brand as={Link} to="/">
                    Movies App
                </Navbar.Brand>
                {/* Toggle button for mobile navigation */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* If user is not logged in, show login and signup links */}
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {/* If user is logged in, show home, profile, and logout links */}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {/* If user is logged in, show search form */}
                    {user && (
                        <Form className="d-flex">
                            {/* Search input field */}
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                onChange={handleSearch}
                            />
                            {/* Search button */}
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
