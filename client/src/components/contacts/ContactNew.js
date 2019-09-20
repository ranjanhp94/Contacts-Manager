import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';


class ContactNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            mobile: '',
            mobileError: '',
            errorMsg: '',
            successMsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        e.persist()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            emailError: '',
            mobileError: ''
        }
        if (this.state.name.length <= 3) {
            isError = true;
            errors.nameError = 'Name must be more than 3 characters'
        }

        if (this.state.email === "" && !this.state.email.includes('@')) {
            isError = true;
            errors.emailError = 'Enter a valid email address'
        }

        if (this.state.mobile.length !== 10) {
            isError = true;
            errors.mobileError = 'Please provide a valid Mobile Number'
        }

        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
    }

    handleSubmit(e) {
        e.preventDefault()
        const err = this.validate()
        if (!err) {
            this.setState({
                nameError: '',
                emailError: '',
                mobileError: ''
            })
        }

        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }

        axios.post('http://localhost:3005/contacts', formData, { headers: { 'x-auth': localStorage.getItem('userAuth') } })
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    // failure msg(from backend)
                } else {
                    this.setState({
                        name: '',
                        email: '',
                        mobile: '',
                        errorMsg: ''
                    })
                    this.props.history.push('/contacts')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <br />
                        <div>
                            <Form onSubmit={this.handleSubmit}>
                                <h3 className="text-center">New Contact</h3>
                                {this.state.errorMsg && <Alert>{this.state.errorMsg}</Alert>}
                                {this.state.successMsg && <Alert>{this.state.successMsg}</Alert>}

                                <FormGroup>
                                    <Label> Name : </Label>
                                    <Input type="text" value={this.state.name} onChange={this.handleChange} name="name" errortext={this.state.nameError} />
                                    <span style={{ color: "red" }}>{this.state.nameError}</span>
                                </FormGroup>

                                <FormGroup>
                                    <Label> Email : </Label>
                                    <Input type="email" value={this.state.email} onChange={this.handleChange} name="email" errortext={this.state.emailError} />
                                    <span style={{ color: "red" }}>{this.state.emailError}</span>
                                </FormGroup>

                                <FormGroup>
                                    <Label> Mobile : </Label>
                                    <Input type="mobile" value={this.state.mobile} onChange={this.handleChange} name="mobile" errortext={this.state.mobileError} />
                                    <span style={{ color: "red" }}>{this.state.mobileError}</span>
                                </FormGroup>

                                <div className="text-right">
                                    <Button color="primary">Submit</Button>
                                    {' '}<Link className="btn btn-primary" to="/contacts">Back</Link>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ContactNew;