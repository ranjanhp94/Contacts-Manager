import React from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import contactImg from '../img/contact-icon-1.jpg';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            local: JSON.parse(localStorage.getItem('isLogged'))
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.local ? (<div>
                        <Link className="btn btn-primary" to="/user/register">Register</Link>
                        <Link className="btn btn-primary" to="/user/login">Login</Link>
                    </div>)
                        :
                        (<div>
                            <Navbar color="primary" expand="md">
                                <Link to="/user" style={{ textDecoration: 'none' }}><img src={contactImg} height="40px" width="40px" alt="" /></Link>
                                <NavbarBrand tag={Link} to="/user" style={{ color: "white" }}>Contact Manager</NavbarBrand>
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle style={{ color: "white" }} nav caret>
                                                Options
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>
                                                    <Link to="/contacts/new" style={{ textDecoration: 'none' }}>New Contact</Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to="/contacts" style={{ textDecoration: 'none' }}>View Contacts</Link>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <NavItem>
                                            <NavLink tag={Link} to="/user" style={{ color: "white" }}>Home</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="btn btn-primary" to="/user/logout">Logout</Link>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>)
                }
            </div>
        );
    }
}