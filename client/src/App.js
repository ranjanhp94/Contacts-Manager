import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from '../src/components/home/Home';
import User from '../src/components/home/User';
import Register from '../src/components/users/Register';
import Login from '../src/components/users/Login';
import Logout from '../src/components/users/Logout';
import Contact from '../src/components/contacts/Contacts-list';
import ContactNew from '../src/components/contacts/ContactNew';
import ContactShow from '../src/components/contacts/ContactShow';
import ContactEdit from '../src/components/contacts/ContactEdit';
import NavBar from '../src/components/home/NavBar';
import Footer from '../src/components/home/Footer';
import PrivateRoute from '../src/components/PrivateRoute';
import PublicRoute from '../src/components/PublicRoute';

class App extends React.Component {
  render() {

    const style = {
      background: '#f2f2f2',
      height: '560px'
    }

    return (
      <BrowserRouter>
        <NavBar />
        <div style={style}>
          <Switch>

            <PublicRoute path="/" component={Home} exact={true} />
            <PrivateRoute path="/user" component={User} exact={true} />
            <PublicRoute path="/user/register" component={Register} exact={true} />
            <PublicRoute path="/user/login" component={Login} exact={true} />
            <PrivateRoute path="/user/logout" component={Logout} exact={true} />
            <PrivateRoute path="/contacts" component={Contact} exact={true} />
            <PrivateRoute path="/contacts/new" component={ContactNew} exact={true} />
            <PrivateRoute path="/contacts/:id" component={ContactShow} exact={true} />
            <PrivateRoute path="/contacts/edit/:id" component={ContactEdit} exact={true} />

          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App;