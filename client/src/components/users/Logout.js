import React from 'react';
import axios from 'axios';

class Logout extends React.Component {

    componentDidMount() {
        axios.delete('http://localhost:3005/user/logout', { headers: { 'x-auth': localStorage.getItem('userAuth') } })
            .then((response) => {
                localStorage.removeItem('userAuth')
                this.props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Logout;