import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Signup from './Modal/signup';
import Login from './Modal/login';
import { useNavigate } from 'react-router-dom';

function BasicExample() {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate('/')

    }
    return (
        <>
            <Navbar expand="lg" className="bg-dark text-light">
                <Container >
                    <Navbar.Brand href="#home" className="fw-bold text-light" >Notes-App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user ? (
                                <Button variant='light' onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={() => setShowSignup(true)} className='me-2' variant='light' >Signup</Button>

                                    <Button onClick={() => setShowLogin(true)} variant='light'>Login</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >

            <Signup
                show={showSignup}
                handleClose={() => setShowSignup(false)}
            />

            <Login
                show={showLogin}
                handleClose={() => setShowLogin(false)}

                onLogin={(loggedUser) => setUser(loggedUser)}
            />

        </>
    );
}

export default BasicExample;