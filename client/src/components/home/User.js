import React from 'react';

function User() {
    let name = localStorage.getItem('name')
    return <h1 className="text-center">Welcome, {(name).slice(0, 1).toUpperCase() + (name).slice(1)}</h1>;
}

export default User;