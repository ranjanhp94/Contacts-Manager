import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Container, Row, Col, Badge } from 'reactstrap';
import SearchBar from './SearchBar';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            filteredData: []
        }
        this.handleSearchByCode = this.handleSearchByCode.bind(this);
    }

    handleSearchByCode(code) {
        this.setState(prevState => ({
            filteredData: prevState.contacts.filter(contact => contact.name.toLowerCase().includes(code.toLowerCase()) || contact.mobile.includes(code))
        }))
    }

    componentDidMount() {
        axios.get('http://localhost:3005/contacts', { headers: { 'x-auth': localStorage.getItem('userAuth') } })
            .then(response =>
                this.setState(() => ({
                    contacts: response.data,
                    filteredData: response.data
                }))
            )
    }

    render() {
        const scroll = {
            height: "400px",
            overflowY: "scroll"
        }
        return (
            <Container>
                <br />
                <Row>
                    <Col><h3>Lisiting Contacts - <Badge color="info">{this.state.filteredData.length}</Badge></h3></Col>
                    <Col><SearchBar handleSearchByCode={this.handleSearchByCode} /></Col>
                    <Col > <Link className="btn btn-primary" to='/contacts/new'>New Contact</Link></Col>
                </Row>

                <Row>
                    <Col sm={{ size: 8, order: 3, offset: 1 }} style={scroll}>
                        <div>
                            <Table striped bordered size="sm" hover>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.filteredData.sort((a, b) => {
                                            var aname = a.name.toLowerCase(), bname = b.name.toLowerCase()
                                            if (aname < bname)
                                                return -1;
                                            else if (aname > bname)
                                                return 1;
                                            return 0;
                                        }).map((contact, index) => {
                                            return (
                                                <tr key={contact._id}>
                                                    <td>{index + 1}</td>
                                                    <td><Link to={`/contacts/${contact._id}`}>{contact.name}</Link></td>
                                                    <td>{contact.mobile}</td>
                                                    <td>{contact.email}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Contact;