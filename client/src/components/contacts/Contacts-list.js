import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3005/contacts', { headers: { 'x-auth': localStorage.getItem('userAuth') } })
            .then(response =>
                this.setState(() => ({
                    contacts: response.data,
                    // filteredData: response.data
                }))
            )
    }

    render() {
        return (
            <div>

                <h2>Lisiting Contacts - {this.state.contacts.length}</h2>
                <Table bordered style={{ width: '40%' }}>
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
                            this.state.contacts.map((contact, index) => {
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
        )
    }
}

export default Contact;