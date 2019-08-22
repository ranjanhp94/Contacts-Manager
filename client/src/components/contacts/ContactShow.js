import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import contactImg from '../img/contact-icon.png'

class ContactShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {}
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const auth = localStorage.getItem('userAuth')
        if (auth) {
            axios.get(`http://localhost:3005/contacts/${id}`, { headers: { 'x-auth': localStorage.getItem('userAuth') } })
                .then(response =>
                    this.setState(() => ({
                        contact: response.data
                    }))
                )
        }
        else {
            this.props.history.push('/user/login')
        }
    }

    handleDelete() {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
            axios.delete(`http://localhost:3005/contacts/${this.state.contact._id}`, { headers: { 'x-auth': localStorage.getItem('userAuth') } })
                .then((response) => {
                    this.props.history.push('/contacts')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <div>
                <br />
                <img src={contactImg} heigth="200px" width="200px" alt='' />
                <h4> Name: {this.state.contact.name}</h4>
                <h4> Mobile: {this.state.contact.mobile}</h4>
                <h4> Email: {this.state.contact.email}</h4>
                <Link to="/contacts">Back</Link> {' '}
                <Link to={`/contacts/edit/${this.state.contact._id}`}>Edit</Link> {' '}
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

export default ContactShow;