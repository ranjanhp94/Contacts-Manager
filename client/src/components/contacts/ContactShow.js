import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import contactImg from '../img/contact-icon.png'
import { Card, CardBody, CardTitle, Button, Container, Row, Col } from 'reactstrap';

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
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <br /> <br />
                        <div>
                            <Card>
                                <CardBody>
                                    <CardTitle className="text-center"><img src={contactImg} heigth="200px" width="200px" alt='' /></CardTitle>
                                    <CardTitle><h4> Name : {this.state.contact.name}</h4></CardTitle>
                                    <CardTitle><h4> Mobile : {this.state.contact.mobile}</h4></CardTitle>
                                    <CardTitle><h4> Email : {this.state.contact.email}</h4></CardTitle>
                                    <Link className="btn btn-primary" to="/contacts">Back</Link> {' '}
                                    <Link className="btn btn-primary" to={`/contacts/edit/${this.state.contact._id}`}>Edit</Link> {' '}
                                    <Button color="primary" onClick={this.handleDelete}>Delete</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ContactShow;