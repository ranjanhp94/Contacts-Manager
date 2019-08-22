import React from 'react'
import axios from 'axios'

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
            <div>
                <h2>Contact New</h2>
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
                        Mobile
                        <input type="mobile" value={this.state.mobile} onChange={this.handleChange} name="mobile" errortext={this.state.mobileError} />
                    </label> <span>{this.state.mobileError}</span> <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default ContactNew;