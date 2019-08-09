import React from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3005/contacts', { headers: { 'x-auth': localStorage.getItem('authToken') } })
      .then(response =>
        this.setState(() => ({
          contacts: response.data
        }))
      )
  }

  render() {
    return (
      <div>
        <h2>Lisiting Contacts - {this.state.contacts.length}</h2>
        <Table bordered style={{ width: '40%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.contacts.map(contact => {
                return (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.mobile}</td>
                    <td>{contact.email}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default App;