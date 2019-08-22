import React from 'react'
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
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

    handleSubmit(e) {
        e.preventDefault()
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
            <div>
                <h2>Login</h2>
                {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        email
                        <input type="email" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label> <br />
                    <label>
                        password
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                    </label> <br />
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}

export default Login;