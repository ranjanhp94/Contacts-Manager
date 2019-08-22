import React from 'react';
import { Link } from 'react-router-dom';

class User extends React.Component {
    render() {
        return (
            <div>
                <h2>Welcome</h2>
                <br />
                <Link to="/user/logout">Logout</Link>
            </div>
        )
    }
}

export default User;