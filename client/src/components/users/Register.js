import React from 'react'
import axios from 'axios'

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

        if (this.state.password.length <= 5) {
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

        axios.post('http://localhost:3005/user/register', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    // failure msg(from backend)
                } else {
                    this.setState({
                        successMsg: 'successfully registered',
                        name: '',
                        email: '',
                        password: '',
                        errorMsg: ''
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
            <div>
                <h2>Register</h2>
                {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                {this.state.successMsg && <p>{this.state.successMsg}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" errortext={this.state.nameError} />
                    </label> <span>{this.state.nameError}</span> <br />
                    <label>
                        Email
                        <input type="email" value={this.state.email} onChange={this.handleChange} name="email" errortext={this.state.emailError} />
                    </label> <span>{this.state.emailError}</span> <br />
                    <label>
                        Password
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" errortext={this.state.passwordError} />
                    </label> <span>{this.state.passwordError}</span> <br />
                    <input type="submit" value="Register" />
                </form>
            </div>
        )
    }
}

export default Register;