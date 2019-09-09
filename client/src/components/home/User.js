import React from 'react';

function User(props) {
    return <h1 className="text-center">Welcome, {(props.username).slice(0, 1).toUpperCase() + (props.username).slice(1)}</h1>;
}

export default User;