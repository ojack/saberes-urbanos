import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Admin from './components/Admin';
import Projeccion from './components/Projeccion';
import PatrimonioForm from './components/PatrimonioForm';

export default (
  <Route handler={App}>
  	<Route path='/admin' handler={Admin} />
  	<Route path='/projeccion' handler={Projeccion} />
    <Route path='/' handler={PatrimonioForm} />
  </Route>
);