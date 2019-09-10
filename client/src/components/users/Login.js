import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            hidden: false,
            errorMsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.showPassword = this.showPassword.bind(this)
    }

    handleChange(e) {
        e.persist()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showPassword(event) {
        let checked = event.target.checked
        this.setState({
            hidden: checked
        })
    }

    validate = () => {
        let isError = false
        const errors = {
            emailError: '',
            passwordError: ''
        }

        if (this.state.email.length === 0) {
            isError = true
            errors.emailError = 'Please Provide Email'
        } else {
            errors.emailError = 'Please Provide a valid Email'
        }

        if (this.state.password.length === 0) {
            isError = true
            errors.passwordError = 'Please Provide Password'
        }

        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
    }

    handleSubmit(e) {
        e.preventDefault()
        let email = this.state.email
        axios.get(`http://localhost:3005/user`, { headers: { 'x-auth': localStorage.getItem('userAuth') } })
            .then(response => {
                response.data.forEach((req) => {
                    if (req.email === email) {
                        localStorage.setItem('name', req.name)
                    }
                })
            })


        const err = this.validate()
        if (!err) {
            this.setState({
                emailError: '',
                passwordError: ''
            })
        }

        const formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:3005/user/login', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    this.setState({
                        errorMsg: response.data.errors
                    })
                } else {
                    localStorage.setItem('userAuth', response.data.token)
                    this.props.history.push('/user')
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

                            <h3 className="text-center">Login</h3>

                            {this.state.errorMsg && <Alert><p>{this.state.errorMsg}</p> </Alert>}

                            <FormGroup>
                                <Label> Email  </Label>
                                <Input type="email" value={this.state.email} onChange={this.handleChange} name="email" errortext={this.state.emailError} />
                                <span>{this.state.emailError}</span>
                            </FormGroup>

                            <FormGroup>
                                <Label> Password </Label>
                                <Input type={this.state.hidden ? "text" : "password"} value={this.state.password} onChange={this.handleChange} name="password" errortext={this.state.passwordError} />
                                <span>{this.state.passwordError}</span>
                            </FormGroup>

                            <FormGroup>
                                <FormText><input type="checkbox" name="toggle" onChange={this.showPassword} /> Show Password</FormText>
                            </FormGroup>

                            <Button color="primary" size="lg">Login</Button>

                        </Form>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>
        )
    }
}

export default Login;