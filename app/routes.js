import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Admin from './components/Admin';
import AdminList from './components/AdminList';
import Projeccion from './components/Projeccion';
import Web from './components/Web';
import SvgHex from './components/SvgHex';
import SoundIcon from './components/SoundIcon';
import Login from './components/Login';
import Register from './components/Register';


export default (
  <Route handler={App}>
  	<Route path='/admin' handler={Admin} />
  	<Route path='/edit' handler={AdminList} />
  	<Route path='/projeccion' handler={Projeccion} />
  	<Route path='/web' handler={Web} />
  	<Route path='/login' handler={Login} />
  	<Route path='/register' handler={Register} />
    <Route path='/' handler={SoundIcon} />
  </Route>
);