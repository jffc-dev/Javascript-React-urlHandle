import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" fixed='top'>
            <Container>
                <Navbar.Brand as={Link} to="/">ManejoCadenas</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Mantenimiento" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/mantenimiento/creacion/masiva">Creación masiva</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/mantenimiento/random/db">Random - DB</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/mantenimiento/random/manual">Random - Manual</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#features">Features</Nav.Link>
                    </Nav>
                    <Nav>
                        {/* <ToggleDarkModeComponent></ToggleDarkModeComponent> */}
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;