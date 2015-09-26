import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Admin from './components/admin/Admin';
import AdminList from './components/admin/AdminList';
import Projeccion from './components/Projeccion';
import Web from './components/web/Web';
import Login from './components/admin/Login';
import Register from './components/Register';


export default (
  <Route handler={App}>
  	<Route path='/admin' handler={Admin} />
  	<Route path='/edit' handler={AdminList} />
  	<Route path='/projeccion' handler={Projeccion} />
  	<Route path='/web' handler={Web} />
  	<Route path='/login' handler={Login} />
  	<Route path='/register' handler={Register} />
    <Route path='/' handler={Web} />
  </Route>
);