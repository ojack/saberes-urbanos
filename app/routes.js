import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Admin from './components/Admin';
import Projeccion from './components/Projeccion';
import Web from './components/Web';
import SvgHex from './components/SvgHex';
import SoundIcon from './components/SoundIcon';

export default (
  <Route handler={App}>
  	<Route path='/admin' handler={Admin} />
  	<Route path='/projeccion' handler={Projeccion} />
  	<Route path='/web' handler={Web} />
    <Route path='/' handler={SoundIcon} />
  </Route>
);