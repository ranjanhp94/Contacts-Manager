import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../src/components/home/Home';
import User from '../src/components/home/User';
import Register from '../src/components/users/Register';
import Login from '../src/components/users/Login';
import Logout from '../src/components/users/Logout';
import Contact from '../src/components/contacts/Contacts-list';
import ContactNew from '../src/components/contacts/ContactNew';
import ContactShow from '../src/components/contacts/ContactShow';
import ContactEdit from '../src/components/contacts/ContactEdit';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>

            <Route path="/" component={Home} exact={true} />
            <Route path="/user" component={User} exact={true} />
            <Route path="/user/register" component={Register} exact={true} />
            <Route path="/user/login" component={Login} exact={true} />
            <Route path="/user/logout" component={Logout} exact={true} />
            <Route path="/contacts" component={Contact} exact={true} />
            <Route path="/contacts/new" component={ContactNew} exact={true} />
            <Route path="/contacts/:id" component={ContactShow} exact={true} />
            <Route path="/contacts/edit/:id" component={ContactEdit} exact={true} />

          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;