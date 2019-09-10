import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
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
            passwordError: ''
        }
        if (this.state.name.length <= 3) {
            isError = true;
            errors.nameError = 'Name must be more than 3 characters'
        }

        if (this.state.email === "" && !this.state.email.includes('@')) {
            isError = true;
            errors.emailError = 'Enter a valid email address'
        }

        if (this.state.password.length < 5) {
            isError = true;
            errors.passwordError = 'Password must atleast contain 5 characters'
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
                passwordError: ''
            })
        }

        const formData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post(`http://localhost:3005/user/register`, formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    // failure msg(from backend)
                } else {
                    this.setState({
                        successMsg: 'successfully registered',
                        name: '',
                        email: '',
                        password: ''
                    })
                    this.props.history.push('/user/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col border border-primary shadow-lg p-3 mb-5 bg-white rounded p-4 m-4">
                        <Form onSubmit={this.handleSubmit}>
                            <h3 className="text-center">Register</h3>

                            {this.state.errorMsg && <Alert>{this.state.errorMsg}</Alert>}
                            {this.state.successMsg && <Alert>{this.state.successMsg}</Alert>}

                            <FormGroup>
                                <Label> Name </Label>
                                <Input type="text" value={this.state.name} onChange={this.handleChange} name="name" errortext={this.state.nameError} />
                                <span>{this.state.nameError}</span>
                            </FormGroup>

                            <FormGroup>
                                <label> Email </label>
                                <Input type="email" value={this.state.email} onChange={this.handleChange} name="email" errortext={this.state.emailError} />
                                <span>{this.state.emailError}</span>
                            </FormGroup>

                            <FormGroup>
                                <label> Password </label>
                                <Input type="password" value={this.state.password} onChange={this.handleChange} name="password" errortext={this.state.passwordError} />
                                <span>{this.state.passwordError}</span>
                            </FormGroup>

                            <Button color="primary" size="lg">Submit</Button>
                        </Form>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>
        )
    }
}

export default Register;