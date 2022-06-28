import { render } from '@testing-library/react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavbarComponent() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" fixed='top'>
            <Container>
                <Navbar.Brand href="/">ManejoCadenas</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Mantenimiento" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/mantenimiento/creacion/masiva">Creación masiva</NavDropdown.Item>
                            <NavDropdown.Item href="/mantenimiento/random/db">Random - DB</NavDropdown.Item>
                            <NavDropdown.Item href="/mantenimiento/random/manual">Random - Manual</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#features">Features</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

render(<Navbar></Navbar>)

export default NavbarComponent;