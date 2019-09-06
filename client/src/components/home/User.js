import React from 'react';
// import axios from 'axios';

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <div>
                <br />
                <h2>Welcome {this.state.name}</h2>
            </div>
        )
    }
}

export default User;